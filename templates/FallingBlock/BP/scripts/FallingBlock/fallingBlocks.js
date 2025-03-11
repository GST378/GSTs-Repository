// See README file for details.
import { world, BlockPermutation, ItemStack } from '@minecraft/server';

function dropFallingBlock(blockId, dimension, location) {
    const centerLocation = { x: location.x + 0.5, y: location.y + 0.5, z: location.z + 0.5 };
    if (world.gameRules.doEntityDrops) dimension.spawnItem(new ItemStack(blockId), centerLocation);
    dimension.spawnParticle(`${blockId}.break_particle`, centerLocation);
}

export const FallingBlocks = {
    'falling_block:custom_sand': {
        onRemove: (dimension, location) => { dropFallingBlock('falling_block:custom_sand', dimension, location); }
    },
    'falling_block:custom_concrete_powder': {
        config: {
            type: 'powder',
            solidBlock: BlockPermutation.resolve('minecraft:white_concrete')
        },
        onRemove: (dimension, location) => { dropFallingBlock('falling_block:custom_concrete_powder', dimension, location); }
    },
    'falling_block:custom_snow_layer': {
        config: { type: 'layers', maxLayers: 8 }
    }
}
