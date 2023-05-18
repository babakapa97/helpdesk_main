import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { FiUser } from "react-icons/fi";


function WhoLoggedIn({ children, user_id }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [last_name, setLastName] = useState('');
    const [first_name, setFirstName] = useState('');

        useEffect(() => {
            fetch('http://localhost:8000/api/user/' + user_id + `/`)
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                });
        }, []);
    

    const UpdateUser = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/user/' + user_id + `/`)
                .then(response => response.json())
                .then(data => {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                });
    }
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/', { replace: true });
    }

    return (

        <div className="Profile">
            {/* <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                <BsYinYang/>
                </Dropdown.Toggle>

                <Dropdown.Menu drop={'start'}>
                    <Dropdown.Item href="#/action-1">Профиль</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>Выйти</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}
            <DropdownButton onClick={UpdateUser}
                key="start"
                id={`dropdown-button-drop-start`}
                drop="start"
                variant="secondary"
                title=<FiUser />>

                <Dropdown.Item disabled>{first_name} {last_name}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Профиль</Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Выйти</Dropdown.Item>
            </DropdownButton>
        </div>

    )


    // return children;
}

export default WhoLoggedIn;