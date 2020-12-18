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


## rrwebSDK 版本迭代

1.2.6 VUE录制卡死问题已处理

1.3.1 vconsole 阻塞内存问题已修正
