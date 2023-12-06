import { formatDate } from '@/lib/utils';
import { fetch } from './api';

export type GoodsInfo = {
  id: string;
  goodsName: string;
  goodsPhotoUrl: string;
  goodsPrice: number;
  goodsOption: string;
};

export const getGoods = async () => {
  try {
    const { data } = await fetch.get('/api/api/good/goods');
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const getFolders = async () => {
  try {
    const { data } = await fetch.get(
      `/api/api/magazine/folders?consumerId=${
        localStorage.getItem('id') || 'consumer1'
      }`,
    );
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const postMagazine = async ({ folder, content, goodsId, images }) => {
  try {
    const { data } = await fetch.post('/api/api/magazine/save', {
      consumerId: localStorage.getItem('id') || 'consumer1',
      magazineContent: content,
      folderId: folder,
      goodsIds: [goodsId],
      photoUrls: images,
      upDt: formatDate(),
    });
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: '매거진 작성에 실패했습니다.' };
  }
};

export const getMagazineDetail = async (magazineId: string) => {
  try {
    const { data } = await fetch.get(
      `/api/api/magazine/detail?consumerId=${
        localStorage.getItem('id') || 'consumer1'
      }&magazineId=${magazineId}`,
    );
    return data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '데이터 로딩에 실패했습니다. 다시 시도해 주세요.',
      data: null,
    };
  }
};

export const postLike = async ({ id, isLike }) => {
  try {
    const { data } = await fetch.post('/api/api/magazine/like', {
      consumerId: localStorage.getItem('id') || 'consumer1',
      magazineId: id,
      isPlus: isLike,
    });
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: '좋아요에 실패했습니다.' };
  }
};
