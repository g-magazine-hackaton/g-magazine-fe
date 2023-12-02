/* eslint-disable jsx-a11y/control-has-associated-label */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import { titleAtom } from '@/store/page-info';

const pageWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 40px 20px;
`;

const photoBoxStyle = css`
  position: relative;
  margin: 0 auto;

  .profile-photo {
    width: 120px;
    height: 120px;
    border-radius: 24px;
  }

  .photo-upload-button {
    position: absolute;
    top: -8px;
    right: -8px;
    border-radius: 50%;
    width: 32px;
    height: 32px;

    .upload-file {
      display: none;
    }
  }
`;

const editTableStyle = css`
  border: 1px solid #ccc;
  border-width: 1px 0 1px 0;

  li {
    display: flex;
    padding: 16px 0;
    font-size: 14px;

    &:not(:last-of-type) {
      border-bottom: 1px solid #ccc;
    }

    .edit-label {
      text-align: center;
      max-width: 64px;
      width: 100%;
      display: inline-block;
      font-weight: 500;
    }

    .edit-input-area {
      width: 100%;
      background-color: transparent;
      outline: none;
    }
  }
`;

const editButtonStyle = css`
  width: 100%;
  padding: 12px 0;
  background-color: #387bf4;
  color: #fff;
  border-radius: 0;
  font-family: Gmarket Sans;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    filter: brightness(0.95);
  }
`;

const Profile = () => {
  const setTitle = useSetAtom(titleAtom);
  const [profileData, setProfileData] = useState({
    profileUrl: '',
    nickname: '',
    introduce: '',
  });
  const { profileUrl, nickname, introduce } = profileData;

  const handleUpload = () => {
    // TODO: API 연동
  };

  const handleEdit = () => {
    // TODO: API 연동
  };

  const handleEditData = (key: string, value: unknown) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setTitle('프로필 편집');

    // TODO: API 연동
    setProfileData({
      profileUrl:
        'https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg',
      nickname: '규라니',
      introduce: '👋 헤이 모두들 안녕, 내가 누군지 알아?',
    });
  }, [setTitle]);

  return (
    <div css={pageWrapperStyle}>
      <div css={photoBoxStyle}>
        <img className="profile-photo" src={profileUrl} alt="" />
        <label className="photo-upload-button">
          <img
            src="//mockupdev.gmarket.co.kr//build/mobile/image/single/home/img_plus.png"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            className="upload-file"
            onChange={handleUpload}
          />
        </label>
      </div>
      <ul css={editTableStyle}>
        <li>
          <span className="edit-label">닉네임</span>
          <input
            className="edit-input-area"
            value={nickname}
            onChange={({ target }) => handleEditData('nickname', target.value)}
          />
        </li>
        <li>
          <span className="edit-label">소개</span>
          <TextArea
            className="edit-input-area"
            value={introduce}
            onChange={(value) => handleEditData('introduce', value)}
          />
        </li>
      </ul>
      <Button css={editButtonStyle} onClick={handleEdit}>
        확인
      </Button>
    </div>
  );
};

export default Profile;
