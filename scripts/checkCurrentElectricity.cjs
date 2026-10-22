const fs = require('fs');

function checkEx(filename, exName) {
  const text = fs.readFileSync(filename, 'utf8').replace(/-- \d+ of \d+ --[\s\S]*?CURRENT ELECTRICITY_MEGA\(XII\)/g, '');
  const qRegex = /(?:^|\n)(\d{1,3})\.\s+([\s\S]*?)(?=(?:\n\d{1,3}\.\s+)|$)/g;
  let m;
  let count = 0;
  const qMap = {};
  while ((m = qRegex.exec(text)) !== null) {
    const qNum = parseInt(m[1]);
    count++;
    qMap[qNum] = m[2].trim();
  }
  console.log(exName + ' total questions: ' + count + ', keys count: ' + Object.keys(qMap).length);
  return qMap;
}

const ex1 = checkEx('current_ex1_raw.txt', 'EXERCISE-I');
const ex2 = checkEx('current_ex2_raw.txt', 'EXERCISE-II');
const ex3 = checkEx('current_ex3_raw.txt', 'EXERCISE-III');
