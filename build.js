({
  appDir: "./js",
  baseUrl: "./",
  mainConfigFile: "./js/main.js",

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
