import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSetAtom } from 'jotai';
import { titleAtom } from '@/store/page-info';
import { ROOT_PATH } from '@/temp/global-variables';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: #007aff;
  color: white;
  padding: 16px 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Gmarket Sans;
`;

const ProfileImageBox = styled.div`
  position: relative;
  width: 33%;
  height: min-content;

  .edit-button {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    padding: 4px 10px;
    font-size: 12px;
    border: none;

    &:hover {
      filter: brightness(1.2);
    }
  }
`;

const ProfileImage = styled.img`
  border-radius: 6px;
`;

const UserInfoArea = styled.div`
  width: 64%;
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  .club-badge {
    line-height: 22px;
    background-color: rgb(8, 31, 63);
    border-radius: 8px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #fff;
  }
  .nickname {
    font-size: 18px;
    font-weight: 700;
  }
  .subscriber-count {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    > span {
      background: #ff3399;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 11px;
    }
  }
`;

const GreetingBox = styled.div`
  margin-top: 12px;
  font-size: 15px;
  word-break: keep-all;
`;

const ContentBox = styled.ul`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, auto));
  gap: 8px;
  button {
    width: 100%;
    padding: 2px 8px;
    border-radius: 8px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    color: #222;
    border: 2px solid #dee2e6;
    font-weight: 600;
    font-size: 14px;
  }
`;

const SubscribeWrap = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;

  > strong {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }
`;

const SubscribeIcon = styled.span`
  padding: 2px 4px;
  border-radius: 4px;
  line-height: 16px;
  font-size: 13px;
  color: #fff;
  font-weight: 600;
  margin-left: 4px;
  background-color: #ff3399;
`;

const YourPageProfile = () => {
  const [isFollow, setIsFollow] = useState(true);
  const setTitle = useSetAtom(titleAtom);

  const onClickFollowToggle = () => {
    setIsFollow(!isFollow);
  };

  useEffect(() => {
    setTitle('매거진');
  }, [setTitle]);

  return (
    <HeaderWrapper>
      <ProfileImageBox>
        <ProfileImage
          src="https://i.namu.wiki/i/iJ6OjdyZXJ8CFJxGXccAczCMUXLGAIcuVXkMKNK82N9QRtzUZnIFQShk0kvxznTGRynmKGriR49ixH464rGw2w.webp"
          alt="Profile Image"
        />
      </ProfileImageBox>
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <div className="nickname">현진현진</div>
          <SubscribeWrap>
            <FaUserPlus
              size={18}
              color="#fff
"
            />
            <strong>132명</strong>
            <SubscribeIcon>구독중</SubscribeIcon>
          </SubscribeWrap>
        </NameBox>
        <GreetingBox>
          G마켓/옥션 9년 경력의 신뢰할 수 있는 직매입 판매자 입니다. <br />
          주요 판매 상품: 메종 키츠네, 디올, 구찌 많은 문의 바랍니다.
          <br /> 연락처: 010-1234-1234
        </GreetingBox>
        <ContentBox>
          <li>
            <button
              onClick={onClickFollowToggle}
              style={{
                backgroundColor: isFollow ? '#0e0c32' : '#fff',
                color: isFollow ? '#fff' : '#222',
              }}
            >
              {isFollow ? '팔로우 중' : '팔로우 하기'}
            </button>
          </li>
          <li>
            <button>
              <Link to={`${ROOT_PATH}/rank`}>컨슈머 랭킹</Link>
            </button>
          </li>
        </ContentBox>
      </UserInfoArea>
    </HeaderWrapper>
  );
};

export default YourPageProfile;
