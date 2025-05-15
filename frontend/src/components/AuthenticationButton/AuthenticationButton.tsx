import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../hooks/MatchMediaQuery";
import { useThemedIcon } from "../../hooks/ConditionalsHooks";
import { useEffect, useState } from "react";
import styles from './css/AuthenticationButton.module.scss'

const AuthenticationButton = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const themedLoginIcon = useThemedIcon("login-icon.png");
    const themedLogoutIcon = useThemedIcon("logout-icon.png");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleClick = () => {
        if (isAuthenticated) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <button
            onClick={handleClick}
            className={styles.link}>
                {
                    isMobile && isAuthenticated ?
                        <img src={themedLogoutIcon} alt=''/> 
                    : isMobile && !isAuthenticated ?
                        <img src={themedLoginIcon} alt=''/> 
                    : isAuthenticated ?
                        'Logout' 
                    : 
                        'Login'
                }
            </button>
        </>
    )
}

export default AuthenticationButton;