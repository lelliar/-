# nodeJS(express,token)+mongodb+VUE实现王者荣耀移动端官网模拟

## web为客户端，server为服务端，admin为后台管理界面
> 作者：计科1806 廖星宇
>参考文献：vue官方文档，elementUI官方文档，express官方文档，npm,CSDN

## admin 客户端
### 使用vue-cli2.0初始化VUE
### 采用ELEmentUI模板
### 完成后台分类页面
### 完成后台装备界面
### 完成后台英雄界面

## server 服务端
### 初始化，安装express ， cors, mongoose等包
### 完成路由构造
### 完成CRUD通用路由改造
### 使用multer包，负责传递文件
## token执行步骤
服务端生成token传递给客户端，客户端为每次请求添加token请求头，服务端检测是否存在请求头，若存在则调用接口，若不存在，则返回错误

### model为数据库模型

### web为手机端界面
#### SASS 与 工具样式（工具类，复用）,全局SASS

## 遇到的问题
### 问题：
1.在改造CRUD通用路由时产生
Converting circular structure to JSON
### 解决方案
在转换req.Model时缺少await
### 问题
2.上传图片时图片无法显示
### 解决方案
放置图片的文件夹开放时，应当直接用根路径请求（/），而非./


