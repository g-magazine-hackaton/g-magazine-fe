/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import MyPageProfileComponent from '@/components/ui/my-page/profile';
import MyPageSection from '@/components/ui/my-page/section';
import MyPageSubscriberUpdateSlider from '@/components/ui/my-page/subscriber-update-slider';
import MyPageMagazineSlider from '@/components/ui/my-page/magazine-slider';
import MyPageMagazineTab from '@/components/ui/my-page/magazine-tab';
import { MagazineListMockData } from '@/temp/magazine';

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

const MyPage = () => {
  const [tabIdx, setTabIdx] = useState(0);

  const chunkSize = 12;
  const chunkedArray = Array.from(
    { length: Math.ceil(MagazineListMockData[tabIdx].length / chunkSize) },
    (_, i) =>
      MagazineListMockData[tabIdx].slice(
        i * chunkSize,
        i * chunkSize + chunkSize,
      ),
  );

  return (
    <>
      <MyPageProfileComponent />
      <MyPageSection
        title="메거진 업데이트"
        icon={<UpdateUser />}
        count={<Count />}
      >
        <MyPageSubscriberUpdateSlider />
      </MyPageSection>

      <MyPageSection title="마이 메거진" height="428px">
        <MyPageMagazineTab setTabIdx={setTabIdx} tabIdx={tabIdx} />
        <MyPageMagazineSlider MagazineListMockData={chunkedArray} />
      </MyPageSection>
    </>
  );
};

export default MyPage;
