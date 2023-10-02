import Image from 'next/image';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

export default function NewSearchResult({
  profileData,
}: {
  profileData: GetBasicProfileResponseType;
}) {
  const characterIds = Object.keys(profileData.characters.data);
  const profile = profileData.profile.data;
  const characters = profileData.characters.data;
  return (
    <div className="relative m-2">
      <div className="absolute left-24 z-10 mt-4">
        <p className="text-2xl">
          {profile.userInfo.bungieGlobalDisplayName}#
          {profile.userInfo.bungieGlobalDisplayNameCode}
        </p>
        <p className="text-xl text-power-level font-bold">
          ✦{characters[characterIds[0]].stats[1935470627]}
        </p>
      </div>
      <Image
        src={`https://bungie.net${
          characters[characterIds[0]].emblemBackgroundPath
        }`}
        alt=""
        width={474}
        height={96}
        className="relative"
      />
    </div>
  );
}
