const gulp = require('gulp');

// 拷贝声明
gulp.task('declare', async (done) => {
    await gulp.src('../lib/*.d.ts')
        .pipe(gulp.dest('../dist'));
    done();
});

// 拷贝声明
gulp.task('scripts', async (done) => {
    await gulp.src('../build/scripts/**/*.*')
        .pipe(gulp.dest('../dist/scripts'));
    done();
});

gulp.task('default', gulp.series('declare', 'scripts'));
