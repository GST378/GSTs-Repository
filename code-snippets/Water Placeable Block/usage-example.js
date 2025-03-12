import { world, BlockPermutation } from '@minecraft/server';
import { placeBlockAboveWater } from './code-snippet.js';

// Create a custom component
const waterPlaceableBlock = {
    // Triggers after using the item on a block
    onUseOn(data) {
        const { source, block } = data;
        // Checks if the block is water or waterlogged
        if (block.typeId !== 'minecraft:water' && !block.isWaterlogged) return;
        // Place the block
        placeBlockAboveWater(source, BlockPermutation.resolve('minecraft:waterlily'), block.location);
    }
}

// Register the custom component
world.beforeEvents.worldInitialize.subscribe(({ itemComponentRegistry }) => {
    itemComponentRegistry.registerCustomComponent('custom:water_placeable_component', waterPlaceableBlock);
});
