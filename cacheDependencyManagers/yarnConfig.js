'use strict';

var path = require('path');
var shell = require('shelljs');
var fs = require('fs');
var md5 = require('md5');

function getFileHash(filePath) {
  var json = JSON.parse(fs.readFileSync(filePath));
  return md5(JSON.stringify({
    dependencies: json.dependencies,
    devDependencies: json.devDependencies,
    optionalDependencies: json.optionalDependencies,
    peerDependencies: json.peerDependencies
  }));
}

module.exports = {
  cliName: 'yarn',
  getCliVersion: function getYarnVersion () {
    return shell.exec('yarn --version', {silent: true}).output.trim();
  },
  configPath: path.resolve(process.cwd(), 'package.json'),
  installPath: 'node_modules',
  installCommand: 'yarn install',
  getFileHash: getFileHash
};
