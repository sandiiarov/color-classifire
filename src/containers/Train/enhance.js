import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withProps, withStateHandlers, withHandlers } from 'recompose';
import random from 'lodash.random';
import createModel from './model';

const LABELS = gql`
  query Labels {
    labels {
      id
      name
    }
  }
`;

const COLORS = gql`
  query Colors {
    colors {
      id
      r
      g
      b
      label {
        id
      }
    }
  }
`;

const randomRGB = () => ({
  r: random(0, 255),
  g: random(0, 255),
  b: random(0, 255),
});

export default compose(
  graphql(LABELS, {
    props: ({ data: { labels = [] } }) => ({ labels }),
  }),
  graphql(COLORS, {
    props: ({ data: { colors = [] } }) => ({ colors }),
  }),
  withStateHandlers(
    {
      isTraining: false,
      loss: null,
      rgb: randomRGB(),
      result: null,
    },
    {
      setIsTraining: () => isTraining => ({ isTraining }),
      setLoss: () => loss => ({ loss }),
      setRGB: () => rgb => ({ rgb }),
      setResult: () => result => ({ result }),
    }
  ),
  withProps(({ colors, labels, setIsTraining, setLoss }) =>
    createModel(colors, labels, {
      onTrainBegin: () => setIsTraining(true),
      onTrainEnd: () => setIsTraining(false),
      onBatchEnd: (num, { loss }) => setLoss(loss),
    })
  ),
  withHandlers({
    predict: ({ predict, setRGB, setResult }) => () => {
      const rgb = randomRGB();

      setRGB(rgb);

      setResult(null);

      setTimeout(
        () =>
          compose(
            setResult,
            predict
          )(rgb),
        800
      );
    },
  })
);
