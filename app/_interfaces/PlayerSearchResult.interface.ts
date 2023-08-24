export default interface PlayerSearchResultType {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
  destinyMemberships: {
    membershipId: string;
    membershipType: number;
  }[];
}
