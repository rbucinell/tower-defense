import Entity from './Entity.js';
import Vector2D from './lib/Vector2D.js';

var id_index = 0; //static index incrementor for Enemy ID debugging

/**
 * Enemy class
 * 
 * @class Enemy
 */
export class Enemy extends Entity
{
    constructor()
    {
        super();
        this.Id = ++id_index;
        this.w = 20;
        this.h = 20;
        this.spd = 3;
        this.Color = "white";
        this._path = [];
        this.curTarget = 0;
    
        this.isMoving = false;
        this.AtGoal = false;
        this.Despawn = false;
    }

    set Path ( path )
    {
        this._path = path.slice();
        this.pos = this._path.shift();
    }

    get Path() { return this._path; }

    /**
     * Update logic for the Enemy object
     * 
     * @returns {void}
     * @memberof Enemy
     */
    update()
    {
        let center = this.center();
        //don't move until flagged to go
        if( !this.isMoving )
            return;
        
        //check if dead or at goal
        if( this.AtGoal || this.hp <= 0 )
        {
            this.Despawn = true;
            return;
        }

        const next_vec = new Vector2D( this.Path[this.curTarget].x, this.Path[this.curTarget].y);
        let next_dir = Vector2D.normal( Vector2D.sub(center, next_vec));
        const dist = Vector2D.dist( next_vec, center);
        next_dir.multiply( dist <= this.spd ? dist : this.spd );

        this.pos = Vector2D.add( this.pos, next_dir );

        const xdist = Math.abs( center.x - next_vec.x );
        const ydist = Math.abs( center.y - next_vec.y );

        if( xdist <= this.w/4 && ydist <= this.w/4)
        {
            this.curTarget++;
            if( this.curTarget === this.Path.length )
            {
                this.AtGoal = true;
                this.curTarget--;//keep this at end to prevent index out of bounds
            }
        }
    }

    /**
     * Draws the enemy object 
     * @param {Context2D} ctx The context to draw the enemy on
     * @memberof Enemy
     * @returns {void}
     */
    draw( ctx )
    {
        if( !this.Despawn)
        {
            ctx.fillStyle = this.Color;
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
            super.draw( ctx );
        }
    }
}

class RedEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "red";
        this.hp = 1;
    }

    get Path ()
    {
        return super.Path;
    }

    set Path( val )
    {
        super.Path = val;
    }
}

class OrangeEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "orange";
        this.hp = 2;
        this.w = 25;
        this.h = 25;
    }
}

class GreenEnemy extends Enemy
{
    constructor()
    {
        super();
        this.Color = "green";
        this.hp = 5;
        this.spd = 5;
    }
}

export class EnemyFactory
{
    /**
     * Creates an Enemy based on type
     * 
     * @static
     * @memberof EnemyFactory
     * @param {string} type The enemy type
     * @param {any} path The path the enemy will follow
     * @returns {Enemy} an Enemy or a subclass
     */
    static createEnemy( type, path )
    {
        var EnemyClass = null;
        
        if( type === "red" )
        {
            EnemyClass = RedEnemy;
        } 
        else if( type === "orange" ) 
        {
            EnemyClass = OrangeEnemy;
        } 
        else if ( type === "green")
            EnemyClass = GreenEnemy;
        else 
        {
            EnemyClass = Enemy;
        }
    
        //Return the class, if its not found return nothing
        if( EnemyClass !== null ) 
        {
            var obj = new EnemyClass();
            obj.Path = path.slice();
            return obj;
        }
    }
}