import {
  ProcessFile
} from "../src/AppyVersionToJSONFileFunctions";

import fs = require("fs");
const copyFileSync = require("fs-copy-file-sync");
const del = require("del");

describe("Test the update package file processing", () => {

    it("should be able to update a version in a file", () => {
      // arrange
      var file = "__tests__/testdata/package.json";
      copyFileSync("__tests__/testdata/package.json.initial", file);

      // act
      ProcessFile(file, "version", "1.2.3");

      // assert
      var editedfilecontent = fs.readFileSync(file);
      expect(editedfilecontent.toString()).toContain("\"version\": \"1.2.3\"");
      del(file);
    });

  it("should be able to add a version in a file", () => {
    // arrange
    var file = "__tests__/testdata/packagenoversion.json";
    copyFileSync("__tests__/testdata/package.json.noversion.initial", file);

    // act
    ProcessFile(file, "version", "1.2.3");

    // assert
    var editedfilecontent = fs.readFileSync(file);
    expect(editedfilecontent.toString()).toContain("\"version\": \"1.2.3\"");
    del(file);
  });

}
);
