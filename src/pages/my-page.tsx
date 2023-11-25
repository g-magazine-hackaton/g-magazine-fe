/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import MyPageProfileComponent from '@/components/ui/profile/mypage';
import MyPageSection from '@/components/ui/profile/section';

const UpdateUser = () => {
  const UpdateWrap = styled.span`
    padding: 0px 2px;
    border-radius: 10px;
    border: 2px solid #ff5454;
    font-size: 14px;
    margin-right: 6px;
    color: #ff5454;
  `;
  return <UpdateWrap>new</UpdateWrap>;
};
const Count = () => {
  const CountWrap = styled.span`
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-left: auto;
    text-align: center;
    color: #fff;
    background-color: #067dfd;
  `;
  return <CountWrap>3</CountWrap>;
};

export default function MyPage() {
  return (
    <div style={{ width: '100%', backgroundColor: '#eee' }}>
      <MyPageProfileComponent />
      <MyPageSection
        title="메거진 업데이트"
        icon={<UpdateUser />}
        count={<Count />}
      >
        구독자 업데이트
      </MyPageSection>

      <MyPageSection title="마이 메거진">슬라이더</MyPageSection>
    </div>
  );
}
