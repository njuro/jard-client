import {useContext} from 'react';
import {AuthContext} from '../components/App';

export const USER = 'USER';
export const JANITOR = 'JANITOR';
export const MODERATOR = 'MODERATOR';
export const ADMIN = 'ADMIN';

export function useRole(role) {
    const {user} = useContext(AuthContext);
    return user && user.roles && user.roles.includes(role);
}