const path = require('path')
const pluginSCSS = require('@jamshop/eleventy-plugin-scss')

module.exports = (config) => {
  const userConfig = {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'data',
    },
  }

  const entryPointSCSS = path.join(userConfig.dir.input, 'scss', 'style.scss')
  const outputSCSS = path.join(userConfig.dir.output, 'css')
  config.addPlugin(pluginSCSS, {
    entryPoints: { style: entryPointSCSS },
    output: outputSCSS,
  })

  global.filters = config.javascriptFunctions
  config.setPugOptions({ globals: ['filters'] })

  return userConfig
}
