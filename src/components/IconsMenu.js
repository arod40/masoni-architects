import React from 'react';
import styled from 'styled-components';

const IconsMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
  .icon {
    margin: 20px 0 20px 0;
    color: white;
    transition: 0.25s ease;
    &:hover {
      transform: scale(1.3);
      transform: translateY(-1em);
      filter: drop-shadow(3px 5px 2px rgb(255 255 255 / 0.4));
    }
    svg {
      max-height: 10vh;
      max-width: 10vw;
    }
  }
  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 1%;
    margin-top: 0;
    .icon {
      margin: 0 20px 0 20px;
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
