import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../hooks/MatchMediaQuery";
import { useThemedIcon } from "../../hooks/ConditionalsHooks";
import { useEffect, useState } from "react";
import styles from './css/AuthenticationButton.module.scss'
import ChoiceModal from "../ChoiceModal/ChoiceModal";
import { isGuest } from "../../utils/checkGuestMode";

const AuthenticationButton = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const themedLoginIcon = useThemedIcon("login-icon.png");
    const themedLogoutIcon = useThemedIcon("logout-icon.png");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    const [showChoiceModal, setShowChoiceModal] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        localStorage.setItem('isGuest', "false");
        navigate('/');
    }

    const handleClick = () => {
        if (isAuthenticated || isGuest()) {
            setShowChoiceModal(true);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={styles.authenticationBtnContainer}>
            <button
            onClick={handleClick}
            className={styles.authenticationBtn}>
                {
                    isMobile && (isAuthenticated || isGuest()) ?
                        <img src={themedLogoutIcon} alt=''/> 
                    : isMobile && (!isAuthenticated || !isGuest()) ?
                        <img src={themedLoginIcon} alt=''/> 
                    :  (isAuthenticated || isGuest()) ?
                        'Logout' 
                    : 
                        'Login'
                }
            </button>

            {showChoiceModal && <ChoiceModal category="logout" isVisible={showChoiceModal} closeModal={() => setShowChoiceModal(false)} confirmChoice={handleLogout}/>}
        </div>
    )
}

export default AuthenticationButton;