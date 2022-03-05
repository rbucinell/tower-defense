import Atlas from './Atlas.js';
import {TowerFactory} from './Tower.js'
import {TILE_SIZE} from './main.js';
import Button from './ui/Button.js';
import Panel from './ui/Panel.js';
import Label from './ui/Label.js';
import Sprite from './ui/Sprite.js';

export const {INTERFACE_FONT} = "Kenney Future Narrow";

export default class TrackInterface
{
    constructor( canvas, track )
    {
        this.canvas = canvas;
        this._track = track;        
        this.settings = {
            panel : {
                padding: 10
            }
        };
        this.Atlases = {
            "TD" : new Atlas( "img/towerDefense_tilesheet.png", "data/tower_defense_spritesheet.xml"),
            "UI" :
            {
                "Blue" : new Atlas( "img/blue_ui_spritesheet.png", "data/blue_ui_spritesheet.xml"),
                "Grey" : new Atlas( "img/grey_ui_spritesheet.png", "data/grey_ui_spritesheet.xml"),
            }
        }
        this.font = new FontFace(INTERFACE_FONT, 'url(font/kenny_future_narrow.ttf)' );
        this.font.load().then(function(loaded_face){
            document.fonts.add(loaded_face);
            document.body.style.fontFamily= `${INTERFACE_FONT}`;
        });

        console.log( this.font );

        //In-Order list of components that need to be rendered to the screen
        this.renderComponents = {
            //Draw Side Panel
            interfaceMainPanel: new Panel(  this.LeftEdge, 0,TILE_SIZE*5, TILE_SIZE*10, this.Atlases.UI.Grey, "grey_panel.png" ),
            
            //Draw Title
            interfaceTitlePanel: new Panel( this.LeftEdge, 0,TILE_SIZE*5, TILE_SIZE, this.Atlases.UI.Blue, "blue_panel.png" ),
            interfaceTitleLabel: new Label( this.LeftEdge + TILE_SIZE / 4, 25,"30px", "#0000FF", this.Track.Name, 250),
            //Wave
            waveStartButton: new Button(    this.LeftEdge + this.settings.panel.padding, 80, 100, 30, this.Atlases.UI.Blue, 'blue_button00.png', 'Next Wave', '#000', '12px'),
            waveHintLabel: new Label(       this.LeftEdge + 15, 40, "12px", '#000', `Wave Hint: ${this.Track.Waves[ 0 ].Hint}`, 250 ),
            //Draw $
            currentMoneySprite: new Sprite( this.LeftEdge + 100, 60, undefined, undefined, this.Atlases.TD, 'td_tile287.png'),
            currentMoneyLabel:  new Label(  this.LeftEdge + 155, 105, "30px", 'goldenrod', this.Track.Money ),
             //Draw <3
            currentHealthSprite: new Sprite(this.LeftEdge + 200, 60, undefined, undefined, this.Atlases.TD, 'td_tile289.png'),
            currentHealthLabel:  new Label( this.LeftEdge + 255, 105,"30px", 'darkred', this.Track.Lives ),
        }
		
		this.towerShop;		
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
        return this.Track.Map.MapTileWidth * TILE_SIZE +  this.Track.offset.x * 2;
    }

    update()
    {
        this.renderComponents.currentMoneyLabel.Text  = this.Track.Money;
        this.renderComponents.currentHealthLabel.Text = this.Track.Lives;
    }

    drawUI( ctx )
    {      
        for( let c in this.renderComponents )
        {
            this.renderComponents[c].draw( ctx );
        }
        //Towers Availble
        //TODO
    }

    draw( ctx )
    {
        this.Track.draw( ctx );
        this.drawUI( ctx );
    }
}

TrackInterface.prototype.handleMouseHover = function( event )
{
    var mX = event.x - this.canvas.getBoundingClientRect().left;
    var mY = event.y - this.canvas.getBoundingClientRect().top;
    this.renderComponents.waveStartButton.handleMouseHover( event, mX, mY );
}

TrackInterface.prototype.handleMouseUp = function( event )
{
    var mX = event.x - this.canvas.getBoundingClientRect().left;
    var mY = event.y - this.canvas.getBoundingClientRect().top;
    
    if( this.renderComponents.waveStartButton.hitTest( mX, mY ) )
    {
        if( this.Track.CurrentWave <=  this.Track.Waves.length -1 )
        {
            this.Track.nextWave();
            let lastIndexActive = 0;
            let lia = Math.max(this.Track.Waves.findIndex( w => !w.IsActive )-1, 0);
            for( let i = 0; i < this.Track.Waves.length; i++ )
            {
                if( this.Track.Waves[i].IsActive )
                    lastIndexActive = i;
                else
                    break;
            }
            let waveinfo = (lastIndexActive < this.Track.Waves.length) ? `Wave Hint: ${this.Track.Waves[ lastIndexActive ].Hint}` : "[FINAL WAVE]";
            this.renderComponents.waveHintLabel.Text = waveinfo;
        }
    }
}