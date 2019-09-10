# VersionJSONFile

This Action allows the updating of one or more .JSON files with a version number string.

The task takes the following parameters

* Path filter to files to version, if left blank the cloned action repo root will be used.
* Version number to add to the file(s)
* Field: The version field to update
* FilenamePattern: The filename pattern to update defaults to '.json'
* Recursion: If true will search from specfied path for all matching files, default to true

### Usage

```
- uses: rfennell/JSONFileVersioner@v1
    with:
    Path: 'testdata'
    Field: 'version'
    FilenamePattern: '.json' 
    Recursion: 'true'
```