import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

export default function NewSearchResult({
  profileData,
}: {
  profileData: GetBasicProfileResponseType;
}) {
  const characterIds = Object.keys(profileData.characters.data);
  return (
    <div>
      <p>hi</p>
      {/* <p>{profileData.characters.data[characterIds[0]].dateLastPlayed}</p> */}
    </div>
  );
}
