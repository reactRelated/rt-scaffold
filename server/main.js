import path from 'path'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import webpackConfig from '../build/webpack.config'
import _debug from 'debug'
import config from '../config'

const debug = _debug('app:server')

var compiler = webpack(webpackConfig);
debug('初始化 webpackDevServer')
var server = new webpackDevServer(compiler,{
    contentBase: path.resolve( config.dir_client),
    host:config.server_host,
    port: config.server_port,
    historyApiFallback:true,
    hot: true,
    stats: {
        colors: true,
        chunks: false
    }
});

export default server
