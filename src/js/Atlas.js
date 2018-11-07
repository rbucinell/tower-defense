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
			.then( 
				fetch(dataFile)
					.then(response => response.text())
					.then(text => {
						const parser = (new DOMParser()).parseFromString(text, "application/xml");
						this.ReadXml(parser); // eslint-disable-line
						if( typeof trackMapReference !== 'undefined' )
							trackMapReference.LoadTiles();
					}));
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
				parseInt(e.attributes['x'].value),
				parseInt(e.attributes['y'].value),
				parseInt(e.attributes['width'].value),
				parseInt(e.attributes['height'].value),
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
		return this.Textures.filter( t => t.Name == textureName )[0];
	}
}