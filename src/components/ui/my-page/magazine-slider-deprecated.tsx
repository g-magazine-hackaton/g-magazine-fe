import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styled from '@emotion/styled';

const StyledSlider = styled.div`
  margin-top: 6px;
  overflow: hidden;

  .keen-slider__slide {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding-bottom: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    aspect-ratio: 1;

    > img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: transform 0.3s ease;
    }

    &:hover > img {
      transform: scale(1.05);
    }
  }
`;

type MagazineItem = {
  image: string;
};

type MyPageMagazineSliderProps = {
  MagazineListMockData: MagazineItem[][];
};

const MyPageMagazineSlider: React.FC<MyPageMagazineSliderProps> = ({
  MagazineListMockData,
}) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: MagazineListMockData.length > 1 ? 0.9 : 1,
    },
  });

  return (
    <StyledSlider ref={sliderRef} className="keen-slider">
      {MagazineListMockData.map((slide, index) => (
        <div key={index} className="keen-slider__slide">
          {slide.map((item, itemIndex) => (
            <div className="item" key={`item${itemIndex}`}>
              <img src={item.image} alt="이미지" />
            </div>
          ))}
        </div>
      ))}
    </StyledSlider>
  );
};

export default MyPageMagazineSlider;
