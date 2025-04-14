import api from './index'

export async function createLike(payload) {
    const res = await api.post('/likes', payload)
    return res.data
}

export async function deleteLike(id) {
    const res = await api.delete(`/likes/${id}`)
    return res.data
}

export async function getLikes() {
    const res = await api.get('/likes')
    return res.data
}