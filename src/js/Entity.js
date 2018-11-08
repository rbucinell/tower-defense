import Vector2D from './lib/Vector2D.js';

export default class Entity 
{
    constructor() 
    {
        this.pos = new Vector2D(0,0);
        this.w = 0; //width
        this.h = 0; //height
        this.range = 0; //range
        this.hp = 10; //health
        this.spd = 1;//speed
    }

    center()
    {
        return new Vector2D( this.pos.x + this.w / 2, this.pos.y + this.h / 2 );
    }

    update(){}

    draw( ctx ){
        const c = this.center();
        ctx.fillStyle = '#CCC';
        ctx.beginPath();
        ctx.arc(c.x,c.y,2,0,2*Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#CCC';
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y,this.w,this.h);
        ctx.stroke();
    }
}