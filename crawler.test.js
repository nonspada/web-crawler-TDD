const { normalizeURL } = require("./crawler");
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
