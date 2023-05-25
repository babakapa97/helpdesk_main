import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function WhoLoggedIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      localStorage.setItem('user_id', userId);
  
      fetch(`http://localhost:8000/api/user/${userId}/`)
        .then(response => response.json())
        .then(data => {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
        })
        .catch(error => {
          console.log('API request failed:', error);
        });
    } else {
      console.log('Token is not available');
      navigate('/login');
    }
  }, [token, navigate]);
  
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('current_user');
    localStorage.removeItem('user_id');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
         Профиль
        </a>
      ),
    },

    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logoutHandler}>
          Выход
        </a>
      ),
    },
  ];

  return (
    <div className="Profile">
      <Dropdown menu={{ items }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {first_name} {last_name} <UserOutlined  /> {/* Display the username */}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default WhoLoggedIn;
