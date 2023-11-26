/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import MyPageProfileComponent from '@/components/ui/my-page/profile';
import MyPageSection from '@/components/ui/my-page/section';
import MyPageSubscriberUpdateSlider from '@/components/ui/my-page/subscriber-update-slider';

const UpdateWrap = styled.span`
  padding: 0px 2px;
  border-radius: 10px;
  border: 2px solid #ff5454;
  line-height: 16px;
  font-size: 12px;
  margin-right: 6px;
  color: #ff5454;
`;

const CountWrap = styled.span`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-left: auto;
  text-align: center;
  color: #fff;
  background-color: #067dfd;
`;

const UpdateUser = () => <UpdateWrap>new</UpdateWrap>;
const Count = () => <CountWrap>6</CountWrap>;

const MyPage = () => (
  <>
    <MyPageProfileComponent />
    <MyPageSection
      title="메거진 업데이트"
      icon={<UpdateUser />}
      count={<Count />}
    >
      <MyPageSubscriberUpdateSlider />
    </MyPageSection>

    <MyPageSection title="마이 메거진">슬라이더</MyPageSection>
  </>
);

export default MyPage;
