import React from 'react';
import styled from 'styled-components';

const IconsMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .icon {
    margin: 20px 0 20px 10px;
    svg {
      width: 35px;
      height: 35px;
      max-height: 10vh;
      max-width: 10vw;
    }
  }
  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 0;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      margin: 0 10px 0 20px;
    }
  }
`;

export default function IconsMenu({ children, mediaQueryLimitPixels }) {
  return (
    <IconsMenuStyle mediaQueryLimitPixels={mediaQueryLimitPixels}>
      {children.map((child) => (
        <div className="icon">{child}</div>
      ))}
    </IconsMenuStyle>
  );
}
