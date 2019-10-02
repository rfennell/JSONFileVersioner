# VersionJSONFile

This Action allows the updating of one or more .JSON files with a version number string.

The task takes the following parameters

* Path: filter to files to version, if left blank the repo containing the actions root will be used.
* Field: The version field to update
* VersionNumber: number to add to the file(s)
* FilenamePattern: The filename pattern to update defaults to '.json'
* Recursion: If true will search from specfied path for all matching files, default to true

### Usage

```
- uses: rfennell/JSONFileVersioner@v1
    with:
    path: 'testdata'
    field: 'version'
    VersionNumber: '1.2.3'
    filenamepattern: '.json' 
    recursion: 'true'
```
