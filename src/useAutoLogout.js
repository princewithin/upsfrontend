import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAutoLogout(maxInactiveTime) {
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            console.log('Logged out due to inactivity');
            localStorage.removeItem('user');
            navigate('/login', { replace: true });
        }, maxInactiveTime);

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log('Logged out due to inactivity');
                localStorage.removeItem('user');
                navigate('/login', { replace: true });
            }, maxInactiveTime);
        };

        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keydown', resetTimer);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousemove', resetTimer);
            document.removeEventListener('keydown', resetTimer);
        };
    }, [navigate, maxInactiveTime]);
}
export default useAutoLogout;