import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';
import random from 'lodash.random';

const LABELS = gql`
  query Labels {
    labels {
      id
      name
    }
  }
`;

const CREATE_COLOR = gql`
  mutation CreateColor($data: ColorCreateInput!) {
    createColor(data: $data) {
      id
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
    props: ({ data: { labels } }) => ({ labels }),
  }),
  graphql(CREATE_COLOR, {
    props: ({ mutate }) => ({
      createColor: ({ id, rgb }) =>
        mutate({ variables: { data: { ...rgb, label: { connect: { id } } } } }),
    }),
  }),
  withState('rgb', 'setRGB', randomRGB()),
  withHandlers({
    save: ({ setRGB, createColor, rgb }) => id => {
      createColor({ id, rgb });

      setRGB(randomRGB());
    },
  })
);
