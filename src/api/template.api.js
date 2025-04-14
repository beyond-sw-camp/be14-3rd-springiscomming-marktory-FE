import api from './index'

/**
 * 템플릿 저장
 */
export async function createTemplate(templateData) {
    const res = await api.post('/member_template', templateData)
    return res.data
}

/**
 * 템플릿 스페이스 가져오기 (optional, 필요 시)
 */
export async function getTemplateSpaceByMember(memberId) {
    const res = await api.get('/template_space', {
        params: { member_id: memberId }
    })
    return res.data[0] // member당 하나라고 가정
}
