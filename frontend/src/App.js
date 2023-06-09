import { DesktopOutlined, BarsOutlined, HomeOutlined, BookOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import logo from './components/img/logo_rmiac.png'
import TicketList from './pages/TicketList';
import KnowBase from './pages/KnowBase'
import TicketDetail from './pages/TicketDetail'
import Home from './pages/Home';
import EmptyNotFound from './pages/EmptyNotFound'
import Login from './pages/Login'
import WhoLoggedIn from './components/WhoLoggedIn';
import Audit from './pages/Audit'
import UserDetail from './pages/UserDetail';
import BottomRightButton from './components/BottomRightButton';
import KnowbaseDetail from './pages/KnowbaseDetail';


const { Header, Content, Footer, Sider } = Layout;

function checkAuthentication() {
  // Проверка наличия токена в локальном хранилище
  const token = localStorage.getItem('accessToken');

  // Если токен есть в локальном хранилище, пользователь авторизован
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
  getItem('Активы', '4', <DesktopOutlined />, null, '/audit'),
];


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = checkAuthentication();
  const location = useLocation();

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
  // Функция для получения названия раздела из пути маршрута
  const getSectionName = () => {
    const path = location.pathname;
    switch (path) {
      case '/tickets':
        return 'Заявки';
      case '/knowbase':
        return 'База знаний';
      case '/audit':
        return 'Аудит';
      case '/user/:id':
        return 'Пользователь';
      default:
        return 'Главная';
    }
  };

  const currentSection = getSectionName();

  const handleClick = () => {
    window.history.back();
  };

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

          {/* <Breadcrumb
            separator=">"
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item href="/">Главная</Breadcrumb.Item>
            <Breadcrumb.Item>{currentSection}</Breadcrumb.Item>
          </Breadcrumb> */}
          <Button type="ghost" shape="default" icon={<LeftCircleFilled />} onClick={handleClick} size="medium">Назад</Button>
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
                  <Route path="/knowbase/:id" element={<KnowbaseDetail />} />
                  <Route path="/audit" element={<Audit />} />
                  <Route path="/user/:id" element={<UserDetail />} />
                  <Route path="*" element={<EmptyNotFound />} />
                  <Route path="/" element={<Home />} />
                </>
              ) : (
                <Route path="/" element={<Navigate to="/login" />} />
              )}
            </Routes>
            <BottomRightButton />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          ГБУЗ "РМИАЦ" МЗ РБ © 2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;