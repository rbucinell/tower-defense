import Sprite from './Sprite.js';
import Label from './Label.js';

export default class Button extends Sprite
{
    /**
     * Default Constructore for a Button  Object
     * @param {Number} x The x position for the button
     * @param {Number} y The y position for the button
     * @param {Number} w The width of the button
     * @param {Number} h The height of the button
     * @param {*} atlas The atlas that holds the drawing texture
     * @param {*} textureName The name of the texture for the background
     * @param {*} text The text on the button
     * @param {*} textColor The color of the text
     * @param {*} textSize (default = 12px )he Size of the text
     * @memberof Button
     */
    constructor( x, y, w, h, atlas, textureName, text, textColor, textSize='12px' )
    {
        super(x,y,w,h,atlas,textureName);
        let s = parseInt(textSize.match( /\d+/g)[0]);
        this.label = new Label( x + w/2, y + h/2 + s/4, textSize, textColor, text, this.w );
        this.label.textAlign = 'center';       
    }
    
    hitTest(x,y)
    {
        return x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= (this.y + this.h);
    }

    update()
    {
        //todo
    }

    draw( ctx )
    {
        super.draw(ctx);
        this.label.draw( ctx );
    }

    handleMouseHover( event, mX, mY )
    {
        this.State = this.hitTest( mX, mY ) ? ButtonState.HOVER : ButtonState.DEFAULT;
        this.textureName = this.State === ButtonState.HOVER ? "blue_button01.png" : "blue_button00.png";
    }
}

const ButtonState = 
{
    DEFAULT: "default",
    HOVER: "hover",
    DOWN: "DOWN"
};