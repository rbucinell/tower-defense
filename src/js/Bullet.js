import Vector2D from './lib/Vector2D.js';

export default class Bullet 
{
    constructor() 
    {
        this.pos = new Vector2D(0,0);
        this.dir = new Vector2D(0,0);
        this.spd = 5;
    }

    /**
     * Initializes the bullet's initial configuratoin 
     * 
     * @param {Vector2D} position The initial vector location of the bullet
     * @param {Vector2D} direction The initial unit vector direction of the bullet
     * @param {Number} speed The velocity of the bullet
     * @memberof Bullet
     */
    spawn( position, direction, speed )
    {
        this.pos = position;
        this.spd = speed;
        this.dir = Vector2D.multiply( Vector2D.normal(direction), new Vector2D( this.spd, this.spd ));
    }

    update()
    {
        this.pos = Vector2D.add( this.pos, this.dir );
    }

    draw( ctx ){
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,2,0,2*Math.PI);
        ctx.fill();
    }
}