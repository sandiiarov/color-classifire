import React from 'react';
import Cube from '../../components/Cube';

const Train = ({ train, predict, isTraining, loss, rgb, result }) => (
  <div>
    <Cube size={150} rgb={rgb} />
    <div>
      Result:
      {result}
    </div>
    <div>
      Loss:
      {loss}
    </div>
    <button type="button" onClick={train} disabled={isTraining}>
      train
    </button>
    <button type="button" onClick={predict} disabled={isTraining}>
      predict
    </button>
  </div>
);

export default Train;
