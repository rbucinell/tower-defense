import Vector2D from './lib/Vector2D.js';

export default class Bullet 
{
    constructor() 
    {
        this.pos = new Vector2D(0,0);
        this.dir = new Vector2D(0,0);
        this.spd = 5;
    }

    update()
    {
        this.pos = Vector2D.add( this.pos, Vector2D.multiply(this.dir,new Vector2D(this.spd,this.spd)));
    }

    draw( ctx ){
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,2,0,2*Math.PI);
        ctx.fill();
    }
}