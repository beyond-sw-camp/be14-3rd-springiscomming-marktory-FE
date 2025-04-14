export function mapMember(raw) {
    return {
        id: Number(raw.id),
        email: raw.email,
        nickname: raw.nickname,
        name: raw.name,
        image: raw.image,
        status: raw.status,
        isActive: raw.status === 'is_active',
        isBlack: raw.status === 'is_black',
        isDeleted: raw.status === 'is_delete',
        mypageTitle: raw.mypage_title,
        reportCount: Number(raw.report_count),
        assignedDate: raw.assigned_date,
        deleteDate: raw.delete_date,
        blackDate: raw.black_date
    };
}

// 빈 멤버 객체 생성 (회원가입/폼 초기값용)
export function createEmptyMember() {
    return {
        id: null,
        email: '',
        nickname: '',
        name: '',
        image: '',
        status: 'is_active',
        mypageTitle: '',
        reportCount: 0,
        assignedDate: '',
        deleteDate: null,
        blackDate: null
    };
}
