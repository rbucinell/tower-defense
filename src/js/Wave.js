import {EnemyFactory} from './Enemy.js'
import {game_time} from './main.js'

export default class Wave
{
	constructor( parent, jsonobj, atlas)
	{		
		this.Parent = parent;
		this.Atlas = atlas;
		this.Name = jsonobj.name;
		this.Hint = jsonobj.hint;
		this.Enemies = new Array();
		this.isStarted = false;

		this.delay = 100;
		this.waveStartTime = -1;

		//Create enemies in wave
		jsonobj.enemies.forEach( e =>{
			for( let i = 0; i < e.qty; i++ )
				this.Enemies.push( EnemyFactory.createEnemy( e.type, this.Parent.Path));
		});
		
		this.enemyIndex = 0;
		this.waveSpawnComplete = false;
		this.wavelength = this.Enemies.length;
	}

	get IsActive(){ return this.waveStartTime > 0; }
	
	/**
	 * Starts sending the wave of enemies
	 * 
	 * @memberof Wave 
	 * @returns {void}
	 */
	startWave( waveNum )
	{
		this.waveStartTime = game_time;
		this.isStarted = true;
		this.Enemies.forEach( (e, i) => e.StartTime = this.delay * i + this.waveStartTime );
	}

	update()
	{
		if( !this.isStarted )
			return;
			
		this.Enemies.forEach( (e,i) => {
			if( !e.isMoving )
				if( e.StartTime < game_time ) 
					this.Enemies[i].isMoving = true;
			if( (typeof e === 'undefined' || e.AtGoal || e.Health <= 0) && e.Despawn === false)
			{
				this.Enemies[i].Despawn = true;
			}
		});
		this.Enemies = this.Enemies.filter( el => !el.Despawn );
		this.Enemies.forEach( e => e.update());		
	}

	draw( ctx )
	{
		if( this.isStarted)
			this.Enemies.forEach( (e) => e.draw(ctx ));
	}
}