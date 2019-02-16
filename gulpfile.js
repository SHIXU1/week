var gulp = require("gulp");
var sacc = require("gulp-sass");
var mincss = require("gulp-clean-css");
var ungiefy = require("gulp-uglify");
var web = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
var url = require("url");
var datajson = require("./data/data.json");
gulp.task("newcss", function() {
    return gulp.src("./str/scss/**/*.scss")
        .pipe(sacc())
        .pipe(mincss())
        .pipe(gulp.dest("./str/css"))
})
gulp.task("minjs", function() {
    return gulp.src("./str/js/**/*.js")
        .pipe(ungiefy())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("yy", function() {
    return gulp.src("str")

    .pipe(web({
        port: 8080,
        open: true,
        middleware: function(req, res) {
            var pathname = url.parse(req.url).pathname;
            if (pathname === "/favicon.ico") {
                return res.end();
            }
            if (pathname === "/billist") {
                res.end(JSON.stringify({ code: 1, data: datajson }))
            } else {
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'str', pathname)))
            }

        }

    }))
})

gulp.task("auto", function() {
    return gulp.watch("./str/scss/**/*.scss", gulp.series("newcss"));
})