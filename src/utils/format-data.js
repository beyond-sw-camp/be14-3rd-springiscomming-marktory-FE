const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    return dateStr.split('T')[0];
};