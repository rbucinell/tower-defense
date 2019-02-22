
export const GameEvents =
{
    ENEMY_KILLED: "enemeyKilled"
}

/**
 * Custom event to announce when an Enemy dies
 *
 * @param {Enemy} e the Enemy that was killed
 */
export const enemyKilledEvent = function(e)
{
    const event = new CustomEvent( GameEvents.ENEMY_KILLED, {
        detail :{
            enemy: e
        }
    });
    document.dispatchEvent( event );
}