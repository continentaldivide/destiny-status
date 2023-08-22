export default interface CharacterEquipmentType {
  items: [
    {
      itemHash: number;
      itemInstanceId: string;
      quantity: number;
      bindStatus: number;
      location: number;
      bucketHash: number;
      transferStatus: number;
      lockable: boolean;
      state: number;
      dismantlePermission: number;
      isWrapper: boolean;
      tooltipNotificationIndexes: [];
      versionNumber?: number;
    }
  ];
}
