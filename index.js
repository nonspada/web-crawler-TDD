const { crawlPage } = require("./crawler");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many commands");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  console.log(`Starting crawler: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
