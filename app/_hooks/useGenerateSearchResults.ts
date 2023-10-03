import PlayerSearchResultType from '../_interfaces/PlayerSearchResult.interface';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

export default async function useGenerateSearchResults(username: string) {
  const fetchUsers = async () => {
    if (username.length === 0) {
      return;
    }
    try {
      const response = await fetch(`api/bungie-user-search`, {
        method: 'POST',
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      return data.searchResults;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchedUsers: PlayerSearchResultType[] = await fetchUsers();

  const destinyUsers = fetchedUsers.filter((user) => {
    return user.destinyMemberships.length !== 0;
  });

  const fetchDestinyUserInfo = async (
    membershipType: number,
    membershipId: string
  ) => {
    const response = await fetch(`api/get-basic-profile`, {
      method: 'POST',
      body: JSON.stringify({
        membershipType,
        membershipId,
      }),
    });
    const data = await response.json();
    return data;
  };

  const fetchedProfiles = await Promise.all(
    destinyUsers.map(async (destinyUser) => {
      const membershipType = destinyUser.destinyMemberships[0].membershipType;
      const membershipId = destinyUser.destinyMemberships[0].membershipId;
      const userInfo: GetBasicProfileResponseType | null =
        await fetchDestinyUserInfo(membershipType, membershipId);
      return userInfo;
    })
  );

  const validProfiles: GetBasicProfileResponseType[] = fetchedProfiles.filter(
    (profile): profile is Exclude<typeof profile, null> => {
      let characterIds: string[];
      profile === null
        ? (characterIds = [])
        : (characterIds = Object.keys(profile.characters.data));

      return characterIds.length > 0;
    }
  );

  return validProfiles;
}
