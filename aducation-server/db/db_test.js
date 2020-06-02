/*
测试使用操作mysql数据库
*/
//引入数据库
const mysql = require('mysql')
//连接指定数据库
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'davy4567',
  database : 'aducationdb'
});
// 获取数据库连接对象
connection.connect();
//绑定连接完成的监听
// connection.query('connected',function(){
//   console.log('数据库连接成功!!')
// })
/*得到对应集合的model*/
connection.query('SELECT * from admin', function(err, data, fields) {
  if (err) {
    console.log(err);
    return;
  };
 
  console.log(JSON.parse(JSON.stringify(data)));
});
 
connection.end();
