var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

gulp.task("build", shell.task([
  "bundler exec jekyll build --config _config.yml,_configDev.yml --watch"
]));

gulp.task("browser-sync", function(){
  browserSync.init({
    server: "_site",
    port: 4000
  })
  
  gulp.watch("_site/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', ["build", "browser-sync"]);
