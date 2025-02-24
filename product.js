import axios from 'axios';

const baseURL = 'https://sprint-mission-api.vercel.app/products';  
const instance = axios.create({ baseURL });

// 🔹 여러 상품 조회
export const getProductList = async (params) => {
    try {
        const res = await instance.get('/', { params });
        return res.data;
    } catch (e) {
        handleError(e, 'getProductList');
    }
};

// 🔹 특정 상품 조회
export const getProduct = async (id) => {
    try {
        const res = await instance.get(`/${id}`);
        return res.data;
    } catch (e) {
        handleError(e, 'getProduct');
    }
};

// 🔹 특정 상품 생성
export const createProduct = async (data) => {
    try {
        const res = await instance.post('/', data);
        return res.data;
    } catch (e) {
        handleError(e, 'createProduct');
    }
};

// 🔹 특정 상품 수정
export const patchProduct = async (id, data) => {
    try {
        const exists = await getProduct(id);
        if (!exists) {
            console.log(`⛔️ 수정 불가: ID ${id} 상품이 존재하지 않습니다.`);
            return null;
        }
        const res = await instance.patch(`/${id}`, data);
        return res.data;
    } catch (e) {
        handleError(e, 'patchProduct');
    }
};

// 🔹 특정 상품 삭제
export const deleteProduct = async (id) => {
    try {
        const exists = await getProduct(id);
        if (!exists) {
            console.log(`⛔️ 삭제 불가: ID ${id} 상품이 존재하지 않습니다.`);
            return null;
        }
        const res = await instance.delete(`/${id}`);
        return res.data;
    } catch (e) {
        handleError(e, 'deleteProduct');
    }
};

// 🔹 공통 에러 핸들러 함수
const handleError = (e, functionName) => {
    console.log(`❌ [${functionName}] 요청 중 오류 발생`);

    if (e.response) {
        console.log(`  🔹 응답 코드: ${e.response.status}`);
        console.log(`  🔹 응답 메시지:`, e.response.data);
    } else if (e.request) {
        console.log('  🔹 서버 응답 없음:', e.request);
    } else {
        console.log('  🔹 요청 실패:', e.message);
    }
};