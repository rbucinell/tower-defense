import Track from './Track.js';
import TrackInterface from './TrackInterface.js';

export var DEBUG_MODE = true;
export var game_time = 0;

class TDGame
{
    constructor( canvas )
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this._framerate = 60;
        this._intervalID = -1;
        this._isRunning = false;   
        this.currentTrack = null;
        this.trackInterface = null; 

        this.canvas.addEventListener('mouseup', (event) => {
            if( this.trackInterface)
                this.trackInterface.handleMouseUp(event);
        });
    }

    get IsRunning(){
        return this._isRunning;
    }

    set IsRunning( val )
    {
        this._isRunning = val;
    }

    loadTrack( json )
    {
        this.currentTrack = new Track( json );
        this.trackInterface = new TrackInterface( this.canvas);
        this.trackInterface.loadTrack( this.currentTrack);
    }

    startup( trackFile)
    {
        fetch(trackFile).then((response) =>	{ 
            return response.json(); }).
        then((json) => {
			this.loadTrack( json );
            this.IsRunning = true;
            this._intervalID = setInterval( this.loop, 1000 / this._framerate );
		});
    }

    start()
    {
        this.startup('data/track1.json');
    }

    stop()
    {
        this._isRunning = false;
        clearInterval( this._intervalID );
        this.shutdown();
    }

    shutdown()
    {        
        game_time = 0;
    }

    loop()
    {
        const _this = this.game;
        game_time++;
        if( _this.IsRunning )
        {
            _this.update();
            _this.draw();
        }
    }

    update()
    {
        this.currentTrack.update();
    }

    draw()
    {
        this.ctx.fillStyle = "#fff";
        this.ctx.clearRect( 0,0,this.canvas.width, this.canvas.height);
        this.trackInterface.draw( this.ctx );
    }
}


function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

ready(()=>{
    const game = new TDGame( document.getElementById('canvas'));
    window['game'] = game;
    game.start();
});

