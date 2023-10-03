export default interface PlayerSearchResultType {
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
  destinyMemberships: {
    applicableMembershipTypes: number[];
    bungieGlobalDisplayName: string;
    bungieGlobalDisplayNameCode: number;
    crossSaveOverride: number;
    displayName: string;
    iconPath: string;
    isPublic: boolean;
    membershipId: string;
    membershipType: number;
  }[];
}
