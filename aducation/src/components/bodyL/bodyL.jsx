import React,{Component} from 'react'
import { Layout, Menu } from 'antd';
import { DesktopOutlined , PieChartOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';


const {Sider} = Layout;

export default class BodyL extends Component {
  state = {
    collapsed: false,
  };
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  Ladmin = () => {
    return <div>
    <Layout style={{ minHeight:'100vh'}}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {/* <Menu.Item key="1" >
        <NavLink to='/admin/announce' ><PieChartOutlined /><span>发布公告</span></NavLink>
        </Menu.Item> */}
        <Menu.Item key="2">
        <NavLink to='/admin/smanagement'><DesktopOutlined /><span>学生管理</span></NavLink>
        </Menu.Item>
        <Menu.Item key="3">
        <NavLink to='/admin/tmanagement'><DesktopOutlined /><span>教师管理</span></NavLink>
        </Menu.Item>
        <Menu.Item key="4">
        <NavLink to='/admin/cmanagement'><DesktopOutlined /><span>课程管理</span></NavLink>
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
    </div>
  }

  Lteacher = () => {
    return <div>
    <Layout style={{ minHeight:'100vh'}}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" >
        <NavLink to='/teacher/uploads' ><PieChartOutlined /><span>上传资料</span></NavLink>
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
    </div>
  }

  Lstudent = () => {
    return <div>
    <Layout style={{ minHeight:'100vh'}}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" >
        <NavLink to='/student/cselection' ><PieChartOutlined /><span>选课</span></NavLink>
        </Menu.Item>
        <Menu.Item key="2">
        <NavLink to='/student/download'><DesktopOutlined /><span>资料下载</span></NavLink>
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
    </div>
  }
    render(){
        const {usertype} = this.props;
        if(usertype==="admin"){
          return <this.Ladmin/>
        }
        if(usertype==='teacher'){
          return <this.Lteacher/>
        }
        if(usertype==='student'){
          return <this.Lstudent/>
        }
    }
}

