export default class Vector2D 
{
	constructor( x, y )
	{
		this.x = x;
		this.y = y;
	}

	toString()
	{
		return `<${this.x}, ${this.y}>`;
	}

	dot( vector )
	{
		return Math.roundToTwo(this.x * vector.x + this.y * vector.y);
	}

	mag()
	{
		return Math.roundToTwo(Math.sqrt( Math.pow( this.x, 2) + Math.pow( this.y, 2 ) ));
	}

	normal()
	{
		return new Vector2D( Math.roundToTwo(this.x / this.mag()), Math.roundToTwo(this.y / this.mag()) );
	}

	rot()
	{
		return Math.toDeg( Math.acos( this.x / this.mag() ) );
	}

	multiply( vec )
	{
		const newVec = Vector2D.multiply(this, vec);
		this.x = newVec.x;
		this.y = newVec.y;
	}

	multiply( scalar )
	{
		this.x *= scalar;
		this.y *= scalar;
	}

	static add( v1, v2 )
	{
		return new Vector2D( v1.x + v2.x, v1.y + v2.y );
	}

	static sub( v1, v2 )
	{
		return new Vector2D( v2.x - v1.x, v2.y - v1.y );
	}

	static multiply(v1, v2 )
	{
		return new Vector2D( Math.roundToTwo(v2.x * v1.x), Math.roundToTwo(v2.y * v1.y) );
	}

	static normal(vec)
	{
		const m = vec.mag();
		
		return new Vector2D( m === 0 ? 0 : vec.x / m, m === 0 ? 0 : vec.y / m);
	}

	static dist( v1, v2 )
	{
		return Math.roundToTwo(Math.sqrt( Math.pow(v2.x-v1.x, 2) + Math.pow(v2.y-v1.y, 2) ));
	}

	static CreateFromRadialCord( r, deg )
	{
		const getXComp = ( degrees ) => {
			let value = 0;
			if( degrees <= 90 )
				value = Math.cos( Math.toRad( degrees));
			else if( degrees > 90 && degrees <= 180 )
				value = -1 * Math.cos( Math.toRad(180-degrees));
			else if( degrees > 180 && degrees <= 270)
				value = -1 * Math.sin( Math.toRad( 270-degrees));
			else
				value = Math.cos( Math.toRad(360-degrees));
			return value;
		}

		const getYComp = (degrees) => {
			let value = 0;
			if( degrees <= 90 )
				value = Math.sin( Math.toRad( degrees));
			else if( degrees > 90 && degrees <= 180 )
				value = Math.sin( Math.toRad(180-degrees));
			else if( degrees > 180 && degrees <= 270)
				value = Math.cos( Math.toRad( 270-degrees));
			else
				value = -1 * Math.sin( Math.toRad(360-degrees));
			return value;
		}

		return Vector2D( r * getXComp(deg), r * getYComp(deg) );
	}
}

Math.toRad = function( degree )
{
	return degree * ( Math.PI / 180 );
}

Math.toDeg = function( radian )
{
	return radian * ( 180/ Math.PI );
}

Math.roundToTwo = function( num )
{
	return +(Math.round(num+ "e+2") + "e-2");
}