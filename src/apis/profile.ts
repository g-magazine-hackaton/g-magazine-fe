import { fetch } from './api';

export const postProfile = async ({ nickName, content, photoUrl }) => {
  try {
    const { data } = await fetch.post('/api/api/consumer/profile/update', {
      consumerId: 'consumer1',
      nickName,
      content,
      photoUrl,
      upDt: new Date(),
    });
    return data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '프로필 수정에 실패했습니다. 다시 시도해 주세요.',
    };
  }
};
