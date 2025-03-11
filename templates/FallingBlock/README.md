# Falling Block Template

This is a template for creating custom falling blocks.

### How to add a falling block?

1. First create your block, define the identifier, geometry and texture.

2. Now create your entity, but be careful! The entity identifier must be the **SAME** as the block identifier, but with **.entity** at the end, for example:
`custom:sand_block => custom:sand_block.entity`
> Set your entity's texture and geometry to look like your block.
> See how I did it in this template and copy it into your add-on.

3. Now with the block and entities created, just add it to the list:
> Go to the file 'scripts/FallingBlock/fallingBlocks.js'
> Add your block to the 'Falling Blocks' object, example:
```javascript
const FallingBlocks = {
    'custom:sand_block': {}
}
```
- Now import the **scripts/FallingBlock/manager.js** file into your main file.
```javascript
import './FallingBlock/manager.js';
```
4. And that's it, if you did everything correctly your block should start falling!
***
### Additional Settings

- Powder
> Add the custom component `falling_block:powder_placement` to your block's json file.

- Layers
> Add the custom component `falling_block:layer_placement` to your block's json file.
> Add the `falling_block:layers` state and define the permutations for each value correctly in your block's json file.
> Also add the `falling_block:layers` property with the same values as the state in your entity's json file.


## FallingBlocks Documentation

**FallingBlocks**
> An object containing all created falling blocks, with keys corresponding to their identifiers.

**Each falling block object can include:**

**Config**
> Defines the properties of individual falling blocks. If omitted, default values will be applied.
<details>
  <summary>Show Table</summary>

  | Name          | Default Value | Type                | Description                                                                 | Valid Values        |
  |:--------------:|:-------------:|:-------------------:|:---------------------------------------------------------------------------:|:-------------------:|
  | type          | 'default'     | string              | Defines the behavior of the falling block.                                   | 'default', 'powder', 'layers' |
  | destroyOnFall | false         | boolean             | If true, the block will be destroyed upon falling instead of being placed.   | false, true         |
  | fallingSpeed  | 0             | Decimal number      | The extra speed at which the block will fall, must be a value between 0 and 1 and is completely optional. | 0..1                |
  | solidBlock    | none          | Identifier string, BlockPermutation | Only used on the 'powder' type, this block will be placed when falling into water. |                    |
  | maxLayers     | none          | Integer number      | Only used on the 'layers' type, sets the maximum number of layers for your block. | 1..16               |

</details>

**onStartFalling**
> Optional event triggered when a block starts falling.

**onRemove**
> Optional event triggered when a block is destroyed. Use this to drop the block, spawn particles, or play a sound.

**onGround**
> Optional event triggered when a block is successfully placed.

### Usage Example

```javascript
/**
 * Collection of falling block definitions.
 * Each key corresponds to a falling block identifier.
 * 
 * Each falling block object can include:
 * - config: Configuration options for the falling block.
 * - onStartFalling: Callback called when the block starts falling.
 * - onRemove: Callback called when the block is destroyed.
 * - onGround: Callback called when the block is successfully placed.
 */
const FallingBlocks = {
    'custom:sand_block': {
        /**
         * Configuration options for the falling block.
         * @property {string} [type] - Defines the behavior of the falling block. Valid values: `'default'`, `'powder'`, `'layers'`.  
         * @default 'default'
         * @property {boolean} [destroyOnFall] - If `true`, the block will be destroyed upon falling instead of being placed.  
         * @default false
         * @property {number} [fallingSpeed] - Additional falling speed. Must be between `0` and `1`.  
         * @default 0
         * @property {string | BlockPermutation} solidBlock - Only used for the `'powder'` type. This block is placed when falling into water.
         * @property {number} maxLayers - Only used for the `'layers'` type. Sets the maximum number of layers for the block.
         */
        config: {
            type: 'default',
            destroyOnFall: false,
            fallingSpeed: 0.475,
            solidBlock: BlockPermutation.resolve('minecraft:sandstone'),
            maxLayers: 8
        },
        /**
         * @property {function(Dimension, Vector3): void} onStartFalling - Called when a block starts falling.
         * @param {Dimension} dimension - The dimension where the block is falling.
         * @param {Vector3} location - The location of the block.
         */
        onStartFalling: (dimension, location) => {
            // code
        },
        /**
         * @property {function(Dimension, Vector3): void} onRemove - Called when the block is destroyed.
         * @param {Dimension} dimension - The dimension where the block is destroyed.
         * @param {Vector3} location - The location of the block where the entity was removed.
         */
        onRemove: (dimension, location) => {
            // code
        },
        /**
         * @property {function(Block): void} onGround - Called when the block is successfully placed.
         * @param {Block} block - The block placed.
         */
        onGround: (block) => {
            // code
        }
    }
    // Add more falling blocks here!
}
```
### Short Example
```javascript
const FallingBlocks = {
    // default
    'custom:sand_block': {},
    // powder
    'custom:concrete_powder_block': {
        config: { type: 'powder', solidBlock: 'minecraft:stone' }
    },
    // layers
    'custom:snow_layer_block': {
        config: { type: 'layers', maxLayers: 8 }
    }
}
```

## Other Functions

**dropFallingBlock**
> Helper function I added to drop a falling block when removed, you can use this one or create your own.
```javascript
/**
 * @param {string} blockId - The block identifier will also be used when spawning the particle.
 * @param {Dimension} dimension - The dimension to drop the block.
 * @param {Vector3} location - The location where it will be dropped.
 * @returns {null} - Doesn't return anything.
 *
 * @example dropFallingBlock('custom:sand_block', dimension, location);
 */
function dropFallingBlock(blockId, dimension, location) {
    const centerLocation = { x: location.x + 0.5, y: location.y + 0.5, z: location.z + 0.5 };
    if (world.gameRules.doEntityDrops) dimension.spawnItem(new ItemStack(blockId), centerLocation);
    dimension.spawnParticle(`${blockId}.break_particle`, centerLocation);
}
```
> Note that, like the entity, the particle has the same identifier as the block, but with `.break_particle` at the end.

## License
_GNU General Public License v3.0 (GPL-3.0)_
> For more details see the [LICENSE](https://github.com/GST378/GSTs-Repository/blob/main/LICENSE) file.

## Credits
- [GST378](https://www.curseforge.com/members/gst378) - Creator of this template.
