import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KnowBase() {

  const [knowbase_items, setKnowBaseItem] = useState([]);
  const access = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/knowbase/')

      .then(response => setKnowBaseItem(response.data))
      .catch(error => {

        if (error.response) {
          console.log(error.response.data); // ошибка от сервера
        } else if (error.request) {
          console.log(error.request); // нет ответа от сервера
        } else {
          console.log('Error', error.message); // общая ошибка
        }
        console.log(error.config); // конфигурация запроса
      });
  }, []);

  return (
    <div>
    KnowBase is here.  
    </div>
  );
}

export default KnowBase;