import React from 'react';
import styled from 'styled-components';

const TrainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Colors = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 16px);
  width: 415px;
  grid-gap: 5px;
  margin: 30px;
`;

const ColorButton = styled.button.attrs({
  style: ({ rgb: { r, g, b } }) => ({ background: `rgb(${r}, ${g}, ${b})` }),
})`
  width: 10px;
  height: 16px;
`;

const Clean = ({ labels, onChange, colors, deleteColor }) => (
  <TrainWrapper>
    <select onChange={event => onChange(event.target.value)}>
      {labels.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>

    <Colors>
      {colors &&
        colors.map(({ id, label, ...rgb }) => (
          <ColorButton
            key={id}
            rgb={rgb}
            onClick={() => deleteColor(id, label.id)}
          />
        ))}
    </Colors>
  </TrainWrapper>
);

export default Clean;
