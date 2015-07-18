({
  appDir: "./js",
  baseUrl: "./",
  dir: "./build/release/js",
  mainConfigFile: "./js/main.js",

  optimize: "uglify2",
  skipDirOptimize: true,
  generateSourceMaps: true,
  findNestedDependencies: true,
  preserveLicenseComments: false,

  onBuildWrite: function(moduleName, path, singleContents) {
    return singleContents.replace(/jsx!/g, '');
  },

  modules: [
    {
      name: "main",
      exclude: ['jsx']
    }
  ]
})
