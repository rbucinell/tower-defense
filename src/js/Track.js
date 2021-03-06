import TrackMap from './TrackMap.js'
import Wave from './Wave.js'
import Vector2D from './lib/Vector2D.js';
import { Tower, TowerFactory } from './Tower.js';
import {GameEvents} from './Events.js';

export default class Track
{
    constructor( json )
    {
        const tileWidth  = parseInt( json.map.tile_width, 10 );
        const tileHeight = parseInt( json.map.tile_height, 10 );
        
        this.offset = {
            x: parseInt(json.map_offset_x, 10) * tileWidth,
            y: parseInt(json.map_offset_y, 10) * tileHeight
        };
        
        const spawn = {
            x: parseInt( json.map.path.spawn.x, 10 ) * tileWidth + tileWidth / 2 + this.offset.x,
            y: parseInt( json.map.path.spawn.y, 10 ) * tileHeight + tileHeight / 2+ this.offset.y
        }

        this._name = json.name;
        this._difficutly = json._difficutly;
        this._map = new TrackMap( json.map, this.offset, spawn );
        this._path = [];
        this._waves = [];
        this._waveEnemies = [];
        this._curWave = 0;
        this._towers = []
        this._money = 20;
        this._lives = 30;
                
        this.Path.push( spawn );

        for( var p of json.map.path.tiles )
        {
            this.Path.push({
                x: parseInt( p.x, 10 ) * ( tileWidth ) + tileWidth / 2 + this.offset.x,
                y: parseInt( p.y, 10 ) * ( tileHeight ) + tileHeight / 2 + this.offset.y
            });
        }

        for( var w of json.waves )
        {
            this._waves.push( new Wave( this, w, this.Map.Atlas ) );
        }
        this._waveEnemies = this._waves[ this.CurrentWave ].Enemies;

        document.addEventListener( GameEvents.ENEMY_KILLED, (e) => this.Money += e.detail.enemy.bounty );
        document.addEventListener( GameEvents.ENEMY_REACHED_GOAL, (e) => this.Lives -= e.detail.enemy.damage );

        //testing
        TowerFactory.LoadConfig()
        let t = TowerFactory.createTower('basic');
        t.pos = new Vector2D( 5.5 * tileWidth, 3.5 * tileHeight);
        //this.placeTower( t );
    }

    placeTower( tower )
    {
        tower.addToTrack( this );
        this.Towers.push( tower );
    }

    get Name()
    {
        return this._name;
    }

    get Path()
    {
        return this._path;
    }

    set Path( val )
    {
        this._path = val;
    }

    get Waves()
    {
        return this._waves;
    }

    get Map()
    {
        return this._map;
    }

    get CurrentWave()
    { 
        return this._curWave; 
    }

    set CurrentWave( val )
    {
        this._curWave = val;
    }

    get Towers()
    {
        return this._towers;
    }

    set Towers( val ){
        this._towers = val;
    }

    get Enemies() {
        return this._waveEnemies;
    }

    get Money()
    {
        return this._money;
    }

    set Money( val )
    {
        if( val < 0) val = 0;
        this._money = val;
    }

    get Lives()
    {
        return this._lives;
    }

    set Lives( val )
    {
        if( val < 0 ) val = 0;
        this._lives = val;
    }

    nextWave() 
    {
        for( let i = 0; i < this.Waves.length; i++ )
        {
            let w = this.Waves[i];
            if( !w.IsActive)
            {
                w.startWave(i);
                break;
            }
        }
    }

    update()
    {
        this.Towers.forEach( t => t.update() );
        if( this.CurrentWave >= this._waves.length )
        {
            //TODO check enemies and remainng life to determine win/loss
        }
        else
        {
            this.Waves.forEach( (w) =>  w.update() );
        }
        this.Towers.forEach( t => t.bullets.forEach( b => {
            for( let w = 0; w < this.Waves.length; w++ )
            {
                for( let e = 0; e < this.Waves[w].Enemies.length; e++ )
                {
                    if( !b.disposed )
                    {
                        b.collideWith( this.Waves[w].Enemies[e] );
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }));
    }

    draw( ctx )
    {
        this.Map.drawBackground( ctx );
        this.Waves.forEach( w => w.draw(ctx) );
        this.Map.drawForeground( ctx );
        this.Towers.forEach( t => t.draw( ctx ));
    }
}