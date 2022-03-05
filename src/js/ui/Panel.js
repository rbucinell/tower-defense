import Sprite from "./Sprite.js";

/**
 * Defines a basic panel for the interface
 */
export default class Panel extends Sprite
{
    constructor( x, y, w, h, atlas, textureName)
    {
        super(x,y,w,h,atlas,textureName);
    }

    draw( ctx ) {
        //Instead of just stretching the original texture, explode it into 9 pieces, so the corners stay proporionaly correct
        let t = this.atlas.getTextureByName( this.textureName );
        let sheet = this.atlas.SpriteSheet;
        if( t )
        {
            let smallW = Math.min( this.w/3, t.w);
            let smallH = Math.min( this.h/3, t.h);

            ctx.drawImage(sheet, t.x,         t.y,          t.w/3,  t.h/3,      this.x,                     this.y,                     smallW,             smallH         );
            ctx.drawImage(sheet, t.x+t.w/3,   t.y,          t.w/3,  t.h/3,      this.x + smallW,            this.y,                     this.w-smallW*2,    smallH         );
            ctx.drawImage(sheet, t.x+2*t.w/3, t.y,          t.w/3,  t.h/3,      this.x + this.w- smallW,    this.y,                     smallW,             smallH         );
            ctx.drawImage(sheet, t.x,         t.y+t.h/3,    t.w/3,  t.h/3,      this.x,                     this.y + smallH,            smallW,             this.h-2*smallH);
            ctx.drawImage(sheet, t.x+t.w/3,   t.y+t.h/3,    t.w/3,  t.h/3,      this.x + smallW,            this.y + smallH,            this.w-smallW*2,    this.h-2*smallH);
            ctx.drawImage(sheet, t.x+2*t.w/3, t.y+t.h/3,    t.w/3,  t.h/3,      this.x + this.w - smallW,   this.y + smallH,            smallW,             this.h-2*smallH);
            ctx.drawImage(sheet, t.x,         t.y+ 2*t.w/3, t.w/3,  t.h/3,      this.x,                     this.y + this.h - smallH,   smallW,             smallH         );
            ctx.drawImage(sheet, t.x+t.w/3,   t.y+ 2*t.w/3, t.w/3,  t.h/3,      this.x + smallW,            this.y + this.h - smallH,   this.w-smallW*2,    smallH         );
            ctx.drawImage(sheet, t.x+2*t.w/3, t.y+ 2*t.w/3, t.w/3,  t.h/3,      this.x + this.w - smallW,   this.y + this.h - smallH,   smallW,             smallH         );
        }
    }
}