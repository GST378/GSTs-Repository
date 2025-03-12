import { EntityComponentTypes, EquipmentSlot, GameMode } from '@minecraft/server';

/**
 * Reduces the amount of the item in the player's hand.
 * @param {Player} player - The player who will have the item reduced.
 * @param {number} [quantity=1] - The quantity to be reduced.
 */
export function decrementStack(player, quantity = 1) {
    if (!player.isValid() || player.getGameMode() === GameMode.creative) return;
    const equippableComp = player.getComponent(EntityComponentTypes.Equippable);
    const item = equippableComp.getEquipment(EquipmentSlot.Mainhand);
    if (!item) return;
    if (item.amount <= quantity) equippableComp.setEquipment(EquipmentSlot.Mainhand, null);
    else { item.amount -= quantity; equippableComp.setEquipment(EquipmentSlot.Mainhand, item); }
}

/**
 * Places the block directly above the water.
 * 
 * @param {Player} player - The player placing the block.
 * @param {BlockPermutation} permutationToPlace - The block permutation to be placed.
 * @param {Vector3} location - The starting location to search for placement.
 * @returns {Block | undefined} - Returns the placed block or undefined if no block was placed.
 */
export function placeBlockAboveWater(player, permutationToPlace, location) {
    for (let i = 0; i < 8; i++) {
        if (player.location.y < location.y) break;
        const block = player.dimension.getBlock(location);
        location.y++;
        if (block.typeId === 'minecraft:water' || block.isWaterlogged) continue;
        else if (!block.isAir) break;
        else {
            block.setPermutation(permutationToPlace);
            decrementStack(player);
            return player.dimension.getBlock(location);
        }
    }
}
