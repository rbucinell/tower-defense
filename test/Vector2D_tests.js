import Vector2D from '../src/js/lib/Vector2D.js';


function runTests()
{
    testDotProduct();
    testMagnitude();
    testAdd();
}
runTests();

function testDotProduct()
{
    const tests = [
        [new Vector2D( 2, 2 ), new Vector2D( 3, 1 ), 8],
        [new Vector2D( 5, 12 ), new Vector2D( -6, 8 ), 65.98],
        [new Vector2D( 12, 9 ), new Vector2D( -12,16 ), 0],
    ]

    for( let test of tests )
    {
        const vec1 = test[0];
        const vec2 = test[1];
        const expected = test[2];
        console.log( `Dot Product of ${vec1} • ${vec2}: Expected=${expected} vs Actual=${vec1.dot(vec2)}`);
    }
}

function testMagnitude()
{
    const tests = [
        [new Vector2D( 0, 1), 1],
        [new Vector2D( 3, 4), 5],
        [new Vector2D( 0, 0), 0],
    ]

    for( let test of tests )
    {
        const vec1 = test[0];
        const expected = test[1];
        console.log( `Magnitude of ${vec1}: Expected=${expected} vs Actual=${vec1.mag()}`);
    }
}


function testAdd()
{
    const tests = [
        [new Vector2D( 0, 1 ), new Vector2D( 0, 1 ), new Vector2D(0,2)],
        [new Vector2D( 4, 2 ), new Vector2D( 3, 1 ), new Vector2D(7,3)],
    ]

    for( let test of tests )
    {
        const vec1 = test[0];
        const vec2 = test[1];
        const expected = test[2];
        console.log( `Dot Product of ${vec1} + ${vec2}: Expected=${expected} vs Actual=${Vector2D.add(vec1,vec2)}`);
    }
}