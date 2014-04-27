# ES6-test

> Quick tests of es6 feature test via [traceur](https://github.com/google/traceur-compiler).
> Built with [gulp](http://gulpjs.com/) and [browserify](http://browserify.org/).

```
gulp traceur
```

Yeah, it works too.

Set `experimental: true` for some features to work (like `let`).


```
gulp build
```

Gonna try browserify with es6ify transform. It works.

Use `es6ify.traceurOverrides = { blockBinding: true };` to enforce experimental mode to allow some syntax to work.
Or `experimental: true`.


Both need the traceur runtime, es6ify can supply this:

```
gulp es6
```

This is lovely and works great.
