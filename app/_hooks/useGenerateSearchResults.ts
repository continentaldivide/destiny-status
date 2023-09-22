import PlayerSearchResultType from '../_interfaces/PlayerSearchResult.interface';

export default function useGenerateSearchResults(username: string) {
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
      console.log(data);
      const users: PlayerSearchResultType[] = data.searchResults;
      const destinyUsers = users.filter((user) => {
        return user.destinyMemberships.length !== 0;
      });
      console.log(destinyUsers);
      destinyUsers.forEach((destinyUser) => {
        if (destinyUser.destinyMemberships[0]) {

        }
        // console.log(element);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchedUsers = fetchUsers();
  return fetchedUsers;
}
