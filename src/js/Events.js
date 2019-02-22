/**
 * Custom event to announce when an Enemy dies
 *
 * @param {Enemy} e the Enemy that was killed
 */
export const enemyKilledEvent = function(e)
{
    const event = new CustomEvent( 'enemeyKilled', {
        detail :{
            enemy: e
        }
    });
    document.dispatchEvent( event );
}