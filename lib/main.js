"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = require("fs");
const AppyVersionToJSONFileFunctions_1 = require("./AppyVersionToJSONFileFunctions");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
            }
            else {
                core.debug(`Looking for files in directory: ${path}`);
                // Apply the version to the assembly property files
                var files = AppyVersionToJSONFileFunctions_1.findFiles(path, filenamePattern, files, recursion);
                if (files.length > 0) {
                    core.debug(`Will apply ${versionNumber} to ${files.length} files.`);
                    files.forEach(file => {
                        AppyVersionToJSONFileFunctions_1.ProcessFile(file, field, versionNumber);
                    });
                }
                else {
                    core.warning("Found no files.");
                }
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
