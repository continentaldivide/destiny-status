import Image from 'next/image';
import { GetBasicProfileResponseType } from '../_interfaces/BungieAPI/GetBasicProfileResponse.interface';

type Props = {
  profileData: GetBasicProfileResponseType;
  handleUserClick: (membershipId: string, membershipType: number) => void;
};
export default function SearchResult({ profileData, handleUserClick }: Props) {
  const characterIds = Object.keys(profileData.characters.data);
  const profile = profileData.profile.data;
  const characters = profileData.characters.data;
  return (
    <div
      onClick={() =>
        handleUserClick(
          profile.userInfo.membershipId,
          profile.userInfo.membershipType
        )
      }
      className="relative m-2 hover:cursor-pointer"
    >
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
        unoptimized
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
