import { DamageTableType } from './manifestTables/DestinyDamageTypeDefinition.interface';
import { ItemTableType } from './manifestTables/DestinyInventoryItemDefinition.interface';
import { StatTableType } from './manifestTables/DestinyStatDefinition.interface';

export default interface ManifestType {
  DestinyDamageTypeDefinition: DamageTableType;
  DestinyInventoryItemDefinition: ItemTableType;
  DestinyStatDefinition: StatTableType;
}
