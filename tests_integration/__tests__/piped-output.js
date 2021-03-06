"use strict";

const runPrettier = require("../runPrettier");

describe("output with --list-different + unformatted differs when piped", () => {
  const result0 = runPrettier(
    "cli/write",
    ["--write", "--list-different", "--no-color", "unformated.js"],
    { stdoutIsTTY: true }
  ).test({
    status: 1
  });

  const result1 = runPrettier(
    "cli/write",
    ["--write", "--list-different", "--no-color", "unformated.js"],
    { stdoutIsTTY: false }
  ).test({
    status: 1
  });

  expect(result0.stdout.length).toBeGreaterThan(result1.stdout.length);
  expect(result0.write).toEqual(result1.write);
});

describe("no file diffs with --list-different + formatted file", () => {
  const result0 = runPrettier(
    "cli/write",
    ["--write", "--list-different", "--no-color", "formated.js"],
    { stdoutIsTTY: true }
  ).test({
    status: 0
  });

  const result1 = runPrettier(
    "cli/write",
    ["--write", "--list-different", "--no-color", "formated.js"],
    { stdoutIsTTY: false }
  ).test({
    status: 0
  });

  expect(result0.stdout).not.toEqual(result1.stdout);
  expect(result0.stdout.length).toBeGreaterThan(result1.stdout.length);
  expect(result0.write).toEqual(result1.write);
});
