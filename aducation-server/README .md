### 此文件是aducation的后台程序文件

### bin/www
修改端口
### routes/index.js
注册路由
### 启动 
npm start
### 访问
http://localhost:4000/

### 引入的库
mysql数据库
 "blueimp-md5": "^2.13.0" 数据加密库
### 登陆接口
请求url http://localhost:4000/login
POST请求
参数      类型     说明
username  string  用户名
password  string  密码
返回成功
{
    "code": 0,
    "data": [
        {
            "user_id": "admin001",
            "user_pwd": "admin1234",
            "user_type": "admin"
        }
    ]
}
返回失败
{
    "code": 1,
    "masg": "用户名或密码不正确！！"
}
