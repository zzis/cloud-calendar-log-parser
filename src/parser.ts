import path from 'path';
import lineReader from 'line-reader';

const filePath = path.join(__dirname, '../data/example.txt');

let currentDate;
let lineItem;
const events = [];
let lineNumber = 0;
lineReader.eachLine(filePath, (line, isLast) => {
  try {
    lineNumber++;
    // trim line
    const trimedLine = line.replace(/\s/g, '');
    // test if the line is a date
    lineItem = trimedLine.match(/\d{4}-\d{2}-\d{2}/);
    if (lineItem && lineItem.length === 1) {
      currentDate = trimedLine.match(/\d{4}-\d{2}-\d{2}/)[0];
    }
    if (trimedLine.includes('|')) {
      const [timePeriod, category, description] = trimedLine.split('|');
      if (!(timePeriod && category && description)) {
        throw(new Error(`Log format error in line ${lineNumber}, please check \n\r line content: ${line}`));
      }
      const [start, end] = timePeriod.match(/\d{2}:\d{2}/g);
      if (!(start && end)) {
        throw(new Error(`Log format error in line ${lineNumber}, please check \n\r line content: ${line}`));
      }
      events.push({
        date: currentDate,
        start,
        end,
        category,
        description,
      });
    }
    if (isLast) {
      handleReadFileFinish();
    }
  } catch (err) {
    console.log(err.message)
  }
});

function handleReadFileFinish() {
  // console.log(events);
}
