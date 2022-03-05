import Track from './Track.js';
import TrackInterface from './TrackInterface.js';

export const DEBUG_MODE = true;
export const DEBUG_TICK = 200;
export const DEBUG_LAST_TICK = 0;

export const TILE_SIZE = 64;

export var gameTime = 0;
export var cnvs;

/**
 * @author Ryan Bucinell
 */
class TDGame
{
    constructor( canvas )
    {
        this.canvas = canvas;
        cnvs = this.canvas;
        this.ctx = this.canvas.getContext("2d");
        this._framerate = 60;
        this._intervalID = -1;
        this._isRunning = false;   
        this.currentTrack = null;
        this.trackInterface = null; 

        this.canvas.addEventListener('mousemove', event =>{
            if( this.trackInterface)
                this.trackInterface.handleMouseHover( event );
        });

        this.canvas.addEventListener('mouseup', (event) => {
            if( this.trackInterface)
                this.trackInterface.handleMouseUp(event);
        });
    }

    /**
     * Returns true if the game is an an active state
     * 
     * @returns {bool}
     */
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
        this.trackInterface = new TrackInterface( this.canvas, this.currentTrack);
    }

    startup( trackFile)
    {
        fetch(trackFile)
            .then((response) => response.json())
            .then((json) => {
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
        gameTime = 0;
    }

    loop()
    {
        const _this = this.game;
        gameTime++;
        if( _this.IsRunning )
        {
            _this.update();
            _this.draw();
        }
    }

    update()
    {
        this.currentTrack.update();
        this.trackInterface.update();
    }

    draw()
    {
        this.ctx.fillStyle = "#fff";
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        if( DEBUG_MODE )
        {
            for( let i = 0; i < canvas.width; i += TILE_SIZE )
            {
                for( let j = 0; j < canvas.height; j += TILE_SIZE )
                {
                    this.ctx.strokeStyle = "#EEE";
                    this.ctx.rect( i, j, TILE_SIZE, TILE_SIZE);
                }
            }
            this.ctx.stroke();
        }
        
        this.trackInterface.draw( this.ctx );
    }
}


function ready(fn) 
{
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading")
    {
        fn();
    } 
    else
    {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(()=>{
    const game = new TDGame( document.getElementById('canvas'));
    window['game'] = game;
    game.start();
});

