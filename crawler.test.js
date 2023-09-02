const { normalizeURL, getURLsFromHTML } = require("./crawler");
const { test, expect } = require("@jest/globals");


test("normalizeURL strip protocol", () => {
  const input = "https://en.wikipedia.org/wiki/Big_O_notation";
  const actual = normalizeURL(input);
  const expected = "en.wikipedia.org/wiki/Big_O_notation";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://en.wikipedia.org/wiki/Big_O_notation/";
  const actual = normalizeURL(input);
  const expected = "en.wikipedia.org/wiki/Big_O_notation";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://en.WIKIPEDIA.org/wiki/Big_O_notation";
  const actual = normalizeURL(input);
  const expected = "en.wikipedia.org/wiki/Big_O_notation";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://en.wikipedia.org/wiki/Big_O_notation";
  const actual = normalizeURL(input);
  const expected = "en.wikipedia.org/wiki/Big_O_notation";
  expect(actual).toEqual(expected);
});

// Get URL from HTML
test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://en.wikipedia.org/wiki/Big_O_notation">Wikipedia Big O Notation</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://en.wikipedia.org/wiki/Big_O_notation";

  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://en.wikipedia.org/wiki/Big_O_notation"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/wiki/Big_O_notation">Wikipedia Big O Notation</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://en.wikipedia.org";

  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://en.wikipedia.org/wiki/Big_O_notation"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://en.wikipedia.org/wiki/Big_O_notation">Wikipedia Big O Notation</a>
      <a href="/wiki/Computer_science">Wikipedia Computer Science</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://en.wikipedia.org";

  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://en.wikipedia.org/wiki/Big_O_notation",
    "https://en.wikipedia.org/wiki/Computer_science",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid url", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="Big_O_notation">Invalid URL</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://en.wikipedia.org/wiki/Big_O_notation";

  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});