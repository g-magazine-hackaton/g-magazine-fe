import { fetch } from './api';

export const postFollow = async ({ consumerId, isFollow }) => {
  try {
    const { data } = await fetch.post('/api/api/consumer/follow', {
      consumerId,
      isFollow,
      myId: localStorage.getItem('id') || 'consumer1',
    });
    return data;
  } catch (e) {
    console.error(e);
    return { success: false, message: '팔로우에 실패했습니다.' };
  }
};
