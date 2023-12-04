import { fetch } from './api';

export const uploadImage = async (uploadImage: File) => {
  try {
    const formData = new FormData();
    formData.append('image', uploadImage);

    const { data } = await fetch.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: '이미지가 업로드되지 않았습니다. 다시 시도해 주세요.',
    };
  }
};
