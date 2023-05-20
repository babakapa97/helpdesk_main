import { DesktopOutlined, BarsOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import logo from './components/img/logo_rmiac.png'
import TicketList from './pages/TicketList';
import KnowBase from './pages/KnowBase'
import TicketDetail from './pages/TicketDetail'
import Home from './pages/Home';
import EmptyNotFound from './pages/EmptyNotFound'
import { Link } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

function getItem(title, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    title,
    link,
  };
}

const items = [
  getItem('Главная', '1', <HomeOutlined />, null, '/'),
  getItem('Заявки', '2', <BarsOutlined />, null, '/tickets'),
  //пример вложенного меню
  // getItem('Группы', 'sub2', <TeamOutlined />, [
  //   getItem('Team 1', '6', null, null, '/team1'),
  //   getItem('Team 2', '8', null, null, '/team2')
  // ]),
  getItem('База знаний', '3', <BookOutlined />, null, '/knowbase'),
  getItem('Активы', '4', <DesktopOutlined />, null, '/'),
];


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <BrowserRouter>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className={`demo-logo-vertical ${collapsed ? 'logo-collapsed' : ''}`}>
            <img src={logo} alt="Logo" style={{ width: '95%', height: 'auto' }} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {items.map((item) => {
        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.link}>{child.title}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.title}</Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>


      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Раздел</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              {/* маршруты для перехода по пунктам меню */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/tickets" element={<TicketList />}></Route>
            <Route path="/tickets/:id" element={<TicketDetail />}></Route> 
            <Route path="/knowbase" element={<KnowBase />}></Route>
            <Route path="*" element={<EmptyNotFound />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </BrowserRouter>
  );
};
export default App;