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
		fetch(spriteSheet).
			then((response) => response.blob() ).
			then((b) => {
				this.SpriteSheet.src = URL.createObjectURL(b);
			}).
			then(() => {
				fetch(dataFile).
					then((response) => response.text()).
					then( (text) => {
						this.ReadXml( $.parseXML(text)); // eslint-disable-line
						if( typeof trackMapReference !== 'undefined' )
							trackMapReference.LoadTiles();
					});
				
				
			})
		
			
		gAtlases.push( this );
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
		var textureCount = elements.length;
		
		for( var i = 0; i < textureCount; i++)
		{
			var texture = new Texture( elements[i].attributes['name'].value,
				parseInt(elements[i].attributes['x'].value),
				parseInt(elements[i].attributes['y'].value),
				parseInt(elements[i].attributes['width'].value),
				parseInt(elements[i].attributes['height'].value),
				this);
			this.Textures.push( texture );
		}
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
		return $.grep(this.Textures, function(e){ return e.Name == textureName; })[0]; // eslint-disable-line
	}
}