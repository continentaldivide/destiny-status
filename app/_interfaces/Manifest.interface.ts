import { DamageTableType } from './manifestTables/DestinyDamageTypeDefinition.interface';
import { ItemTableType } from './manifestTables/DestinyInventoryItemDefinition.interface';
import { StatTableType } from './manifestTables/DestinyStatDefinition.interface';
import { PerkTableType } from './manifestTables/DestinySandboxPerkDefinition.interface';

export default interface ManifestType {
  DestinyDamageTypeDefinition: DamageTableType;
  DestinyInventoryItemDefinition: ItemTableType;
  DestinySandboxPerkDefinition: PerkTableType;
  DestinyStatDefinition: StatTableType;
}
