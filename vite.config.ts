import { define, defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve, join } from 'path'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {

  console.log(command, mode, '===')
  const root = process.cwd()
  const env = loadEnv(mode, root) // 环境变量对象
  console.log('环境变量------', env)
  console.log('文件路径（ process.cwd()）------', root)
  console.log('文件路径（dirname）------', __dirname + '/src')
  console.log('mode------', env.VITE_NODE_ENVç)



  return {
    root, //项目根目录（index.html 文件所在的位置） 默认： process.cwd()
    base: env.VITE_MODE === 'production' ? './' : '/',
    //base: '/', //  开发或生产环境服务的公共基础路径：默认'/'   1、绝对 URL 路径名： /foo/；  2、完整的 URL： https://foo.com/； 3、空字符串或 ./（用于开发环境）
    publicDir: resolve(__dirname, './dist'), //默认'public'  作为静态资源服务的文件夹  (打包public文件夹会没有，里面得东西会直接编译在dist文件下)
    assetsInclude: resolve(__dirname, './src/assets'), // 静态资源处理

    transpileDependencies: true,
    lintOnSave: false,
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 执行icon name的格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],

    define: {
      __APP_ENV__: env.APP_ENV,
    },
    build: {
      sourcemap: false, // 不生成 source map 
      terserOptions: {
        compress: { // 打包时清除 console 和 debug 相关代码
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // ******开发服务器配置******
    server: {
      https: false, //(使用https)启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS
      host: true, // 监听所有地址
      port: 5173, //指定开发服务器端口：默认3000
      open: true, //启动时自动在浏览器中打开
      cors: false, //为开发服务器配置 CORS
      proxy: {
        //配置自定义代理规则
        // 字符串简写写法
        //'/jpi': 'http://192.168.100.166:8089',
        // '/api': {
        //   target: env.VITE_BASE_URL,
        //   changeOrigin: true, //是否跨域
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
      // hmr: {
      //   overlay: false
      // }
    },

    // ******resolver配置******
    resolve: {
      alias: {
        // 别名配置
        // 键必须以斜线开始和结束
        '@': resolve(__dirname, 'src'),
        // '@': resolve('src'),
        components: resolve(__dirname, './src/components'),
        assets: resolve(__dirname, './src/assets'),
        '#': resolve(__dirname, 'types'),
        build: resolve(__dirname, 'build')
      }
    },

  }

})
