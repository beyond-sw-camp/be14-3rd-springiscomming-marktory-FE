import api from './index'

// 모든 템플릿 가져오기
export async function getTemplates() {
    const res = await api.get('/member_template')
    return res.data
}

// 템플릿 생성 함수 (id 자동 증가 + string으로 저장)
export async function createTemplate(templateData) {
    const templates = await getTemplates()
    const nextId = templates.length
        ? Math.max(...templates.map(t => parseInt(t.id))) + 1
        : 1

    const newTemplate = {
        id: nextId.toString(), // ✅ ID는 string으로 저장
        ...templateData
    }

    const res = await api.post('/member_template', newTemplate)
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
