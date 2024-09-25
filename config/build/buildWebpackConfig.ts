import { BuildOptions } from './types/config'
import webpack from 'webpack'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { buildLoaders } from './buildLoaders'
import path from 'path'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
