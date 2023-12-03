/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { css } from '@emotion/react';
import Portal from '../portal';

const StepContents = [
  <div
    key={0}
    className="dashed-box"
    style={{
      display: 'flex',
      alignItems: 'center',
      height: 'calc(100% - 32px)',
    }}
  >
    <div className="full-box">
      이제 G마켓에서 본인의 쇼핑 정보를 공유할 수 있습니다.
      <br />
      여러분의 <strong>쇼핑 매거진을 발간</strong>하고,
      <br />
      다른 <strong>컨슈머의 매거진을 구독</strong>하여 정보를 얻어보세요.
      <br />
      <br />
      G마켓 속 . 더많은 컨슈머와 소통하며
      <br />
      새로운 쇼핑 세상을 즐길 수 있습니다!
    </div>
  </div>,
  <div
    key={1}
    className="dashed-box"
    style={{
      position: 'absolute',
      transform: 'translate(0, 60px)',
    }}
  >
    프로필 편집 버튼을 통해
    <br />
    <strong>프로필 사진, 닉네임, 상태 메시지</strong>를<br />
    변경할 수 있습니다.
  </div>,
  <div
    key={2}
    className="dashed-box"
    style={{
      position: 'absolute',
      transform: 'translate(24vw, 220px)',
    }}
  >
    내가 구독하는 컨슈머의
    <br />
    매거진을 방문할 수 있습니다.
  </div>,
  <div
    key={3}
    className="dashed-box"
    style={{
      position: 'absolute',
      transform: 'translate(36vw, 220px)',
    }}
  >
    마음에 드는 매거진을
    <br />
    스크랩하여 다시 볼 수 있습니다.
  </div>,
  <div
    key={4}
    className="dashed-box"
    style={{
      position: 'absolute',
      transform: 'translate(36vw, 240px)',
    }}
  >
    매달 업데이트 되는 <strong>파워</strong>
    <br />
    <strong>컨슈머</strong>들을 만나볼 수 있습니다.
  </div>,
  <div
    key={5}
    className="dashed-box"
    style={{
      position: 'absolute',
      transform: 'translate(30vw, 160px)',
    }}
  >
    매거진 업로드, 구독/구독자,
    <br />
    스크랩 수 등 활동력에 따라
    <br />
    포인트를 획득할 수 있습니다.
  </div>,
  <div
    key={6}
    style={{
      position: 'absolute',
      transform: 'translate(30vw, 160px)',
      textAlign: 'center',
    }}
  >
    <div className="dashed-box">
      활동력에 따라 <strong>5가지 등급</strong>으로
      <br />
      분류되어, 각 <strong>등급에 맞는 뱃지</strong>가<br />
      닉네임 옆에 보여집니다.
      <br />
    </div>
    <small>활동력을 높여 파워 컨슈머에 도전해 보세요!</small>
  </div>,
  <div
    key={7}
    className="dashed-box"
    style={{
      transform: 'translateY(360px)',
    }}
  >
    <strong>구독중인 컨슈머의 매거진이 업데이트</strong> 되면
    <br />
    해당 영역에서 확인할 수 있습니다.
  </div>,
  <div
    key={8}
    className="dashed-box"
    style={{
      position: 'absolute',
      right: 20,
      transform: 'translateY(560px)',
    }}
  >
    업로드 버튼을 눌러
    <br />
    구매한 상품에 대한 정보를
    <br />
    공유할 수 있습니다.
  </div>,
  <div
    key={9}
    className="dashed-box"
    style={{
      position: 'absolute',
      right: 20,
      transform: 'translateY(620px)',
    }}
  >
    <strong>+ 버튼</strong>을 눌러 폴더를 생성하여
    <br />
    발행하는 매거진을 관리할 수 있습니다.
  </div>,
];

const guideWrapStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  font-family: Gmarket Sans;
  color: #fff;
  padding: 20px;
  word-break: keep-all;

  .close-icon {
    width: 32px;
    height: 32px;
    margin-left: auto;
  }

  .dashed-box {
    border: 1px dashed #fff;
    border-radius: 50px;
    padding: 20px;
    text-align: center;
  }

  .full-box {
    width: 100%;
  }
`;

const Guides = () => {
  const [guideIndex, setGuideIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const handleClose = () => {
    setShowGuide(false);
  };

  const handleClickPage = () => {
    if (guideIndex + 1 === StepContents.length) {
      handleClose();
      return;
    }
    setGuideIndex((prev) => prev + 1);
  };

  if (!showGuide) return null;
  return (
    <Portal>
      <div css={guideWrapStyle} onClick={handleClickPage}>
        <IoMdClose className="close-icon" fill="#fff" onClick={handleClose} />
        {StepContents[guideIndex]}
      </div>
    </Portal>
  );
};

export default Guides;
