import { DesktopOutlined, BarsOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Routes, Route, BrowserRouter, Link, Navigate } from 'react-router-dom';
import logo from './components/img/logo_rmiac.png'
import TicketList from './pages/TicketList';
import KnowBase from './pages/KnowBase'
import TicketDetail from './pages/TicketDetail'
import Home from './pages/Home';
import EmptyNotFound from './pages/EmptyNotFound'
import Login from './pages/Login'
import WhoLoggedIn from './components/WhoLoggedIn';


const { Header, Content, Footer, Sider } = Layout;

function checkAuthentication() {
  // Проверка наличия токена в локальном хранилище
  const token = localStorage.getItem('accessToken');

  // Если имя пользователя есть в локальном хранилище, пользователь авторизован
  if (token) {
    return true;
  } else {
    return false;
  }
}

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
  const isAuthenticated = checkAuthentication();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!isAuthenticated) {
    return (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    )
  }

  return (
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
          >
          <WhoLoggedIn />  
            </Header>
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
              <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
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
                {isAuthenticated ? (
                  <>
                    {/* маршруты для авторизованного пользователя */}
                    <Route path="/tickets" element={<TicketList />} />
                    <Route path="/tickets/:id" element={<TicketDetail />} />
                    <Route path="/knowbase" element={<KnowBase />} />
                    <Route path="*" element={<EmptyNotFound />} />
                    <Route path="/" element={<Home />} />
                  </>
                ) : (
                  // <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                )}
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
  );
};
export default App;