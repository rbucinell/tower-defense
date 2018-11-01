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
        this.posVec = startingPoint;
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
        //console.log( this.Id, this.posVec, this.curTarget)
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

        this.posVec.x += Math.floor(dirVec.x);
        this.posVec.y += Math.floor(dirVec.y);
        this.posVec = new Vector2D( this.posVec.x, this.posVec.y );


        const xdist = Math.abs( this.posVec.x - nextPoint.x );
        const ydist = Math.abs( this.posVec.y - nextPoint.y );


        if( xdist <= this.w/4 && ydist <= this.w/4)
        {
            this.curTarget++;
            if( this.curTarget === this.Path.length )
            {
                this.AtGoal = true;
                this.curTarget--;//keep this at end to prevent index out of bounds
            }
        }
        /*
        var atX = false, atY = false;

        var xdist = Math.abs( this.posVec.x - nextPoint.x );
        if( xdist > this.spd )
            xdist = this.spd
        if( xdist === 0)
            atX = true;
        else
            this.posVec.x = ( this.posVec.x > nextPoint.x ) 
                ? this.posVec.x - xdist 
                : this.posVec.x + xdist;

        var ydist = Math.abs( this.posVec.y - nextPoint.y );
        if( ydist > this.spd )
            ydist = this.spd;
        if( ydist === 0 )
            atY = true;
        else
            this.posVec.y = ( this.posVec.y > nextPoint.y )
                ? this.posVec.y - ydist
                : this.posVec.y + ydist;
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
            ctx.fillRect(this.posVec.x - this.w / 2, this.posVec.y - this.h / 2, this.w, this.h);
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