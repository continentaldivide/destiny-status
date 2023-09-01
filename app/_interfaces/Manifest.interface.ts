import { DamageTableType } from './manifestTables/DestinyDamageTypeDefinition.interface';
import { ItemTableType } from './manifestTables/DestinyInventoryItemDefinition.interface';

export default interface ManifestType {
  DestinyDamageTypeDefinition: DamageTableType;
  DestinyInventoryItemDefinition: ItemTableType;
}
