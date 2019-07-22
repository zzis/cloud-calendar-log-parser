import path from 'path';
import lineReader from 'line-reader';

const filePath = path.join(__dirname, '../data/example.txt');
let currentDate;
let lineItem;
const events = [];
lineReader.eachLine(filePath, (line, isLast) => {
  // test if the line is a date
  line = line.replace(/\s/g, '');
  lineItem = line.match(/\d{4}-\d{2}-\d{2}/);
  if (lineItem && lineItem.length === 1) {
    currentDate = line.match(/\d{4}-\d{2}-\d{2}/)[0];
  }
  if (line.includes('|')) {
    const [timePeriod, category, description] = line.split('|');
    const [start, end] = timePeriod.match(/\d{2}:\d{2}/g);
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
});

function handleReadFileFinish() {
  console.log(events);
}
