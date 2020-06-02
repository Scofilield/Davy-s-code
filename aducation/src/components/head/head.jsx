import React,{Component} from 'react'
import { Layout, Menu ,Modal,Button,Drawer,Typography,Form,Input,Select,message} from 'antd';
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {resetUser,getstudents,updatedata} from '../../redux/actions'
import './head.css';

// 搜索框
const { Option } = Select;
const { Header} = Layout;
const { Text } = Typography;

class Head extends Component {
    state = { 
              visible: false ,
              visible2: false, 
              childrenDrawer: false 
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = () => {
      // 干掉cookie
      Cookies.remove('user_id')
      this.props.resetUser()
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

  showDrawer = () => {
    this.props.getstudents();
    this.setState({
      visible2: true,
    });
  };

  onClose = () => {
    this.setState({
      visible2: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      childrenDrawer: false,
    });
  };

    render(){
      const {student}=this.props
      console.log(student)
      const onFinish = values => {

        this.props.updatedata(values)
        console.log(values);
        setTimeout(() => {
          this.setState({
            visible2: false,
            childrenDrawer: false,
          });
        }, 2000);
        this.props.getstudents();
        message.success('信息修改成功！！！');
      };
        return(
            <div>
                <Header className="header head">
                    <div className="head-l" > SKY教育管理系统</div>
                    <div className='head-r'>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                    {this.props.usertype?
                     <Menu.Item key="1" onClick={this.showDrawer} >个人中心</Menu.Item>
                    :null}
                   
                    <Menu.Item key="2" onClick={this.showModal} >退出</Menu.Item>
                    </Menu>
                    </div>
                </Header>
                
                <Modal
                title="Sky教学管理系统提醒！"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <p>确定要注销登陆？</p>
                </Modal>

                <Drawer
                title="我的个人中心"
                width={520}
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible2}
                >
                  <h1>姓名:<Text type="warning">{student.s_name}</Text></h1>
                  <h1>年龄:<Text type="warning">{student.s_age}</Text></h1>
                  <h1>性别:<Text type="warning">{student.s_sex}</Text></h1>
                  <h1>班级:<Text type="warning">{student.s_class}</Text></h1>
                  <h1>宿舍:<Text type="warning">{student.s_dorm}</Text></h1>
                  <h1>电话:<Text type="warning">{student.s_phone}</Text></h1>
                  <h1>专业:<Text type="warning">{student.s_major}</Text></h1>
                  <br/>
                <Button type="primary" onClick={this.showChildrenDrawer}>
                修改个人信息
                </Button>
                <Drawer
                title="添加修改信息"
                width={320}
                closable={false}
                onClose={this.onChildrenDrawerClose}
                visible={this.state.childrenDrawer}
                >
                <Form onFinish={onFinish} initialValues={{remember: true,}}>
                      <Form.Item name="s_name" label="姓名" rules={[{required: true,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="s_age" label="年龄" rules={[{required: true,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="&nbsp;&nbsp;&nbsp;性别">
                        <Input.Group compact>
                          <Form.Item name="s_sex" noStyle
                            rules={[{ required: false,  }]}>
                            <Select placeholder="选择你的性别">
                              <Option value="男">男</Option>
                              <Option value="女">女</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>

                      <Form.Item name="s_class" label="班级" rules={[{required: true,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="s_dorm" label="&nbsp;&nbsp;&nbsp;宿舍" rules={[{required: false,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="s_phone" label="电话" rules={[{required: true,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item name="s_major" label="专业" rules={[{required: true,},]}>
                        <Input />
                      </Form.Item>
                      <Form.Item>
                      <span style={{ marginLeft: 50 }}></span>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                      <span style={{ marginLeft: 8 }}></span>
                      <Button type="default" onClick={this.handleCancel}>
                        取消
                      </Button>
                    </Form.Item>
                  </Form>
                </Drawer>
                </Drawer>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user,
               student:state.studentList}),
    {resetUser,getstudents,updatedata}
)(Head)
