var express = require('express');
var router = express.Router();
var db = require("../db/db");

const md5 = require('blueimp-md5')


// 登陆的路由
router.post('/login',function(req,res){
  // 获取请求参数的数据
  const {username,password} =req.body
  //查询user
  db.query("SELECT * FROM users WHERE username='"+username+"'AND password='"+password+"'",function(err,user){
    if(user&&user!=0){//登陆成功
      user = JSON.parse(JSON.stringify(user))
      //生成一个cookid(userid:user._id),交给浏览器保存、
       res.cookie('user_id',username,{maxAge:1000*60*60*24})
       console.log(user)
      // //返回登陆成功的信息
       res.send({code: 0, data:user})
    }else{//登陆失败
      res.send({code: 1, masg: '用户名或密码不正确！！'})
    }
  })
})

//获取用户信息路由 根据cookie中的user_id
router.get('/user',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  //根据userid 查询对应的user
  db.query("SELECT * FROM users WHERE username='"+userid+"'",function(err,user){
    user = JSON.parse(JSON.stringify(user))
    res.send({code: 0, data:user})
  })
})


//获取学生信息路由
router.get('/studentlist',function(req,res){
  db.query("SELECT * FROM students ",function(err,list){
    if(list&&list!=0){//获取成功
      list = JSON.parse(JSON.stringify(list))
      res.send({code: 0, data:list})
    }else{//获取失败
      res.send({code: 1, masg: '没有学生信息！！'})
    }
  })
})

//获取老师信息路由
router.get('/teacherlist',function(req,res){
  db.query("SELECT * FROM teachers ",function(err,list){
    if(list&&list!=0){//获取成功
      list = JSON.parse(JSON.stringify(list))
      res.send({code: 0, data:list})
    }else{//获取失败
      res.send({code: 1, masg: '没有老师信息！！'})
    }
  })
})

//获取课程信息路由
router.get('/courselist',function(req,res){

  db.query("SELECT * FROM courses ",function(err,list){
    if(list&&list!=0){//获取成功
      list = JSON.parse(JSON.stringify(list))
      res.send({code: 0, data:list})
    }else{//获取失败
      res.send({code: 1, masg: '没有课程信息！！'})
    }
  })
})

//获取信息路由
router.post('/getmessage',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  //根据userid 查询对应的user
  const {type,term}= req.body;
  if(type==='student'){
    db.query("SELECT * FROM students WHERE s_id LIKE '%"+term+"%' or s_name LIKE '%"+term+"%' or s_age LIKE '%"+term+"%' or s_sex LIKE '%"+term+"%' or s_class LIKE '%"+term+"%' or s_dorm LIKE '%"+term+"%' or s_phone LIKE '%"+term+"%' or s_major LIKE '%"+term+"%' or s_pwd LIKE '%"+term+"%' " ,function(err,list){
      if(list&&list!=0){//获取成功
        list = JSON.parse(JSON.stringify(list))
        return res.send({code: 0, data:list})
      }else{//获取失败
        return res.send({code: 1, masg: '没有学生信息！！'})
      }
    })
  }
  if(type==='course'){
    db.query("SELECT * FROM courses WHERE c_id LIKE '%"+term+"%' or c_no LIKE '%"+term+"%' or c_name LIKE '%"+term+"%' or c_redit LIKE '%"+term+"%' or c_teacher LIKE '%"+term+"%' or c_seats LIKE '%"+term+"%' or c_time LIKE '%"+term+"%' or c_sh LIKE '%"+term+"%' " ,function(err,list){
      if(list&&list!=0){//获取成功
        list = JSON.parse(JSON.stringify(list))
        return res.send({code: 0, data:list})
      }else{//获取失败
        return res.send({code: 1, masg: '没有课程信息！！'})
      }
    })
  }
  if(type==='teacher'){
    db.query("SELECT * FROM teachers WHERE t_id LIKE '%"+term+"%' or t_name LIKE '%"+term+"%' or t_age LIKE '%"+term+"%' or t_sex LIKE '%"+term+"%' or t_job LIKE '%"+term+"%' or t_info LIKE '%"+term+"%' or t_part LIKE '%"+term+"%' or t_pwd LIKE '%"+term+"%' " ,function(err,list){
      if(list&&list!=0){//获取成功
        list = JSON.parse(JSON.stringify(list))
        return res.send({code: 0, data:list})
      }else{//获取失败
        return res.send({code: 1, masg: '没有课程信息！！'})
      }
    })
  }
})

//删除信息路由
router.post('/delmessage',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  //根据userid 查询对应的user
  const {type,id}= req.body;
  if(type==='student'){
    db.query("delete from students where s_id ='"+id+"'",function(err,rows){
      if(err){
        res.send({code: 1, masg: '删除失败！！'})
      }else {
        return res.redirect("/studentlist");
      }
  });
    
  }
  if(type==='course'){
    db.query("delete from courses where c_id='"+id+"'  ",function(err,rows){
      if(err){
        res.send({code: 1, masg: '删除失败！！'})
      }else {
        return res.redirect("/courselist");
      }
  });
    
  }
  if(type==='teacher'){
    db.query("delete from teachers where t_id='"+id+"' ",function(err,rows){
      if(err){
        res.send({code: 1, masg: '删除失败！！'})
      }else {
        return res.redirect("/teacherlist");
      }
  });

  }
})

