import React, {useContext} from 'react';
import {Button, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../App';
import {useGetApi, usePostApi} from '../../helpers/api';

function TopMenu() {
    const {user, setUser} = useContext(AuthContext);
    const [boards] = useGetApi('boards/', []);
    const [, logOut] = usePostApi('/logout');

    function handleLogout() {
        logOut({});
        setUser(undefined);
    }

    return (
        <Menu>
            <Menu.Item header><Link to="/">JBoard</Link></Menu.Item>
            {boards.map(board => (
                <Menu.Item key={board.label} name={board.label}>
                    <Link to={`/boards/${board.label}`}>/{board.label}/ - {board.name}</Link>
                </Menu.Item>
            ))}
            {!user &&
            <Menu.Item position='right'><Link to="/login"><Button>Login</Button></Link></Menu.Item>
            }
            {user &&
            <Menu.Item position='right'><Link to="#"><Button onClick={handleLogout}>Logout</Button></Link></Menu.Item>
            }
        </Menu>
    );
}

export default TopMenu;