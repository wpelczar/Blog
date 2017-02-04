var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('build', function (cb) {
  exec('bundle exec jekyll build --config _config.yml,_configDev.yml', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('rebuild', ['build'], function(){
  browserSync.reload();
})

gulp.task("browser-sync", ['build'], function(){
  browserSync.init({
    server: "_site",
    port: 4000
  })
});

gulp.task('watch', function () {
    gulp.watch(['*.html', '*.md', '_layouts/*.html', '_sass/*.*', '_posts/*', 'articles/*.html', 'profile/*.html', 'work/*.html', 'js/**/*', 'images/*'], ['rebuild']);
});

gulp.task('default', ["browser-sync", "watch"]);
