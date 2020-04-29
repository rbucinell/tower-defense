import Entity from './Entity.js';
import Vector2D from './lib/Vector2D.js';
import Bullet from './Bullet.js';
import { gameTime } from './main.js';

/**
 * Standard class for a tower
 *
 * @export
 * @class Tower
 * @extends {Entity}
 */
export class Tower extends Entity
{
    constructor() 
    {
        super();
        this.range = 100;
        this.dir = new Vector2D(0,1);
        this.w = 20;
        this.h = 20;
        this.track = null;
        this.bullets = [];
        this.lastfiretime = null;
        this.fire_rate = 20;
        this.bullet_speed = 10;
        this.sfx = {
            "fire": new Audio("audio/sfx/sfx_wpn_machinegun_loop1.wav")
        };
    }

    /**
     *
     *
     * @param {Track} track
     * @memberof Tower
     */
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
            //track the enemy best you can until you're ready to fire
            let first = enemiesInRange[0];
            this.dir = Vector2D.normal(Vector2D.sub( this.center(),first.center()));
            
            //fire at enemy
            if( this.lastfiretime === null ||  gameTime - this.lastfiretime > this.fire_rate )
            {
                this.dir = this.aimAt( first );
                this.fireBullet();
            }
        }
        
        this.bullets= this.bullets.filter( b => ! b.disposed);
        this.bullets.forEach( b => b.update());
    }

    /**
     * Aims at the e with prediction
     *
     * @param {*} e The enemy to aim at
     * @memberof Tower
     */
    aimAt( e )
    {
        //create an entity for ease
        let b = new Bullet();
        b.spawn( this.center(), this.dir, this.bullet_speed);
        this.sfx.fire.play();

        let predict = new Vector2D(
            (b.Vx * e.pos.x - e.Vx * this.pos.x) / ( b.Vx - e.Vx ),
            (b.Vy * e.pos.y - e.Vy * this.pos.y) / ( b.Vy - e.Vy )
        );
        return Vector2D.sub( this.center(), predict );
    }

    /**
     * Creates a bullet to fire at a given target
     *
     * @param {Enemy} enemy The target to fire at
     * @memberof Tower
     */
    fireBullet()
    {
        let b = new Bullet();
        b.spawn( this.center(), this.dir, this.bullet_speed);
        this.bullets.push( b );
        this.lastfiretime = gameTime;
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
        ctx.strokeStyle='rgba(0,0,255,0.2)';
        ctx.beginPath();
            ctx.arc( c.x, c.y, this.range, 0, 2*Math.PI);
        ctx.stroke();

        this.bullets.forEach( b => b.draw( ctx ));
    }
}

class BasicTower extends Tower
{
    constructor()
    {
        super();
    }

    fireBullet() {
        super.fireBullet();
        console.log( 'basic fire');
    }
}


export class TowerFactory
{
    static createTower( type ) {
        var TowerClass = null;
        if( type == "basic")
        {
            TowerClass = BasicTower;
        }
        return TowerClass;
    }

    static LoadConfig()
    {
        console.log( 'load towers');
        fetch("data/towers.json")
            .then(response => response.json())
            .then( json => {
                TowerFactory.config = json["towers"];
            }
        );
    }
}
TowerFactory.config;