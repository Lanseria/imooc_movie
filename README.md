基于NodeJs+MongoDB搭建的电影网站--超爱电影
========================================
简介:
---------------
本项目电影首页，可供参考:
- <a href="https://github.com/Loogeek" target="_blank">Loogeek</a>项目中将部分代码重写。
- <a href="http://www.imooc.com/learn/197" target="_blank">node建站攻略(二期)——网站升级</a>Scott讲师的课程进行了重写。
- <a href="http://nodejsmovie.limonplayer.cn/" target="_blank">超爱电影(临时)</a>测试页

**1. 项目后端搭建:**
  * 使用`NodeJs的express`框架完成电影网站后端搭建;
  * 使用`mongodb`完成数据存储,通过`mongoose`模块完成对`mongodb`数据的构建;
  * 使用`jade`模板引擎完成页面创建渲染;
  * 使用`Moment.js`格式化电影存储时间;

**2. 项目前端搭建:**
  * 使用`jQuery`和`Bootsrap`完成网站前端JS脚本和样式处理;
  * 使用`Sass`完成电影首页样式的编写;
  * 使用`validate.js`完成对账号登录注册的判断;
  * 前后端的数据请求交互通过`Ajax`完成;

**3. 本地开发环境搭建:**
  * 使用`grunt`集成`jshint`对JS语法检查，`Sass`文件编译、压缩等功能，使用`mocha`完成用户注册存储等步骤的简单单元测试，以及服务器的自动重启等功能。

**4. 网站整体功能:**

  网站正常访问无需管理原权限，以下网站数据的添加及删除功能需要登录默认管理员账号(**账号:root 密码:root**)。

  * 豆瓣电影和音乐相同的展示页面;
  * 具有用户注册登录及管理;
  * 电影音乐详情页面添加及删除评论;
  * 电影音乐及电影院信息录入和搜索;
  * 电影及音乐分类添加及删除;
  * 电影及音乐图片海报自定义上传;
  * 列表分页处理;
  * 访客统计;
