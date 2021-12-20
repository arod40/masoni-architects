import React from 'react';
import styled from 'styled-components';

export default function Index(props) {
  const { data } = props;
  return (
    <ul>
      {Object.keys(data.pages)
        .filter((page) => data.pages[page].index)
        .map((page) => data.pages[page].header)}
    </ul>
  );
}
