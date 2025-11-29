// report.js
const fs = require('fs');
const Table = require('cli-table3');

class TableReporter {
  constructor(options) {
    this.results = [];
  }

  onTestEnd(test, result) {
    this.results.push({
      test: test.title,
      status: result.status,
      duration: `${(result.duration / 1000).toFixed(2)}s`,
    });
  }

  onEnd() {
    const table = new Table({
      head: ['Test', 'Status', 'Duration'],
      colWidths: [50, 15, 10],
    });

    this.results.forEach(r => table.push([r.test, r.status, r.duration]));
    console.log('\n🎯 Playwright Test Summary:\n');
    console.log(table.toString());

    fs.writeFileSync('test-summary.txt', table.toString());
    console.log('💾 Test summary saved to test-summary.txt');
  }
}

module.exports = TableReporter;
