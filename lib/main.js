"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
                var files = (0, AppyVersionToJSONFileFunctions_1.findFiles)(path, filenamePattern, files, recursion);
                if (files.length > 0) {
                    core.debug(`Will apply ${versionNumber} to ${files.length} files.`);
                    files.forEach(file => {
                        (0, AppyVersionToJSONFileFunctions_1.ProcessFile)(file, field, versionNumber);
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
