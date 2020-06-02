import React,{Component} from 'react'
import { Layout, Breadcrumb } from 'antd';
import {Redirect,Switch, Route,} from 'react-router-dom';


// import Announce from '../../pages/administrator/announce';
import Cmanagement from '../../pages/administrator/cmanagement';
import Smanagement from '../../pages/administrator/smanagement';
import Tmanagement from '../../pages/administrator/tmanagement';
import Cselection from '../../pages/student/cselection';
import Download from '../../pages/student/download';
import Uploads from '../../pages/teacher/uploads';

const {Content, Footer,} = Layout;



export default class BodyL extends Component {
  Radmin = () => {
    return <div>
       <Layout style={{ minHeight:'100vh'}}>
                <Layout className="site-layout" style={{ minWidth:'100vh' }}>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>管理员</Breadcrumb.Item>
                    <Breadcrumb.Item>Davy</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Switch>
                      {/* <Route path='/admin/announce' component={Announce}></Route> */}
                      <Route path='/admin/smanagement' component={Smanagement}></Route>
                      <Route path='/admin/tmanagement' component={Tmanagement}></Route>
                      <Route path='/admin/cmanagement' component={Cmanagement}></Route>
                      <Redirect to='/admin/smanagement'/>
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by Davy </Footer>
              </Layout>
              </Layout>
    </div>
  }
  
  Rteacher = () => {
    return <div>
       <Layout style={{ minHeight:'100vh'}}>
                <Layout className="site-layout" style={{ minWidth:'100vh' }}>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>老师</Breadcrumb.Item>
                    <Breadcrumb.Item>Davy</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Switch>
                      <Route path='/teacher/uploads' component={Uploads}></Route>
                      <Redirect to='/teacher/uploads'/>
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by Davy </Footer>
              </Layout>
              </Layout>
    </div>
  }
  
  Rstudent = () => {
    return <div>
       <Layout style={{ minHeight:'100vh' }}>
                <Layout className="site-layout" style={{ minWidth:'100vh' }}>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>学生</Breadcrumb.Item>
                    <Breadcrumb.Item>Davy</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Switch>
                      <Route path='/student/cselection' component={Cselection}></Route>
                      <Route path='/student/download' component={Download}></Route>
                      <Redirect to='/student/cselection'/>
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by Davy </Footer>
              </Layout>
              </Layout>
    </div>
  }
    render(){
      const {usertype} = this.props;
      console.log(usertype);
      if(usertype==="admin"){
        return <this.Radmin/>
      }
      if(usertype==='teacher'){
        return <this.Rteacher/>
      }
      if(usertype==='student'){
        return <this.Rstudent/>
      }
    }
}

