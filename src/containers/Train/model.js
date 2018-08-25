import {
  lensProp,
  map,
  flip,
  divide,
  findIndex,
  propEq,
  reduce,
  compose,
  over,
  append,
  identity,
} from 'ramda';
import * as tf from '@tensorflow/tfjs';

const xsLens = lensProp('xs');

const ysLens = lensProp('ys');

const toX = map(flip(divide)(255));

const toY = (id, labels) => findIndex(propEq('id', id), labels);

const toDataset = ({ colors, labels }) =>
  reduce(
    (acc, { r, g, b, label: { id } }) => {
      const x = toX([r, g, b]);
      const y = toY(id, labels);

      return compose(
        over(xsLens, append(x)),
        over(ysLens, append(y))
      )(acc);
    },
    {},
    colors
  );

export default (colors, labels, callbacks) => {
  if (colors.length === 0 || labels.length === 0) {
    return {
      train: identity,
      predict: identity,
    };
  }

  const model = tf.sequential({
    layers: [
      tf.layers.dense({ units: 8, inputDim: 3, activation: 'relu' }),
      tf.layers.dense({ units: 8, inputDim: 8, activation: 'relu' }),
      tf.layers.dense({ units: 9, activation: 'softmax' }),
    ],
  });

  model.compile({
    optimizer: 'sgd',
    loss: 'categoricalCrossentropy',
  });

  const { xs, ys } = compose(
    over(xsLens, tf.tensor2d),
    over(
      ysLens,
      compose(
        y => tf.oneHot(y, labels.length),
        y => tf.tensor1d(y, 'int32')
      )
    ),
    toDataset
  )({ colors, labels });

  return {
    train: () =>
      model.fit(xs, ys, {
        epochs: 100,
        batchSize: 100,
        validationSplit: 0.4,
        shuffle: true,
        callbacks,
      }),
    predict: ({ r, g, b }) => {
      const index = model
        .predict(tf.tensor2d([[r, g, b]]))
        .argMax(1)
        .dataSync()[0];

      return labels[index].name;
    },
  };
};
