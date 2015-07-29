var gulp    = require('gulp');
var compile = require('./shared/Css');
var Elixir = require('laravel-elixir');

var config = Elixir.config;


/*
 |----------------------------------------------------------------
 | Stylus Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Stylus, including minification and
 | and auto-prefixing. Stylus is one of the CSS pre-precessors
 | supported by Elixir, along with the Sass and Less CSS processors.
 |
 */

var gulpTask = function(src, output, options) {
    new Elixir.Task('stylus', function() {
        var paths = prepGulpPaths(src, output);

        return compile({
            name: 'Stylus',
            compiler: require('gulp-stylus'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.stylus.pluginOptions
        });
    })
    .watch(config.get('assets.css.stylus.folder') + '/**/*.styl');
};


Elixir.extend('stylus', function() {
    gulpTask.apply(this, arguments);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.stylus.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
