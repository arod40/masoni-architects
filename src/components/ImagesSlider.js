import React from 'react';
import styled from 'styled-components';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdFullscreen,
} from 'react-icons/md';

const SliderStyles = styled.div`
  position: relative;
  .slider {
    display: flex;
    flex-wrap: nowrap;
    transition: transform 0.8s ease-out;
    transform: translate3d(-${(props) => props.translateOnWideScreen}vw, 0, 0);
    align-items: center;
    height: ${(props) => props.heightOnWideScreenVH}vh;
  }
  .slide {
  }
  img {
    max-height: ${(props) => props.heightOnWideScreenVH}vh;
    width: ${(props) => props.widthOnWideScreenVW}vw;
    object-fit: contain;
  }
  .arrows {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: ${(props) => props.widthOnWideScreenVW}vw;
    top: 50%;
    position: absolute;
    z-index: 100;
  }
  .icon {
    color: white;
    opacity: 0.5;
    filter: drop-shadow(2px 2px 2px rgb(0 0 0));
    transition: 0.25s ease;
    &:hover {
      transform: scale(1.3);
      transform: translateY(-1em);
    }
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .slider {
      transform: translate3d(
        -${(props) => props.translateOnStrechScreen}vw,
        0,
        0
      );
      height: ${(props) => props.heightOnStrechScreenVH}vh;
    }
    img {
      max-height: ${(props) => props.heightOnStrechScreenVH}vh;
      width: ${(props) => props.widthOnStrechScreenVW}vw;
    }
  }
`;

export default class ImagesSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  handleClick = (inc) => {
    const { counter } = this.state;
    const { images } = this.props;
    this.setState({
      counter: (counter + inc + images.length) % images.length,
    });
  };

  render() {
    const { counter } = this.state;
    const {
      images,
      mediaQueryLimitPixels,
      widthOnWideScreenVW,
      widthOnStrechScreenVW,
      heightOnWideScreenVH,
      heightOnStrechScreenVH,
    } = this.props;
    return (
      <SliderStyles
        translateOnWideScreen={widthOnWideScreenVW * counter}
        translateOnStrechScreen={widthOnStrechScreenVW * counter}
        widthOnWideScreenVW={widthOnWideScreenVW}
        widthOnStrechScreenVW={widthOnStrechScreenVW}
        heightOnWideScreenVH={heightOnWideScreenVH}
        heightOnStrechScreenVH={heightOnStrechScreenVH}
        mediaQueryLimitPixels={mediaQueryLimitPixels}
      >
        <div className="arrows">
          <div
            className="icon arrow back"
            role="button"
            tabIndex={0}
            onClick={() => this.handleClick(-1)}
            onKeyDown={() => this.handleClick(-1)}
          >
            <MdKeyboardArrowLeft size="60" />
          </div>
          <div
            className="icon arrow forward"
            role="button"
            tabIndex={0}
            onClick={() => this.handleClick(1)}
            onKeyDown={() => this.handleClick(1)}
          >
            <MdKeyboardArrowRight size="60" />
          </div>
        </div>
        <ul className="slider">
          {images.map((image) => (
            <li className="slide">
              <img src={image} alt="" />
            </li>
          ))}
        </ul>
      </SliderStyles>
    );
  }
}
