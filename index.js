const fs = require("fs");
const download = require("download");

var args = process.argv.splice(process.execArgv.length + 2);

const initialURL = args[0];

// Extract dir from url and create it to save videos
const withoutLesson = initialURL.substr(0, initialURL.lastIndexOf("/"));
const dirname =
  "downloads/" + withoutLesson.substr(withoutLesson.lastIndexOf("/") + 1);
try {
  fs.mkdirSync("downloads");
} catch (e) {}
try {
  fs.mkdirSync(dirname);
} catch (e) {
  console.log(e);
}

// start lesso
let currentLesson = Number(args[1]) || 1;
const lesson = initialURL.substr(initialURL.lastIndexOf("/") + 1);

const saveLessons = async () => {
  // go through all lessons
  do {
    const newLesson = lesson.replace("1", currentLesson);
    const lessonURL = `${initialURL.substr(
      0,
      initialURL.lastIndexOf("/") + 1
    )}${newLesson}`;
    const outfile = `${dirname}/${newLesson}`;
    console.log(`Downloading ${newLesson} from ${lessonURL} to ${outfile}`);
    await download(lessonURL).then(data => {
      fs.writeFileSync(outfile, data);
    });
    currentLesson += 1;
  } while (1);
};

saveLessons();
