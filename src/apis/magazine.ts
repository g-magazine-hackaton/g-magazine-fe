import { fetch } from './api';

export const getGoods = async () => {
  try {
    const { data } = await fetch.get('/api/api/good/goods');
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};
