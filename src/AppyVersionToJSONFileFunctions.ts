import fs = require("fs");
import path = require("path");
import * as core from "@actions/core";
var endOfLine = require("os").EOL;

function extractDelimitersRegex(format) {
  const delimiters = format.replace(/[\\d+\\]/g, "");
  return new RegExp("[" + delimiters + "]");
}

// List all files in a directory in Node.js recursively in a synchronous fashion
export function findFiles(dir, filename, filelist, enableRecursion) {
  var path = path || require("path");
  var fs = fs || require("fs"),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory() && enableRecursion) {
      filelist = findFiles(
        path.join(dir, file),
        filename,
        filelist,
        enableRecursion,
      );
    } else {
      if (file.toLowerCase().endsWith(filename.toLowerCase())) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
}

export function ProcessFile(file, field, newVersion) {
  core.debug(`Processing '${file}'`);
  var filecontent = fs.readFileSync(file);
  fs.chmodSync(file, "600");
  // Check that the field to update is present
  var tmpField = "version";
  if (field && field.length > 0) {
    tmpField = `${field}`;
  }

  if (
    filecontent.toString().toLowerCase().indexOf(tmpField.toLowerCase()) === -1
  ) {
    core.debug(
      `The field '${tmpField}' is not present in the file so adding it`,
    );
    // add the field, trying to avoid having to load library to parse json, adding at the end of the file
    var newVersionField = `,${endOfLine}"${tmpField}": "${newVersion}"${endOfLine}}`;
    core.debug(`Adding Tag: "${tmpField}": "${newVersion}"`);
    fs.writeFileSync(
      file,
      filecontent.toString().replace(`${endOfLine}}`, newVersionField),
    );
  } else {
    if (field && field.length > 0) {
      core.debug(`Updating the field '${field}' version`);
      const versionRegex = `"(${field}":.*")(.*)(")`;
      var regexp = new RegExp(versionRegex, "gmi");
      let content: string = filecontent.toString();
      let matches;
      while ((matches = regexp.exec(content)) !== null) {
        var existingTag1: string = `${matches[1]}${matches[2]}${matches[3]}`;
        core.debug(`Existing Tag: ${existingTag1}`);
        var replacementTag1: string = `${matches[1]}${newVersion}${matches[3]}`;
        core.debug(`Replacement Tag: ${replacementTag1}`);
        content = content.replace(existingTag1, replacementTag1);
      }
      fs.writeFileSync(file, content);
    }
  }
  core.debug(`${file} - version applied`);
}
