
var gulp = require( 'gulp' ),
    traceur = require( 'gulp-traceur' ),
    rimraf = require( 'gulp-rimraf' ),
    gulpBrowserify = require( 'gulp-browserify' ),
    gulpUglify = require( 'gulp-uglify' ),
    streamify = require( 'gulp-streamify' ),

    browserify = require( 'browserify' ),
    source = require( 'vinyl-source-stream' ),
    es6ify = require( 'es6ify' ),
    uglify = require( 'uglifyify' );


/**
 * Clean up dist
 */
gulp.task( 'clean', function() {
    return gulp
        .src( 'dist/{,*/}*', {
            read: false
        })
        .pipe( rimraf() );
})



/**
 * Traceur build
 * ---
 * Requires the traceur runtime to be included in the page
 */
gulp.task( 'traceur', [ 'clean' ], function() {

    return gulp
        .src( 'lib/scripts/*.js' )
        .pipe( traceur( {
            sourceMap: true,
            experimental: true
        }))
        .pipe( gulp.dest( 'dist' ) )

});



/**
 * gulp-browserify / ES6ify
 * ---
 * Requires traceur runtime
 */
gulp.task( 'build', [ 'clean' ], function() {

    es6ify.traceurOverrides = {
        blockBinding: true,
        experimental: true
    };

    return gulp
        // .src( 'lib/scripts/*.js', {
        .src( 'lib/scripts/main.js', {
            read: false
        })
        .pipe( gulpBrowserify({
            add: es6ify.runtime,
            debug: true,
            transform: [
                'es6ify'
            ],
            entry: true
        }))
        .on( 'error', function( err ) {
            console.log( 'err:', err );
        })
        .pipe( gulp.dest( './dist/' ) );
});


/**
 * vanilla browserify with es6ify
 */
gulp.task( 'es6', [ 'clean' ], function() {

    es6ify.traceurOverrides = {
        blockBinding: true,
        experimental: true
    };

    // Setting debug to true and uglify on makes this pretty darned small
    return browserify()
        // Adding the runtime here seems to cause some issues
        .add( es6ify.runtime )
        // .transform( es6ify.configure( /^(?!.*node_modules)+.+\.js$/ ) )
        .transform( es6ify )
        // .transform( uglify )
        .require( require.resolve(  './lib/scripts/main.js' ), {
            entry: true
        })
        // .require( require.resolve(  './lib/scripts/jq.js' ), {
        //     entry: true
        // })
        .bundle( {
            debug: true,
            sourceMap: true
            // transform: [
            //     'es6ify'
            // ]
        })
        .on( 'error', console.log )
        .pipe( source( 'main.js' ) )
        // .pipe( streamify( gulpUglify() ) )
        .pipe( gulp.dest( './dist/' ) );

    // return browserify( './lib/scripts/main.js' )
    //     .add( es6ify.runtime )
    //     // .transform( es6ify.configure( /^(?!.*node_modules)+.+\.js$/ ) )
    //     .transform( es6ify )
    //     .bundle( {
    //         debug: true
    //         // transform: [
    //         //     'es6ify'
    //         // ]
    //     })
    //     .on( 'error', console.log )
    //     .pipe( source( 'main.js' ) )
    //     .pipe( gulp.dest( './dist/' ) );

 });
