import Atlas from './Atlas.js'

const ButtonState = 
{
	DEFAULT: "default",
	HOVER: "hover",
	DOWN: "DOWN"
};

export default class Button
{
	constructor( x, y, w, h, atlas, textureName, text, font )
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.Atlas = atlas;
		this.textureName = textureName;
		this.text = text;
		this.font = font;
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
		this.texture = this.Atlas.getTextureByName( this.State === ButtonState.HOVER ? "blue_button01.png" : "blue_button00.png");
		if(this.texture)
		{
			//Draw Next Wave Button
			ctx.drawImage(this.Atlas.SpriteSheet, this.texture.x, this.texture.y, this.texture.w, this.texture.h, this.x, this.y, this.w, this.h);
			ctx.font = this.font;
			ctx.fillStyle = "#000000";
			ctx.fillText(this.text, 
				this.x + this.w/2 - ctx.measureText(this.text).width/2, 
				this.y + this.h/2 + ctx.measureText('M').width/2 );
		}
	}

	handleMouseHover( event, mX, mY )
	{
		this.State = this.hitTest( mX, mY ) ? ButtonState.HOVER : ButtonState.DEFAULT;
	}
}