/*!
 * full-meta-jacket: layout
 * Copyright(c) 2011 indy <email@indy.io>
 * MIT Licensed
 */

var imbue = require('imbue');
var utils = require('./utils');
var fs = require('fs');


exports.folder = '_layouts';

/*
  read all files in the layour folder into a hash
  this will be added to metadata structure
 */

exports.build = function(folder) {
  var layouts = {}
  var contents, name;

  try {
    utils.eachFile(folder, function(f) {
      contents = fs.readFileSync(utils.fileJoin(folder, f), 'utf8');
      name = f.split('.')[0];
      layouts[name] = imbue.parse(contents);
    });
  } catch(e) {
    // todo: this try/catch statement is a substitute for a 'doesFolderExist' function that needs to be written
//    console.log(e);
  }

  return layouts;
}


exports.mergeMetadata = function(metadata) {

  var layouts = metadata._fullMeta._layouts;

  var fn = function(meta) {
    var l = meta.layout;

    if(l && layouts[l]) {
      return imbue.mergeMeta(meta, fn(layouts[l].header));
    } else {
      return meta;
    }
  }

  return fn(metadata);
}
