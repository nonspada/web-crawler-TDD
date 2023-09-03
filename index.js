const { crawlPage } = require("./crawler");

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

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
