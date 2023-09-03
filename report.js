function printReport(pages) {
  console.log("==========================");
  console.log("========= REPORT =========");
  console.log("==========================");
  const sortedPages = sortPages(pages);
  for (const sortedpage of sortedPages) {
    const url = sortedpage[0];
    const hits = sortedpage[1];
    console.log(`Found ${hits} links at ${url}`);
  }
  console.log("==========================");
  console.log("======= END REPORT =======");
  console.log("==========================");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    let aHits = a[1];
    let bHits = b[1];
    return bHits - aHits;
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
};
