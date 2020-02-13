import Texture from './Texture.js'

//Global atlas reference
var gAtlases = [];

export default class Atlas
{
	constructor( spriteSheet, dataFile, trackMapReference)
	{
		this.Textures = [];
		this.fullyloaded = false;
		
		this.SpriteSheet = new Image();
		this.loadSpritsheet(spriteSheet, dataFile, trackMapReference);
        gAtlases.push( this );

	}

	loadSpritsheet( spriteSheet, dataFile, trackMapReference)
	{
		fetch(spriteSheet)
			.then(response => response.blob())
			.then(file => URL.createObjectURL(file))
			.then(blob =>{
				return new Promise((resolve, reject)=>{
					this.SpriteSheet.onload = ()=> resolve();
					this.SpriteSheet.onerror = reject;
					this.SpriteSheet.src = blob;
				});	
			})
			.then(fetch(dataFile)
					.then(response => response.text())
					.then(text => {
						const parser = (new DOMParser()).parseFromString(text, "application/xml");
						this.ReadXml(parser); // eslint-disable-line
						if( typeof trackMapReference !== 'undefined' )
							trackMapReference.LoadTiles();
					})
			);
	}
	
	/**
	 * Reads the xml configuration 
	 * 
	 * @param {XMLDocument} xmlDoc the xml to parse
	 * @memberof Atlas
	 * @returns {void}
	 */
	ReadXml( xmlDoc )
	{	
		var elements = xmlDoc.getElementsByTagName( 'SubTexture' );
		Array.from(elements).forEach( e =>{
			this.Textures.push( new Texture( 
				e.attributes['name'].value,
				parseInt(e.attributes['x'].value, 10),
				parseInt(e.attributes['y'].value, 10),
				parseInt(e.attributes['width'].value, 10),
				parseInt(e.attributes['height'].value, 10),
			this));
		});
		this.fullyloaded = true;
	}

	/**
	 * Gets a texture by the by its name
	 * 
	 * @param {string} textureName name of the texture to search for
	 * @returns {Texture} a texture with the given name
	 * @memberof Atlas
	 */
	getTextureByName( textureName )
	{
		return this.Textures.filter( t => t.Name === textureName )[0];
	}

	/**
	 * Retrieves a texture from the atlas and draws it to the canvas
	 *
	 * @param {string} texture_name name of the texture to draw
	 * @param {CanvasRenderingContext2D} ctx the current 2d context of the canvas
	 * @param {Number} x	the x cordinate location of where to draw the texture
	 * @param {Number} y the y cordinate location of where to draw the texture
	 * @param {Number} w the width of the drawn texture
	 * @param {Number} h the height of the drawn texture
	 * @memberof Atlas
	 */
	drawTexture(texture_name, ctx, x, y, w, h )
	{
        const texture = this.getTextureByName( texture_name );
        if( texture )
		    ctx.drawImage(this.SpriteSheet, texture.x, texture.y, texture.w, texture.h, x, y, w, h);		
	}
}