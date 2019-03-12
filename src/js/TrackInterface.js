import Button from './Button.js'
import Atlas from './Atlas.js'

const INTERFACE_FONT = "Kenney Future Narrow";

export default class TrackInterface
{
	constructor( canvas)
	{
		this.canvas = canvas;
		this._track = null;
		this.startWaveButton = new Button( this.LeftEdge, 80, 100, 30, "#55F", "Next Wave");		
		this.UIAtlas = new Atlas( "img/blue_ui_spritesheet.png", "data/blue_ui_spritesheet.xml")
		this.font = new FontFace(INTERFACE_FONT, 'url(font/kenny_future_narrow.ttf)' );
		this.font.load().then(function(loaded_face){
			document.fonts.add(loaded_face);
			document.body.style.fontFamily= `${INTERFACE_FONT}`;
		});
	}

	loadTrack( track )
	{
		this._track = track;
		this.startWaveButton = new Button( this.LeftEdge, 80, 100, 30, "#55F", "Next Wave");
	}
	
	get Track()
	{
		return this._track;
	}

	set Track( val )
	{
		this._track = val;
	}

	get LeftEdge()
	{
		return this.Track 
				? (this.Track.Map.TileWidth * this.Track.Map.MapTileWidth + this.Track.Map.TileWidth + 10) 
				: 0;
	}

	update()
	{

	}

	drawUI( ctx )
	{
		//Draw Title
		var texture = this.UIAtlas.getTextureByName( "blue_panel.png" );
		ctx.drawImage(this.UIAtlas.SpriteSheet, texture.x, texture.y, texture.w, texture.h,  this.LeftEdge, 0,250,50);
		ctx.font = `30px "${INTERFACE_FONT}"`;
		ctx.fillStyle = "#0000FF";
		ctx.fillText( this.Track.Name, this.LeftEdge + 15, 25, 250 );
		
		//Draw Wave info
		ctx.font = "12px Arial";
		ctx.fillStyle = "#000000";			
		let lastIndexActive = 0;
		for( let i = 0; i < this.Track.Waves.length; i++ )
		{
			if( this.Track.Waves[i].IsActive )
				lastIndexActive = i;
			else
				break;
		}

		let waveNum = lastIndexActive;
		let waveinfo = (waveNum < this.Track.Waves.length) ? `Next Wave: ${this.Track.Waves[ waveNum ].Hint}` : "[FINAL WAVE]";
		ctx.fillText( waveinfo, this.LeftEdge+ 15, 40, 250 );	
	}


	draw( ctx )
	{
		var startX = this.LeftEdge;
		
		//draw track first so rest of interface always on top
		this.Track.draw( ctx );

		this.drawUI( ctx );
		

		this.startWaveButton.draw( ctx );

		ctx.fillText( `Cash: $${ this.Track.Money }`, startX, 150 );

	}
}

TrackInterface.prototype.handleMouseUp = function( event )
{
	var mX = event.x - this.canvas.getBoundingClientRect().left;
	var mY = event.y - this.canvas.getBoundingClientRect().top;
	
	if( this.startWaveButton.hitTest( mX, mY ) )
	{
		this.startWaveButton.handleMouseUp( event );
		console.log( this.Track.CurrentWave, this.Track.Waves.length)
		if( this.Track.CurrentWave <=  this.Track.Waves.length -1 )
			this.Track.nextWave();
	}
}