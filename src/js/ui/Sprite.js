import Atlas from '../Atlas.js'
import Texture from '../Texture.js';
import { DEBUG_MODE } from '../main.js';

export default class Sprite
{
    /**
     * Default Constructor for Sprite, takes position, size, atlas, and given texture
     * 
     * @param {Number} x The x position of the Sprite
     * @param {Number} y The y position of the Sprite
     * @param {Number} w The width of the Sprite (undfined or 0 will set to texture w)
     * @param {Number} h The height of the Sprite (undfined or 0 will set to texture h)
     * @param {Atlas} atlas The Atlas object used for the sprite's rendering
     * @param {string} textureName The name of the texutre to render
     */
    constructor( x, y, w, h, atlas, textureName )
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.atlas = atlas;
        this.textureName = textureName;        
    }

    update()
    {

    }
    
    draw( ctx )
    {
        let texture = this.atlas.getTextureByName( this.textureName );
        if( texture )
        {
            if( this.w === undefined || this.w === 0 )
                this.w = texture.w;
            if( this.h === undefined || this.h === 0 )
                this.h = texture.h;
            ctx.drawImage(this.atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h, this.x, this.y, this.w, this.h );    
        }

        //Debug tile border and tile name
        if (DEBUG_MODE) {
            ctx.strokeStyle = "lightgray";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
            
            ctx.fillStyle = "black";
            ctx.font = "8px Arial";
            let tileNumber = this.textureName.substring( 8, this.textureName.length-4);
            ctx.fillText(tileNumber ,this.x, this.y+8);
        }
    }
}