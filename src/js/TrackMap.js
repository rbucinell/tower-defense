import Atlas from './Atlas.js'

var DEBUG_MODE = true;

export default class TrackMap
{
	constructor( json )
	{
		this.json = json;
		this.Atlas = new Atlas( json.atlas_map, json.atlas_data, this);

		this.TileWidth = parseInt( json.tile_width );
		this.TileHeight = parseInt(json.tile_height);
		
		this.MapTileWidth = json.map_tile_width;
		this.MapTileHeight = json.map_tile_height;
		
		this.width = this.TileWidth * this.MapTileWidth;
		this.height = this.TileHeight * this.MapTileHeight;
		
		this.BaseColor = json.base_color;
		this.BackgroundImage = json.background_img;
		
		this.TerrainTiles = [];
		this.PathTiles = [];
		this.Path = [];
		this.ObjectTiles = [];
	}

	LoadTiles()
	{
		function populateList( list, jsonArr, tWidth, tHeight )
		{
			for( var t in jsonArr )
			{
				var tile = jsonArr[t];
				tile.x = tile.x * tWidth;
				tile.y = tile.y * tHeight;
				list.push( jsonArr[t] );
			}
		}		
		populateList( this.TerrainTiles, 	this.json.terrain, 	 this.TileWidth, this.TileHeight );
		populateList( this.ObjectTiles, 	this.json.objects, 	 this.TileWidth, this.TileHeight );		
		populateList( this.PathTiles, 		this.json.path.tiles, this.TileWidth, this.TileHeight );

		const fp = this.PathTiles[0];
		const edge = {
			x: fp.x,
			y: fp.y
		};
		
		if( fp.y === 0)
		{
			edge.x = fp.x + this.TileWidth / 2;
		}else if(fp.y  === this.height - this.TileHeight)
		{
			edge.x = fp.x + this.TileWidth / 2;
			edge.y = this.height;
		}
		else if( fp.x === 0 )
		{
			edge.y = fp.y + this.TileHeight / 2;
		}
		else if( fp.x === this.width - this.TileWidth )
		{
			edge.x = fp.x + this.TileWidth /2;
			edge.y = this.height;
		}
		this.Path.push(edge);
		for( let i = 0; i < this.PathTiles.length; i++)
		{
			this.Path.push( { 
				x: this.PathTiles[i].x + this.TileWidth/2, 
				y: this.PathTiles[i].y + this.TileHeight/2
			});
		}
	}

	draw( ctx )
	{
		//Render Order: Background -> terrain -> path -> objects
	
		//Render the Background
		ctx.fillStyle = this.BaseColor;
		ctx.fillRect(0, 0, this.width, this.height);
		
		if( this.Atlas.Textures.length === 0 )
		{
			console.log( "Textures for atlas have not loaded!");
			return;
		}
		
		//Render the Terrain
		const tileCount = this.TerrainTiles.length;

		for( let i = 0; i < tileCount; i++)
		{
			var curTerrain = this.TerrainTiles[i];
			var texture = this.Atlas.getTextureByName( curTerrain.texture_name );
			
			//Draw the terrain 
			ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curTerrain.x, curTerrain.y, this.TileWidth, this.TileHeight);
			
			//Debug tile border and tile name
			if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE === true) {
				ctx.strokeStyle = "lightgray";
				ctx.strokeRect(curTerrain.x, curTerrain.y, this.TileWidth, this.TileHeight);
				
				ctx.fillStyle = "black";
				ctx.font = "8px Arial";
				const tileNumber = curTerrain.texture_name.substring( 8, curTerrain.texture_name.length-4);
				ctx.fillText(tileNumber ,curTerrain.x, curTerrain.y+8); //y+8 is y+fontsize
			}
		}
		
		//Render the path
		const settings = {
			lineWidth: ctx.lineWidth,
			lineDash: ctx.getLineDash(),
			strokeStyle: ctx.strokeStyle
		}		
		ctx.lineWidth = 10;
		ctx.strokeStyle = 'gold';
		ctx.setLineDash([
			10,
			1
		]);
		
		ctx.beginPath();
		ctx.moveTo( this.Path[0].x, this.Path[0].y);
		for( let i = 1; i < this.Path.length; i++)
		{
			const prev = this.Path[i-1];
			const cur = this.Path[i];
			ctx.moveTo(prev.x, prev.y);
			ctx.lineTo(cur.x, cur.y);			
		}
		ctx.stroke();


		ctx.lineWidth = settings.lineWidth;
		ctx.setLineDash( settings.lineDash );
		ctx.strokeStyle = settings.strokeStyle;
		
		/* //Draw using the Map tiles
		const pathCount = this.PathTiles.length;
		for( let i = 0; i < pathCount; i++ )
		{
			const curPath = this.PathTiles[i];
			texture = this.Atlas.getTextureByName( curPath.texture_name );
			ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curPath.x, curPath.y, this.TileWidth, this.TileHeight);
		}*/
		
		//Render the objects
		const objCount = this.ObjectTiles.length;
		for( let i = 0; i < objCount; i++ )
		{
			const curObj = this.ObjectTiles[i];
			texture = this.Atlas.getTextureByName( curObj.texture_name );
			ctx.drawImage(this.Atlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  curObj.x, curObj.y, this.TileWidth, this.TileHeight);
		}
		
	}
}