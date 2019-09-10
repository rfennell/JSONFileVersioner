import {
  ProcessFile
} from "../src/AppyVersionToJSONFileFunctions";
import { diffString, diff } from "json-diff";

import fs = require("fs");

const copyFileSync = require("fs-copy-file-sync");
const del = require("del");

describe("Test the update ARM file processing", () => {

    it("should be able to update a version in a file", () => {
      // arrange
      var file = "__tests__/testdata/ARMtemplate.json";
      copyFileSync("__tests__/testdata/ARMtemplate.json.initial", file);

      // act
      ProcessFile(file, "contentVersion", "1.2.3.4");

      // assert
      var editedfilecontent = fs.readFileSync(file);
      expect(editedfilecontent.toString()).toContain("\"contentVersion\": \"1.2.3.4\"");
      del(file);
    });

  it("should be able to add a version in a file", () => {
    // arrange
    var file = "__tests__/testdata/ARMtemplateNoversion.json";
    copyFileSync("__tests__/testdata/ARMtemplate.json.noversion.initial", file);

    // act
    ProcessFile(file, "contentVersion", "1.2.3.4");

    // assert
    var editedfilecontent = fs.readFileSync(file);
    expect(editedfilecontent.toString()).toContain("\"contentVersion\": \"1.2.3.4\"");
    del(file);
  });

}
);
