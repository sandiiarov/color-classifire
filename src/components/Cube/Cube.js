import React from 'react';
import styled from 'styled-components';
import {
  ifElse,
  lt,
  cond,
  compose,
  equals,
  prop,
  negate,
  always,
  T,
  times,
} from 'ramda';

const rotateY = ifElse(lt(1), always(-90), always(0));

// prettier-ignore
const translateZ = cond([
  [compose(equals(1), prop('side')), compose(negate, prop('size'))],
  [compose(equals(3), prop('side')), prop('size')],
  [T, always(0)]
]);

const faceTransform = ({ side, size }) => `
  rotateX(90deg)
  rotateY(${rotateY(side)}deg)
  translateZ(${translateZ({ side, size })}px)
`;

const Cube = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  margin-top: ${({ size }) => `${size - 72}px`};
  transform: ${({ rotate }) => `rotateX(88deg) rotateZ(${rotate}deg)`};
  transform-style: preserve-3d;
  transition: 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  &:before {
    content: '';
    will-change: transform;
    display: block;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    background: #333;
    position: absolute;
  }
  &:before {
    transform: ${({ size }) => `translateZ(${size}px)`};
  }
`;

const Face = styled.div.attrs({
  style: ({ color: { r, g, b } }) => ({
    background: `rgb(${r}, ${g}, ${b})`,
  }),
})`
  position: absolute;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background: rgba(0, 0, 0, 0.4);
  transform-style: preserve-3d;
  transform: ${faceTransform};
  transform-origin: ${({ side }) => `${side > 1 ? 100 : 50}% 0`};
  transition: 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

const Clean = ({ size, rgb, rotate, side }) => (
  <Cube size={size} rotate={rotate}>
    {times(
      i => (
        <Face key={i} side={i} size={size} color={rgb}>
          {side}
        </Face>
      ),
      4
    )}
  </Cube>
);

export default Clean;
