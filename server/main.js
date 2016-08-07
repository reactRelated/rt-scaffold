import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import webpackConfig from '../build/webpack.config'
import _debug from 'debug'
import config from '../config'

const debug = _debug('app:server')

var compiler = webpack(webpackConfig);
debug('初始化 webpackDevServer')
var server = new webpackDevServer(compiler, config.proxy);

export default server
