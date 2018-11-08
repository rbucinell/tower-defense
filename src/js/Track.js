import TrackMap from './TrackMap.js'
import Wave from './Wave.js'
import { Tower } from './Tower.js';
import Vector2D from './lib/Vector2D.js';

export default class Track
{
    constructor( json )
    {
        this._name = json.name;
        this._difficutly = json._difficutly;
        this._map = new TrackMap( json.map );
        this._path = [];
        this._waves = [];
        this._waveEnemies = [];
        this._curWave = 0;
        this._towers = []
        
        var tileWidth = parseInt( json.map.tile_width );
        var tileHeight = parseInt( json.map.tile_height );

        var spawn = {
            x: parseInt( json.map.path.spawn.x ) * tileWidth + tileWidth / 2,
            y: parseInt( json.map.path.spawn.y ) * tileHeight + tileHeight / 2
        }
        this.Path.push( spawn );

        for( var p of json.map.path.tiles )
        {
            var curPath = {
                x: parseInt( p.x ) * ( tileWidth ) + tileWidth / 2,
                y: parseInt( p.y ) * ( tileHeight ) + tileHeight / 2
            }
            this.Path.push( curPath );
            //this.Path.push( json.map.path.tiles[p] );
        }

        for( var w of json.waves )
        {
            this._waves.push( new Wave( this, w, this.Map.Atlas ) );
        }
        this._waveEnemies = this._waves[ this.CurrentWave ].Enemies;

        //testing
        let t = new Tower();
        t.pos = new Vector2D( 5.5 * tileWidth, 3.5 * tileHeight);
        this.placeTower( t );
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
    }

    draw( ctx )
    {
        this.Map.draw( ctx );
        this.Waves.forEach( w => w.draw(ctx) );
        this.Towers.forEach( t => t.draw( ctx ));
    }
}