//添加信息路由
router.post('/addmessage',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  //根据userid 查询对应的user
  const {type,message}= req.body;
  if(type==='student'){
    const {s_id,s_pwd,s_name,s_age,s_sex,s_class,s_dorm,s_phone,s_major} =message
    db.query("INSERT INTO students(s_id,s_pwd,s_name,s_age,s_sex,s_class,s_dorm,s_phone,s_major) values('"+s_id+"','"+s_pwd+"','"+s_name+"','"+s_age+"','"+s_sex+"','"+s_class+"','"+s_dorm+"','"+s_phone+"','"+s_major+"')",function(err,rows){
      if(err){
        res.send({code: 1, masg: '添加失败'})
      }else {
        return  res.redirect("/studentlist");
      }
  });
    
  }
  if(type==='course'){
    const {c_id,c_no,c_name,c_redit,c_teacher,c_address,c_seats,c_time,c_sh} =message
    db.query("INSERT INTO courses(c_id,c_no,c_name,c_redit,c_teacher,c_address,c_seats,c_time,c_sh) values('"+c_id+"','"+c_no+"','"+c_name+"','"+c_redit+"','"+c_teacher+"','"+c_address+"','"+c_seats+"','"+c_time+"','"+c_sh+"')",function(err,rows){
      if(err){
          res.send("新增失败"+err);
      }else {
        return res.redirect("/courselist");
      }
  });
    
  }
  if(type==='teacher'){
    const {t_id,t_name,t_age,t_sex,t_job,t_info,t_part,t_pwd} =message
    db.query("INSERT INTO teachers(t_id,t_name,t_age,t_sex,t_job,t_info,t_part,t_pwd) values('"+t_id+"','"+t_name+"','"+t_age+"','"+t_sex+"','"+t_job+"','"+t_info+"','"+t_part+"','"+t_pwd+"')",function(err,rows){
      if(err){
          res.send("新增失败"+err);
      }else {
        return res.redirect("/teacherlist");
      }
  });

  }
})

//修改学生信息路由
router.post('/updateusers',function(req,res){
  const userid =req.cookies.user_id
  const {massage} =req.body
  const {s_name,s_age,s_sex,s_class,s_dorm,s_phone,s_major} =massage
  db.query("UPDATE students set s_name='"+s_name+"',s_age='"+s_age+"',s_sex='"+s_sex+"',s_class='"+s_class+"',s_dorm='"+s_dorm+"',s_phone='"+s_phone+"',s_major='"+s_major+"' WHERE s_id ='"+userid+"' ",function(err,list){
    if(err){
      res.send("更新失败"+err);
    }else {
      return res.redirect("/userstudent");
    }
  })
})

//获取详细信息
router.get('/userstudent',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  //根据userid 查询对应的user
  db.query("SELECT * FROM students WHERE s_id='"+userid+"'",function(err,user){
    user = JSON.parse(JSON.stringify(user))
    res.send({code: 0, data:user})
  })
})

// 选课路由
router.post('/signcourse',function(req,res){
   //从cookie中得到userid
   const userid =req.cookies.user_id
   if(!userid){
     return res.send({code: 1, masg: '请先登录！'})
   }
  const list=req.body
  const {c_no,c_name,c_redit,c_teacher,c_address,c_seats,c_time,c_sh} =list
  db.query("INSERT INTO sandc(s_id,c_no,c_name,c_redit,c_teacher,c_address,c_seats,c_time,c_sh) values('"+userid+"','"+c_no+"','"+c_name+"','"+c_redit+"','"+c_teacher+"','"+c_address+"','"+c_seats+"','"+c_time+"','"+c_sh+"')",function(err,lists){
    if(err){
        res.send("新增失败"+err);
    }else {
      return res.redirect("/sandclist");
    }
});
})

// 删除选课路由
router.post('/delsign',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
 const {cno} =req.body
 db.query("delete from sandc where c_no ='"+cno+"'",function(err,rows){
   if(err){
       res.send("新增失败"+err);
   }else {
     return res.redirect("/sandclist");
   }
});
})


//选课列表路由
router.get('/sandclist',function(req,res){
  //从cookie中得到userid
  const userid =req.cookies.user_id
  if(!userid){
    return res.send({code: 1, masg: '请先登录！'})
  }
  db.query("SELECT * FROM sandc where s_id ='"+userid+"'",function(err,list){
    if(list&&list!=0){//获取成功
      list = JSON.parse(JSON.stringify(list))
      res.send({code: 0, data:list})
    }else{//获取失败
      res.send({code: 1, masg: '没有选课信息！！'})
    }
  })
})


module.exports = router;
