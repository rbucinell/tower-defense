const ButtonState = 
{
	DEFAULT: "default",
	HOVER: "hover",
	DOWN: "DOWN"
};

export default class Button
{
	constructor( x, y, w, h, fill, text )
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fill = fill;
		this.text = text;
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
		ctx.beginPath();
		ctx.strokeStyle = "#000";
		ctx.fillStyle = this.fill;
		
		ctx.rect(this.x,this.y,this.w,this.h);
		ctx.fill();
		ctx.stroke();
		
		ctx.fillStyle = "#000000";
		ctx.fillText(this.text, this.x+(this.w/4), this.y+(this.h* 3/4 ) );
	}

	handleMouseUp( event )
	{
		if( this.hitTest(event.x, event.y) )
		{
			this.State = ButtonState.HOVER;
		}
		else
		{
			this.State = ButtonState.DEFAULT;
		}
	}	
}