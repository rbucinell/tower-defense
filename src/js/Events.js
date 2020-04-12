
export const GameEvents =
{
    ENEMY_KILLED: "enemeyKilled",
    ENEMY_REACHED_GOAL: "enemyReachedGoal",
}

/**
 * Custom event to announce when an Enemy dies
 *
 * @param {Enemy} e the Enemy that was killed
 */
export const enemyKilledEvent = function(e)
{
    document.dispatchEvent( new CustomEvent( GameEvents.ENEMY_KILLED, {
        detail :{
            enemy: e
        }
    }));
}

/**
 * Custom event to announce when an Enemy Reaches player base
 * @param {Evemy} e the Enemy tha reaches the goal
 */
export const enemyReachedGoal = function(e)
{
    console.log('boom')
    document.dispatchEvent( new CustomEvent( GameEvents.ENEMY_REACHED_GOAL, {
        detail:{
            enemy: e
        }
    }));
}