import { useLocation, Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

const RequireAuth = ({children }) => {
    const location = useLocation();
    let isAuthenticated = false;
    const token = localStorage.getItem('accessToken');

    if (token) {
    isAuthenticated = true;
    }

    if(!isAuthenticated) {
        return <Navigate to='/' state={{from: location}} />
    }

    return children;
}

export default RequireAuth;