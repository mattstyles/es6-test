# ES6-test

> Quick tests of es6 feature test via [traceur](https://github.com/google/traceur-compiler).
> Built with [gulp](http://gulpjs.com/) and [browserify](http://browserify.org/).

```
gulp traceur
```

Yeah, it works too. Doesnt handle the requires though obviously.

Set `experimental: true` for some features to work (like `let`).


```
gulp build
```

Gonna try browserify with es6ify transform. It works.

Use `es6ify.traceurOverrides = { blockBinding: true };` to enforce experimental mode to allow some syntax to work.
Or `experimental: true`.


```
gulp es6
```

This is lovely and works great.


### notes

All three require `../traceur-compiler/bin/traceur.js`.
With `traceur` included there is no need to add `es6ify.runtime`, however, adding `es6ify.runtime` knackers modules anyway. (version?).
