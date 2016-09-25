//initialize all of our variables
var app, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, uglify, imagemin, minifyCSS, del, browserSync, autoprefixer, gulpSequence, shell, sourceMaps, plumber;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
sourceMaps  = require('gulp-sourcemaps');
imagemin    = require('gulp-imagemin');
minifyCSS   = require('gulp-minify-css');
minify = require('gulp-minify');
browserSync = require('browser-sync');
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell       = require('gulp-shell');
plumber     = require('gulp-plumber');



gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "www/"
        },
        options: {
            reloadDelay: 250
        },
        notify: true
    });
});


//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    gulp.src(['www/assets/*.jpg', 'www/assets/*.png'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('www/images'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['www/assets/js/main.js'])
                //prevent pipe breaking caused by errors from gulp plugins
                .pipe(plumber())
                //this is the filename of the compressed version of our JS
                .pipe(concat('all.min.js'))
                .pipe(minify({
                    ext:{
                        src:'-debug.js',
                        min:'.js'
                    },
                    exclude: ['tasks'],
                    ignoreFiles: ['.combo.js', '-min.js']
                }))
                //catch errors
                .on('error', gutil.log)
                //where we will store our finalized, compressed script
                .pipe(gulp.dest('www/assets/js/'))
                //notify browserSync to refresh
                .pipe(browserSync.reload({stream: true}));
});


//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('www/assets/scss/main.scss')
                //prevent pipe breaking caused by errors from gulp plugins
                .pipe(plumber({
                  errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                  }
                }))
                //get sourceMaps ready
                .pipe(sourceMaps.init())
                //include SCSS and list every "include" folder
                .pipe(sass({
                      errLogToConsole: true,
                      includePaths: [
                          'www/assets/scss/'
                      ]
                }))
                .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
                }))
                //catch errors
                .on('error', gutil.log)
                //the final filename of our combined css file
                .pipe(concat('styles.css'))
                //get our sources via sourceMaps
                .pipe(sourceMaps.write())
                //where to save our final, compressed css file
                .pipe(gulp.dest('www/assets/css'))
                //notify browserSync to refresh
                .pipe(browserSync.reload({stream: true}));
});

//basically just keeping an eye on all HTML files
gulp.task('html', function() {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('www/*.html')
        .pipe(plumber())
        .pipe(browserSync.reload({stream: true}))
        //catch errors
        .on('error', gutil.log);
});


//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up browserSync
//  compress all scripts and SCSS files
gulp.task('default', ['browserSync', 'scripts', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('www/assets/js/**', ['scripts']);
    gulp.watch('www/assets/scss/**', ['styles']);
    gulp.watch('www/assets/images/**', ['images']);
    gulp.watch('www/*.html', ['html']);
});
