import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';



const withAuth = (Component: any) => {
    const WithAuth = (props: any) => {
        const navigate = useNavigate();
        const isLoggedIn = !!Cookies.get('token');

        useEffect(() => {
            if (!isLoggedIn) {
                navigate('/start');
            }
        }, [isLoggedIn, navigate]);

        // Возвращаем переданный компонент, если пользователь авторизован
        return isLoggedIn ? <Component {...props} /> : null;
    };

    return WithAuth;
};


export default withAuth;
