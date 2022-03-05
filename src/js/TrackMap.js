import Atlas from './Atlas.js'
import Sprite from './ui/Sprite.js';
import Tile from './ui/Tile.js';

export default class TrackMap
{

    constructor( json , offset, spawn)
    {
        this.json = json;
        this.Atlas = new Atlas( json.atlas_map, json.atlas_data, this);
        this.TileWidth = parseInt( json.tile_width, 10 );
        this.TileHeight = parseInt(json.tile_height, 10);
        
        this.MapTileWidth = json.map_tile_width;
        this.MapTileHeight = json.map_tile_height;

        this.offset = offset;
        this.spawner = spawn;
        this.spawnerSprite = new Sprite( this.spawner.x - this.TileWidth/2, this.spawner.y, this.TileWidth, this.TileHeight, this.Atlas, "mapTile_114.png" ); 
        this.width = this.TileWidth * this.MapTileWidth;
        this.height = this.TileHeight * this.MapTileHeight;
        
        this.BaseColor = json.base_color;
        this.BackgroundImage = json.background_img;       
        
        this.tiles = {
            terrain: [],
            path: [],
            objects: [],
            towers: []
        };
    }

    loadTiles()
    {
        const createTiles = ( arr, atlas, w, h, offset ) => 
            arr.map( jd => 
                new Tile( jd.x * w +  offset.x, jd.y * h + offset.y, w, h, atlas, jd.texture_name)
        );

        this.tiles = {
            terrain: createTiles( this.json.terrain, this.Atlas, this.TileWidth, this.TileHeight, this.offset),
            path:    createTiles( this.json.path.tiles, this.Atlas, this.TileWidth, this.TileHeight, this.offset),
            objects: createTiles( this.json.objects, this.Atlas, this.TileWidth, this.TileHeight, this.offset),
        }
    }


    drawBackground( ctx )
    {
        //Render Order: Background -> terrain -> path -> objects
    
        //Render the Background
        ctx.fillStyle = this.BaseColor;
        ctx.fillRect(0, 0, this.width, this.height);
        
        //console.log( "Textures for atlas have not loaded!");
        if( this.Atlas.Textures.length === 0 ) return;

        this.tiles.terrain.forEach( tile => tile.draw(ctx));
        this.tiles.path.forEach( tile => tile.draw(ctx));
        
        for( let tileName in this.tiles )
        {
            this.tiles[tileName].forEach( tile => tile.draw(ctx) );
        }
    }

    drawForeground( ctx )
    {
        this.tiles.objects?.forEach( tile => tile.draw(ctx));
        this.spawnerSprite.draw( ctx );
    }
}