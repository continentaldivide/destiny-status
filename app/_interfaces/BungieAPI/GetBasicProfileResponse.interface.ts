import CharacterDataType from '../CharacterData.interface';

export interface GetBasicProfileType {
  Response: GetProfileResponseType;
}

export interface GetProfileResponseType {
  characters: {
    data: {
      [key: string]: CharacterDataType;
    };
  };
}
