import CharacterDataType from '../CharacterData.interface';

export interface GetBasicProfileType {
  Response?: GetBasicProfileResponseType;
  ErrorCode: number;
  ErrorStatus: string;
}

export interface GetBasicProfileResponseType {
  profile: {
    data: {
      userInfo: {
        applicableMembershipTypes: number[];
        bungieGlobalDisplayName: string;
        bungieGlobalDisplayNameCode: number;
        crossSaveOverride: number;
        displayName: string;
        isPublic: boolean;
        membershipId: string;
        membershipType: number;
      };
      dateLastPlayed: string;
      versionsOwned: number;
      characterIds: string[];
      seasonHashes: number[];
      eventCardHashesOwned: any[];
      currentSeasonHash: number;
      currentSeasonRewardPowerCap: number;
      currentGuardianRank: number;
      lifetimeHighestGuardianRank: number;
      renewedGuardianRank: number;
    };
  };
  characters: {
    data: {
      [key: string]: CharacterDataType;
    };
  };
}
