import Sprite from "./Sprite.js";

/**
 * Defines a basic panel for the interface
 */
export default class Tile extends Sprite
{
    constructor( x, y, w, h, atlas, textureName)
    {
        super(x,y,w,h,atlas,textureName);
    }

    draw( ctx ) {
        super.draw(ctx);
    }
}