import Entity from './Entity.js';
import Vector2D from './lib/Vector2D.js';

/**
 * Tower class
 * 
 * @class Tower
 */
export class Tower extends Entity
{
    constructor() {
        super();
        this.range = 100;
        this.direction = new Vector2D(0,1);
        this.w = 20;
        this.h = 20;
    }

    update() {

    }

    draw( ctx ){
        
        //draw tower base
        const c = this.center();
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);

        super.draw( ctx );

        //draw cannon
        const len = 15;
        ctx.strokeStyle='#FFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
            ctx.moveTo(c.x,c.y);        
            ctx.lineTo(c.x + (this.direction.x*len), c.y + (this.direction.y*len));
        ctx.stroke();

        
        //draw range
        ctx.strokeStyle='rgba(0,0,255,0.2)'
        ctx.beginPath();
        ctx.arc( c.x, c.y, this.range, 0, 2*Math.PI);
        ctx.stroke();

        
    }
}