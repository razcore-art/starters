const path = require('path')
const pluginSCSS = require('@jamshop/eleventy-plugin-scss')
const eleventyRemark = require('@fec/eleventy-plugin-remark')
const remarkImages = require('@fec/remark-images')

module.exports = (config) => {
  const userConfig = {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'data',
    },
  }

  // SCSS
  const entryPointSCSS = path.join(userConfig.dir.input, 'scss', 'style.scss')
  const outputSCSS = path.join(userConfig.dir.output, 'css')
  config.addPlugin(pluginSCSS, {
    entryPoints: { style: entryPointSCSS },
    output: outputSCSS,
  })
  config.addWatchTarget(path.join(userConfig.dir.input, 'scss'))

  // Remark
  config.addPlugin(eleventyRemark, {
    plugins: [
      {
        plugin: remarkImages,
        options: {
          srcDir: userConfig.dir.input,
          targetDir: userConfig.dir.output,
          loadingPolicy: 'lazy',
        },
      },
    ],
  })

  // Pug
  global.filters = config.javascriptFunctions
  config.setPugOptions({ globals: ['filters'] })

  // Client-Side JS
  const dirJS = path.join(userConfig.dir.input, 'js', '*.js')
  config.addPassthroughCopy(dirJS)
  config.addWatchTarget(dirJS)

  return userConfig
}
