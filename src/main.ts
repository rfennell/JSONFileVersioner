import * as core from "@actions/core";
import fs = require("fs");

import { findFiles, ProcessFile } from "./AppyVersionToJSONFileFunctions";
import { version } from "@babel/core";
import { CodeGenerator } from "@babel/generator";

async function run() {
  try {
    var path = core.getInput("Path");
    var versionNumber = core.getInput("VersionNumber");
    var field = core.getInput("Field");
    var filenamePattern = core.getInput("FilenamePattern");
    var recursion = core.getInput("recursion");

    var outputversion = core.getInput("outputversion");

    core.debug(`Source Directory Filter:  ${path}`);
    core.debug(`Filename Pattern: ${filenamePattern}`);
    core.debug(`File search recursion: ${recursion}`);
    core.debug(`Version Number: ${versionNumber}`);
    core.debug(`Field to update (all if empty): ${field}`);

    path = `${process.env.GITHUB_WORKSPACE}/${path}`;

    // Make sure path to source code directory is available
    if (!fs.existsSync(path)) {
      core.setFailed(`Source directory does not exist: ${path}`);
    } else {
      core.debug(`Looking for files in directory: ${path}`);

      // Apply the version to the assembly property files
      var files = findFiles(path, filenamePattern, files, recursion);

      if (files.length > 0) {
        core.debug(`Will apply ${versionNumber} to ${files.length} files.`);
        files.forEach((file) => {
          ProcessFile(file, field, versionNumber);
        });
      } else {
        core.warning("Found no files.");
      }
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
