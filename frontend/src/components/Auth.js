//import 'src/App.css';
import { useState, useEffect } from 'react';


function App() {
  const [access, setAccess] = useState(localStorage.getItem('accessToken'));
  const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'));
  const [refreshRequired, setRefreshRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (access) {
      fetch(
        'http://127.0.0.1:8000/api/user',
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${access}`,
          },
        }
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
          if (response.status === 401) {
            throw Error('refresh');
          }
            throw Error(`Something went wrong: code ${response.status}`);
          }
        })
        .then(({data}) => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUsername(data.username);
          setEmail(data.email);
          setDateJoined(data.date_joined);
          setError(null);
        })
        .catch(error => {
        if (error.message === 'refresh') {
              setRefreshRequired(true);
            } else {
              console.log(error);
              setError('Ошибка, подробности в консоли');
            }
        });
    }
  }, [access]);

  useEffect(() => {
    if (refreshRequired) {
    fetch(
        'http://127.0.0.1:8000/api/token/refresh',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ refresh })
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(`Something went wrong: code ${response.status}`);
        }
      })
      .then(({access, refresh}) => {
        localStorage.setItem('accessToken', access);
        setAccess(access);
        localStorage.setItem('refreshToken', refresh);
        setRefresh(refresh);
        setError(null);
     })
     .catch(error => {
        console.log(error);
        setError('Ошибка, подробности в консоли');
      })
    }
  }, [refreshRequired]);

  const submitHandler = e => {
    e.preventDefault();
    setLoading(true);
    fetch(
      'http://127.0.0.1:8000/api/token/obtain',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          username: formUsername,
          password: formPassword,
        }),
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(`Something went wrong: code ${response.status}`);
        }
      })

        .then(({access, refresh}) => {
        localStorage.setItem('accessToken', access);
        setAccess(access);
        localStorage.setItem('refreshToken', refresh);
        setRefresh(refresh);
        setError(null);
      })
      .catch(error => {
        console.log(error);
        setError('Ошибка, подробности в консоли');
      })
      .finally(() => setLoading(false));
  };

    const logoutHandler = (e) => {
   e.preventDefault();
    localStorage.removeItem('accessToken');
    setAccess(null);
    localStorage.removeItem('refreshToken');
    setRefresh(null);
  }

  return (
    <div className="App">
      {error ? <p>{error}</p> : null}
      {!access ?
        loading ? "Загрузка..." :
        <form className="loginForm" onSubmit={submitHandler}>
          <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
          <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
          <input type="submit" name="submit" value="Войти"/>
        </form>
       :
        !error ?
         <div className="Profile">
           <p>{username}</p>
           <p>{firstName} {lastName}</p>
           <button onClick={logoutHandler}>Выйти</button>
         </div>
        :
        null
       }
     </div>
  );
}

export default App;
