# 项目介绍

本插件 VideoOnline是基于 [community-app-template](https://github.com/netless-io/community-app-template) 模版 React 分支开发的 在线会议助手

## 快速开始
前置条件：至少需要安装了 `git`、`node 16`、`npm 8`

第一步：`下载项目依赖 `npm install

第二步：运行项目 `npm start`

## 功能简介

- 用户登陆：所有用户都需登陆后才能使用本系统；
- 创建白板：用户登陆后可以随机创建一个白板，同时在我的白板列表中展示；
- 加入白板：用户可以通过输入房间号来加入白板；
- 会议视频：用户可以自由调节是否开启和关闭自己的视频；

## 前端技术栈

- 场景化白板
- 前端：React

## 后端技术栈

- docker
- docker-compose
- Springboot 2.3.4.RELEASE
- Apache Shiro 1.7.1
- Logback
- Redis
- Lombok
- MySQL、Mybatisplus
- 阿里云OSS
- 七牛云
- Nginx

## 使用说明

启动前请将

src\components\Video\index.tsx 中的join方法中此三项修改为你在声网中申请项目的

![image-20220824102229670](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824102229670.png)

## 展示

本地启动后登陆页面展示：http://localhost:3000/

![image-20220824102529220](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824102529220.png)

用户名：admin 或者 fs

密码：admin 或者 fs

如需创建其他用户，可以联系作者QQ:281690733

登陆完成后进入首页

![image-20220824102809185](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824102809185.png)

目前开发的功能有：加入白板，创建白板，我的白板，退出登陆

点击创建白板

![image-20220824104300314](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824104300314.png)

返回首页

![image-20220824104514215](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824104514215.png)

![image-20220824104712226](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220824104712226.png)
