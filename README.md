# 安装

npm工具直接安装

> npm i rrweb-sdk

从dlist下载源包引用

> dlist/rrweb.sdk-xxxx.js


原则上npm版本只支持 vue 的 webpack 架构版本


# 使用

## main.js 引入并实例化该sdk


引入依赖

> import rrwebSDK from 'rrweb-sdk'

 
实例化绑定到VUE原型

> Vue.prototype.$rrwebsdk = new rrwebSDK();


# rrwebSDK 版本迭代

1.2.6 VUE录制卡死问题已处理

1.3.1 vconsole 阻塞内存问题已修正

1.3.3 因为hash编码或者一些奇怪的路径导致静态资源找不到的问题
      修正了某些DOM因为书写不规范导致录屏失败的问题