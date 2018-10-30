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
        var startingPoint = this._path.shift();
        this.pos = startingPoint;
        this.posVec.x = startingPoint.x;
        this.posVec.y = startingPoint.y;
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
        //don't move until flagged to go
        if( !this.isMoving )
            return;
        
        //check if dead or at goal
        if( this.AtGoal || this.hp <= 0 )
        {
            this.Despawn = true;
            return;
        }

        
        var nextPoint = this.Path[this.curTarget];

        var nextPtVec = new Vector2D( nextPoint.x, nextPoint.y );
        let dirVec = Vector2D.normal( Vector2D.sub(this.posVec,nextPoint));

        let dist = Vector2D.dist( nextPtVec, this.posVec );
        dirVec.multiply( dist <= this.spd ? dist : this.spd );
        if( this.Id === 1)
        {
            console.log( this.pos );
            console.log( nextPtVec, dirVec);
        }

        this.pos.x += Math.floor(dirVec.x);
        this.pos.y += Math.floor(dirVec.y);
        this.posVec = new Vector2D( this.pos.x, this.pos.y );

        if( this.posVec.x === nextPoint.x && this.posVec.y === nextPoint.y )
            this.curTarget++;
        /*
        var atX = false, atY = false;

        var xdist = Math.abs( this.pos.x - nextPoint.x );
        if( xdist > this.spd )
            xdist = this.spd
        if( xdist === 0)
            atX = true;
        else
            this.pos.x = ( this.pos.x > nextPoint.x ) 
                ? this.pos.x - xdist 
                : this.pos.x + xdist;

        var ydist = Math.abs( this.pos.y - nextPoint.y );
        if( ydist > this.spd )
            ydist = this.spd;
        if( ydist === 0 )
            atY = true;
        else
            this.pos.y = ( this.pos.y > nextPoint.y )
                ? this.pos.y - ydist
                : this.pos.y + ydist;
        if( atX && atY )
        {
            this.curTarget++;
            if( this.curTarget === this.Path.length )
            {
                this.AtGoal = true;
                this.curTarget--;//keep this at end to prevent index out of bounds
            }
        }*/
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
            ctx.fillStyle = this.Color
            ctx.fillRect(this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);
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