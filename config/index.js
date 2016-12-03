import path from 'path'
import _debug from 'debug'
import ip from 'ip'
//获取本地ip
const localip = ip.address()
const debug = _debug('app:config');

debug('正在创建默认的配置');

// ========================================================
// 默认配置
// ========================================================

const config={
    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // 项目组织
    // ----------------------------------

    //纠正 root 路径
    path_base  : path.resolve(__dirname, '..'),
    //开发环境路径
    dir_client : 'src',
    //生成环境路径
    dir_dist   : 'dist',
    //服务 环境路径
    dir_server : 'server',

    // ----------------------------------
    // 服务器 配置先关
    // ----------------------------------
    server_host : localip, // use string 'localhost' to prevent exposure on local network
    server_port : process.env.PORT || 3000,

    // ----------------------------------
    // 编译器 配置
    // ----------------------------------
    compiler_css_modules     : false,
    // webpack.devtool 配置
    compiler_devtool         : 'source-map',
    compiler_hash_type       : 'hash',
    //公共路径
    compiler_public_path     : '/',
    //需要 提取到公共的模块
    compiler_vendor : [
        'history',
        'react',
        'react-redux',
        'react-router',
        'react-router-redux',
        'redux'
    ]
};

// ------------------------------------
// 环境变量
// ------------------------------------

config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// 验证公共文件是否存在 Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
    .filter((dep) => {
        if (pkg.dependencies[dep]) return true

        debug(
            `Package "${dep}" was not found as an npm dependency in package.json; ` +
            `it won't be included in the webpack vendor bundle.
               Consider removing it from vendor_dependencies in ~/config/index.js`
        );
    });
// ------------------------------------
// 实用工具函数
// ------------------------------------
const resolve = path.resolve;
const base = (...args) =>{

    return Reflect.apply(resolve, null, [config.path_base, ...args])

};

config.utils_paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// 环境变量配置
// ========================================================

/*debug(`查看环境变量 NODE_ENV "${config.env}".`);
const environments = require('./environments').default
const overrides = environments[config.env]
if (overrides) {
    debug('Found overrides, applying to default configuration.')
    Object.assign(config, overrides(config))
} else {
    debug('No environment overrides found, defaults will be used.')
}*/
// debug(config)
export default config