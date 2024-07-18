import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { UserContext } from '../../contexts';

function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleBoardClick = () => {
        navigate('/board');
    };

    const handleTrellaClick = () => {
        navigate('/');
    };

    const handleTasksClick = () => {
        navigate('/tasks');
    };


    return (
        <header>
            <nav className='app-header'>
                <span onClick={handleTrellaClick} id='logo-header'>Trella</span>
                <div>
                    <div className="header-link-container">
                        <span className="header-link" onClick={handleBoardClick}>Board</span>
                        <span className="header-link" onClick={handleTasksClick}>Tasks</span>
                    </div>
                    <div className='app-header-buttons'>
                        {user ? (
                            <>
                                <ButtonComponent text={user.firstName} color='#000000' href='/user'
                                    endIcon={<PersonRoundedIcon htmlColor='white' />} />
                            </>
                        ) : (
                            <>
                                <ButtonComponent text="Connexion" textColor='var(--white)' color='var(--black)'
                                    href='/login' />
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
