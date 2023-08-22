export default interface CharacterDataType {
  membershipId: string;
  membershipType: number;
  characterId: string;
  dateLastPlayed: string;
  minutesPlayedThisSession: string;
  minutesPlayedTotal: string;
  light: number;
  stats: {
    144602215: number;
    392767087: number;
    1735777505: number;
    1935470627: number;
    1943323491: number;
    2996146975: number;
    4244567218: number;
  };
  raceHash: number;
  genderHash: number;
  classHash: number;
  raceType: 1;
  classType: 1;
  genderType: 1;
  emblemPath: string;
  emblemBackgroundPath: string;
  emblemHash: number;
  emblemColor: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  levelProgression: {
    progressionHash: number;
    dailyProgress: number;
    dailyLimit: number;
    weeklyProgress: number;
    weeklyLimit: number;
    currentProgress: number;
    level: number;
    levelCap: number;
    stepIndex: number;
    progressToNextLevel: number;
    nextLevelAt: number;
  };
  baseCharacterLevel: number;
  percentToNextLevel: number;
  titleRecordHash: number;
}
