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
        this.dir = new Vector2D(0,1);
        this.w = 20;
        this.h = 20;
        this.track = null;
    }

    addToTrack( track )
    {
        this.track = track;
    }

    update() 
    {
        let enemiesInRange = [];
        this.track.Waves.filter( w => w.isStarted ).forEach( w => {
            enemiesInRange = enemiesInRange.concat(w.Enemies.filter( e => Vector2D.dist( this.pos, e.pos) < this.range && e.isMoving && !e.Despawn ));
        });

        if( enemiesInRange.length > 0 )
        {
            let first = enemiesInRange.slice()[0];
            this.dir = Vector2D.normal(Vector2D.sub( this.center(), first.center() ));
        }
    }

    draw( ctx ) 
    {        
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
            ctx.lineTo(c.x + (this.dir.x*len), c.y + (this.dir.y*len));
        ctx.stroke();

        //draw range
        ctx.strokeStyle='rgba(0,0,255,0.2)'
        ctx.beginPath();
            ctx.arc( c.x, c.y, this.range, 0, 2*Math.PI);
        ctx.stroke();
    }
}