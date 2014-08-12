/**
 * Testing Traceur shizzle
 * since 25 April 2014
 * ---
 * https://github.com/google/traceur-compiler/wiki/LanguageFeatures
 */


/**
 * Test requiring from a different file in the project
 */
var Test = require( './sub.js' );
var test = new Test( 'test' );
test.attack();
console.log( test.id );


/**
 * Test requiring from node_modules
 */
var Test2 = require( 'test' );
var t = new Test2( 'aTest' );
t.attack( 'lionel' );
console.log( 't.id:', t.id );


/**
 * Test importing from node_modules
 */
import { default as Mod } from 'es6-test';
var m = new Mod( 'clarence' );
console.log( 'm.name:', m.name );


/**
 * Test constants
 * ---
 * Will work in Chrome anyway, and many other places
 */
const CONSTANT_VAR = 'I am a constant, you cant change me';

/**
 * Test classes
 */
class Character {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
  }
  attack(character) {
    console.log('attacking', character);
  }
}

class Monster extends Character {
  constructor(x, y, name) {
    super(x, y);
    this.name = name;
    this.health_ = 100;
  }

  attack(character) {
    super.attack(character);
  }

  get isAlive() { return this.health > 0; }
  get health() { return this.health_; }
  set health(value) {
    if (value < 0) throw new Error('Health must be non-negative.');
    this.health_ = value;
  }
}


/**
 * Test of keyword
 */
for (let element of [1, 2, 3]) {
  console.log('element:', element);
}


/**
 * Test modules
 * ---
 * works, but inlining modules is tetchy
 */
import { firstName, lastName } from './module';

console.log( 'Hello', firstName, lastName );

import { default as println } from './defmodule';
println( 'hello from imported println module' );

// import { default as $ } from 'jquery';
// import needs some work at jquery end as it transpiles to
// `var $ = require( 'jquery' ).default` which isnt much help

// This will work - but only because './jq' es6-mods jQuery - you might as well `require` it
// import { default as $ } from './jq';
// import $ from './jq';
// console.log( 'jquery:', $ );
// console.log( 'body:', $( 'body' ) );


// Remote loading JSON2
// Does not currently work - link doesnt return json2.js anyway
//import JSON from 'http://json.org/modules/json2.js';

/**
 * Test template literals
 * ---
 * works - note the backticks
 */
// console.log( `hello ${firstName}` );


/**
 * Testing async functions
 */
function timeout( ms ) {
    return new Promise( (resolve) => {
        setTimeout( resolve, ms );
    });
}

async function asyncValue( val ) {
    console.log( 'Wait for it' );
    await timeout( 1000 );
    console.log( 'Here it is' );
    return val + ' feel the power of async';
}

// Turned off so that the output logs are easier to read
// // This works.
// asyncValue( '-- gotta love da async --' ).then( function( value ) {
//     console.log( `${value}` );
// });
//
// // This also works.
// var value = asyncValue( 42 );
// console.log( 'async value now: (is a promise)', value );
// value.then( function( value ) {
//     console.log( 'async resolved value:', value );
// });


/**
 * Testing Types
 * ---
 * Tried a few ways but cant get this to work
 */
let typeme = function( str:string ):string {
    console.log( str );

    return 'type: ' + str;
}

typeme( 'hello strict types' );
typeme( true );    // should break


/**
 * Testing default params
 */
function paramFn( foo, bar = 'bar' ) {
    console.log( foo );
    console.log( bar );
}

paramFn( 'foo' );
// should output foo\nbar
paramFn( 'quuz', 'radon' );
// should output quuz\nradon




/**
 * Expose for testing
 */
window.Monster = Monster;
window.CONSTANT_VAR = CONSTANT_VAR;
window.asyncValue = asyncValue;
// window.$ = $;

console.log( 'from main.js, with ♥' );
