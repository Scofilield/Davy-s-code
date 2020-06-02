/*
包含了N个接口请求的函数模块
函数返回值为promis
*/
import ajax from './ajax'
//登录接口
export const reqLogin = ({username,password}) => ajax('/login', {username,password}, 'POST')
//获取登录用户信息
export const reqUser  = () => ajax('/user', 'GET')
//获取学生详细信息
export const reqStu  = () => ajax('/userstudent', 'GET')
//获取学生用户信息
export const reqStudent  = () => ajax('/studentlist', 'GET')
//获取老师用户信息
export const reqTeacher  = () => ajax('/teacherlist', 'GET')
//获取课程用户信息c
export const reqCourse  = () => ajax('/courselist', 'GET')
//删除用户信息
export const reqDel = ({type,id}) => ajax('/delmessage', {type,id}, 'POST')
//添加用户信息
export const reqAdd = ({type,message}) => ajax('/addmessage', {type,message}, 'POST')
//修改用户信息
export const reqUpdate = ({massage}) => ajax('/updateusers', {massage}, 'POST')
//搜索用户信息
export const reqGet = ({type,term}) => ajax('/getmessage', {type,term}, 'POST')
//选课
export const reqAddSign = (list) => ajax('/signcourse', list, 'POST')
//删除选课
export const reqDelSign = ({cno}) => ajax('/delsign', {cno}, 'POST')
//获取选课列表
export const reqSign  = () => ajax('/sandclist', 'GET')

