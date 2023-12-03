import { css } from '@emotion/react';

/* eslint-disable jsx-a11y/anchor-is-valid */
const mockData = [
  {
    imageUrl:
      '//image.gmarket.co.kr/hanbando/202312/e6cc33cf-9a9a-4fbe-ac39-5632764d3640.jpg',
    itemName: '네파 방한 귀마개 방한용품 네이비 블랙 그레이 1+1',
    itemPrice: 13800,
  },
  {
    imageUrl:
      '//image.gmarket.co.kr/hanbando/202312/b7b0e9ff-19ec-47c8-a2d2-3dd07e325c38.jpg',
    itemName: '유한킴벌리 올인원 타블렛 식기세척기 세제 60개 상큼향 식세기',
    itemPrice: 14900,
  },
  {
    imageUrl:
      '//image.gmarket.co.kr/hanbando/202311/12d8aeaa-891f-44f1-90f5-4918ecb90543.jpg',
    itemName:
      '중복쿠폰 10%산리오/포켓몬/디즈니 유아동 FW 신상품 방한 겨울 라이팅 샌들 실내화',
    itemPrice: 8100,
  },
  {
    imageUrl:
      '//image.gmarket.co.kr/hanbando/202311/39050571-735d-44d1-b817-ffd14697aa70.jpg',
    itemName: '마스터 토닉워터 레귤러 400ml 40pet (20pet 2개)',
    itemPrice: 26900,
  },
];

const mainCarouselStyle = css`
  position: relative;
  padding: 24px 16px;
  border-bottom: 8px solid #eee;
  background: #fff;

  .gds-heading {
    align-items: center;
    display: flex;
    position: relative;
    font-family: Gmarket Sans;

    .gds-heading__title {
      position: relative;
      top: -4px;
      min-height: 24px;
      font-size: 18px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 24px;
      max-height: 48px;
      flex: 1 0;
      color: #2b2b2b;
      font-family: Gmarket Sans;
      font-weight: 500;
    }
  }

  .list__carousel {
    position: relative;
    overflow-y: auto;
    margin: 0 -16px 0;
    padding: 16px 0 0 16px;
    white-space: nowrap;

    .gds-item-group__item {
      width: 104px;
      padding: 0 8px 0 0;
      box-sizing: content-box;
      white-space: normal;
      display: inline-block;

      .gds-thumbnail__image {
        overflow: hidden;
        display: block;
        position: relative;
        height: 0;
        padding-bottom: 100%;
        background: #eee;
        border-radius: 8px;

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          content: '';
        }

        img {
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          border-radius: 8px;
        }
      }

      .gds-item-card__info {
        padding: 6px 14px 0 2px;

        .gds-item-card__price {
          height: auto;
          font-size: 12px;
          line-height: 16px;
          vertical-align: 1px;
          margin-right: -6px;
          color: #424242;
          font-weight: 700;

          .gds-item-card__price-num {
            font-size: 13px;
            line-height: 16px;
            vertical-align: middle;
            margin: -1px 0 1px;
            font-family: 'Gmarket Sans';
          }
        }

        .gds-item-card__title {
          font-size: 13px;
          line-height: 18px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-height: 40px;
          margin-top: 2px;
          color: #000;
          word-break: break-all;
        }
      }
    }
  }
`;

const MainCarousel = () => {
  return (
    <div className="box__item-wrap" css={mainCarouselStyle}>
      <div className="gds-heading">
        <h3 className="gds-heading__title">파워컨슈머의 강력 추천 아이템</h3>
      </div>
      <ul className="gds-item-group gds-item-group--gallery3x list__carousel">
        {mockData.map(({ imageUrl, itemName, itemPrice }, i) => (
          <li key={i} className="gds-item-group__item">
            <a href="#" className="gds-item-card">
              <div className="gds-thumbnail">
                <span className="gds-thumbnail__image">
                  <img className="image" src={imageUrl} alt={itemName} />
                </span>
              </div>
              <div className="gds-item-card__info">
                <div className="gds-item-card__info-inner">
                  <span className="gds-item-card__price">
                    <em className="gds-item-card__price-num">
                      {itemPrice.toLocaleString()}
                    </em>
                    원
                  </span>
                  <p className="gds-item-card__title">{itemName}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainCarousel;
