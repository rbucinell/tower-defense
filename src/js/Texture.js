export default class Texture
{
    constructor( name, x, y, w, h, atlas )
    {
        this.Name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cx = this.x + this.w/2;
        this.cy = this.y + this.h/2;
        this.Atlas = atlas;
    }
}