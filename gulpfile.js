var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-minify-css'),
    csslint = require('gulp-csslint'),
    es6to5 = require('gulp-6to5'),
    webpack = require('gulp-webpack');

gulp.task('index', function() {
    return gulp.src('src/index.html')
        .pipe(plumber())
        .pipe(changed('build/'))
        .pipe(gulp.dest('build/'));
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

gulp.task('build', ['index', 'less']);
gulp.task('lint', ['csslint']);

gulp.task('watch', function() {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/less/**/*.less', ['less', 'csslint']);
});

gulp.task('default', ['build', 'lint', 'watch']);
