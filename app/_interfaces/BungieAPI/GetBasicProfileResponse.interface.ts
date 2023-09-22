import CharacterDataType from '../CharacterData.interface';

export interface GetBasicProfileType {
  Response: GetBasicProfileResponseType;
}

export interface GetBasicProfileResponseType {
  characters: {
    data: {
      [key: string]: CharacterDataType;
    };
  };
}
