import Atlas from '../Atlas.js'
import {INTERFACE_FONT} from '../TrackInterface.js'

/**
 * Defines a basic panel for the interface
 */
export default class Label
{
    /**
     * 
     * @param {Number} x The x position of the label
     * @param {Number} y The y position o fthe label
     * @param {string} fontSize the font size
     * @param {string} color the hex string representing the color to draw the text
     * @param {string} text the text to render
     * @param {Number} maxWidth (defualt=undfined) Maximum width that the text will render
     */
    constructor( x, y, fontSize, color, text, maxWidth=undefined)
    {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.font = `"${INTERFACE_FONT}", Arial`;
        this.color = color;
        this.text = text;
        this.maxWidth = maxWidth;
        this.textAlign = 'left';
    }

    get Text()
    {
        return this.text;
    }

    set Text( val )
    {
        this.text = val;
    }

    draw( ctx ) {

        let prevColor = ctx.fillStyle;
        let prevFont = ctx.font;
        let prevAlign = ctx.textAlign;

        //Set style
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize} ${this.font}`;
        ctx.textAlign = this.textAlign;
        //Render
        ctx.fillText( this.Text, this.x, this.y, this.maxWidth);
        //Revert style
        ctx.fillStyle = prevColor;
        ctx.font = prevFont;
        ctx.textAlign = prevAlign;
    }
}