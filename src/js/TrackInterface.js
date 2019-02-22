import Button from './Button.js'

export default class TrackInterface
{
	constructor( canvas)
	{
		this.canvas = canvas;
		this._track = null;
		this.startWaveButton = new Button( this.LeftEdge, 80, 100, 30, "#55F", "Next Wave");
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

	draw( ctx )
	{
		var startX = this.LeftEdge;
		
		//draw track first so rest of interface always on top
		this.Track.draw( ctx );
		
		//Draw the Title	
		ctx.font = "30px Arial";
		ctx.fillStyle = "#0000FF";
		ctx.fillText( this.Track.Name, startX, 40);
		
		//Draw the Wave information
		
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

		var waveNum = lastIndexActive;
		if( waveNum < this.Track.Waves.length )
		{
			ctx.fillText( `[${waveNum+1}] - ${this.Track.Waves[ waveNum ].Hint}`, startX, 60);
		}
		else
		{
			ctx.fillText( "[FINAL WAVE]", startX, 60);
		}

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