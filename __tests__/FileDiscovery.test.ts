import {
  findFiles
} from "../src/AppyVersionToJSONFileFunctions";

import fs = require("fs");

describe ("Find files tests", () => {

  it ("should be able to find 4 files with recursion", () => {
      var filelist = findFiles ("__tests__/testdata", "package.json.initial" , filelist, true);
      expect(filelist.length).toBe(4);
  });

  it ("should be able to find 1 file with no recursion", () => {
    var filelist = findFiles ("__tests__/testdata", "package.json.initial" , filelist, false);
    expect(filelist.length).toBe(1);
  });

  it ("should be able to find files with wildcards and recursion", () => {
    var filelist = findFiles ("__tests__/testdata", ".json.initial" , filelist, true);
    expect(filelist.length).toBe(5);
  });
});
