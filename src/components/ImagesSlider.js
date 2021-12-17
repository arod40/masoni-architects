import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const SliderStyles = styled.div`
  position: relative;
  .slider {
    display: flex;
    flex-wrap: nowrap;
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

  .fade-enter {
    opacity: 0;
    transform: scale(0.96);
    z-index: 1;
  }
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: 250ms ease-in;
    transition-property: transform, opacity;
    z-index: 1;
  }
  .fade-exit {
    transform: scale(1);
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.96);
    transition: 200ms ease-in;
    transition-property: transform, opacity;
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .slider {
      height: ${(props) => props.heightOnStrechScreenVH}vh;
    }
    .arrows {
      width: ${(props) => props.widthOnStrechScreenVW}vw;
    }
    .icon {
      &:hover {
        transform: translateY(0);
      }
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
        <div className="slider">
          <SwitchTransition component={null}>
            <CSSTransition key={counter} timeout={300} classNames="fade">
              <img src={images[counter]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
        {/* <ul className="slider">
          {images.map((image) => (
            <li className="slide">
              <img src={image} alt="" />
            </li>
          ))}
        </ul> */}
      </SliderStyles>
    );
  }
}
