import api from './index';

export async function getMembers() {
    const res = await api.get('/members');
    return res.data;
}