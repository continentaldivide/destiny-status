import CharacterDataType from '../CharacterData.interface';

export interface GetBasicProfileType {
  Response?: GetBasicProfileResponseType;
  ErrorCode: number;
  ErrorStatus: string;
}

export interface GetBasicProfileResponseType {
  characters: {
    data: {
      [key: string]: CharacterDataType;
    };
  };
}
