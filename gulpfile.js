var gulp = require('gulp'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    cache = require('gulp-cached'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-minify-css'),
    csslint = require('gulp-csslint'),
    es6to5 = require('gulp-6to5'),
    wp = require('webpack');
    webpack = require('gulp-webpack'),
    stripdebug = require('gulp-strip-debug'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('index', function() {
    return gulp.src('src/index.html')
        .pipe(plumber())
        .pipe(changed('build/'))
        .pipe(gulp.dest('build/'));
});

gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(plumber())
        .pipe(changed('build/'))
        .pipe(gulp.dest('build'));
});

gulp.task('less', function() {
    return gulp.src('src/less/index.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer(['last 3 versions', '>= 1%']))
        .pipe(cleancss({
            keepSpecialComments: 0,
            keepBreaks: false,
            benchmark: false,
            processImport: false,
            noRebase: true,
            noAdvanced: false,
            compatibility: false,
            debug: false
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('csslint', ['less'], function() {
    return gulp.src('build/index.css')
        .pipe(plumber())
        .pipe(csslint({
            'adjoining-classes': false,
            'box-model': false,
            'box-sizing': false,
            'bulletproof-font-face': false,
            'compatible-vendor-prefixes': false,
            'empty-rules': false,
            'display-property-grouping': true,
            'duplicate-background-images': true,
            'duplicate-properties': true,
            'fallback-colors': false,
            'floats': false,
            'font-faces': false,
            'font-sizes': true,
            'gradients': false,
            'ids': true,
            'import': true,
            'important': true,
            'known-properties': true,
            'outline-none': true,
            'overqualified-elements': true,
            'qualified-headings': false,
            'regex-selectors': true,
            'shorthand': true,
            'star-property-hack': true,
            'text-indent': false,
            'underscore-property-hack': true,
            'unique-headings': false,
            'universal-selector': false,
            'unqualified-attributes': true,
            'vendor-prefix': true,
            'zero-units': true
        }))
        .pipe(csslint.reporter());
});

gulp.task('es6', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(cache('es6'))
        .pipe(es6to5())
        .pipe(gulp.dest('.tmp/js/'));
});

gulp.task('webpack', ['es6'], function() {
    return gulp.src('.tmp/js/index.js')
        .pipe(plumber())
        .pipe(webpack({
            resolve: {
                root: [path.join(__dirname, 'bower_components')]
            },
            plugins: [
                new wp.ResolverPlugin([
                    new wp.ResolverPlugin
                        .DirectoryDescriptionFilePlugin('bower.json', ['main']),
                    new wp.ResolverPlugin
                        .DirectoryDescriptionFilePlugin('.bower.json', ['main'])
                ])
            ]
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('.tmp/js/'));
});

gulp.task('js', ['webpack'], function() {
    return gulp.src([
            'node_modules/6to5/browser-polyfill.js',
            '.tmp/js/bundle.js'
        ])
        .pipe(plumber())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build/'))
        .pipe(stripdebug())
        .pipe(streamify(uglify()))
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
    return gulp.src('src/js/app/**/*.js')
        .pipe(plumber())
        .pipe(cache('jshint'))
        .pipe(jshint())
        .pipe(jshint.reporter('stylish'));
});

gulp.task('build', ['index', 'assets', 'less', 'js']);
gulp.task('lint', ['csslint', 'jshint']);

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/less/**/*.less', ['less', 'csslint']);
    gulp.watch('src/js/**/*.js', ['js', 'jshint']);
});

gulp.task('default', ['build', 'lint', 'watch']);
