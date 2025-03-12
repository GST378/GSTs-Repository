# Water Placeable Block

Places a block just above water, similar to the waterlily.

### Why is this necessary?
- The item component `minecraft:liquid_clipped` allows an item to interact with liquids, but it still doesn't place blocks above water correctly, resulting in the block being placed below the water level.

### What does this do?
- When interacting with water the function goes through and checks the blocks above, if it is water it moves on to the next block, the block is placed as soon as the first empty space is found.
> If any other block is in the way the function stops and does not place the block, preventing it from being placed before or after the water level.

### Requirements

- An item with the `minecraft:liquid_clipped` component set to true.

- A custom component or event that detects the item's interaction with water.

- Due to the use of the custom component or interaction event, it is not necessary to use the `minecraft:block_placer` component as the block is already placed by the function itself.
> If you still need to use it, find a way to cancel the placement of the block by that component, for example canceling the event using the `beforeOnPlayerPlace` custom component in your block.

### Item Example
```json
{
  "format_version": "1.21.10",
  "minecraft:item": {  
    "description": {
      "identifier": "example:water_placeable_block",
    },    
    "components": {
      "minecraft:liquid_clipped": true,
      "minecraft:custom_components": ["custom:water_placeable_block"],
      "minecraft:icon": "waterlily"
    }
  }
}
```
***

## License
_GNU General Public License v3.0 (GPL-3.0)_
> For more details see the [LICENSE](https://github.com/GST378/GSTs-Repository/blob/main/LICENSE) file.

## Credits
- [GST378](https://www.curseforge.com/members/gst378) - Creator of this code.
