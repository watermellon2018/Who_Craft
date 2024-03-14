import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import pathConstant from "../../routes/pathConstant";
import PathConstants from "../../routes/pathConstant";



const withAuth = (Component: any) => {
    const WithAuth = (props: any) => {
        const navigate = useNavigate();
        const isLoggedIn = !!Cookies.get('id');

        useEffect(() => {
            if (!isLoggedIn) {
                navigate(PathConstants.AUTH);
            }
        }, [isLoggedIn, navigate]);

        // Возвращаем переданный компонент, если пользователь авторизован
        return isLoggedIn ? <Component {...props} /> : null;
    };

    return WithAuth;
};


export default withAuth;
