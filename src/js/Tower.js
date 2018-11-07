import Entity from './Entity.js';
import Vector2D from './lib/Vector2D.js';

/**
 * Tower class
 * 
 * @class Tower
 */
export class Tower extends Entity
{
    constructor() {
        super();
        this.range = 50;
        this.direction = new Vector2D(0,1);
    }

    update() {

    }

    draw( ctx ){

    }
}