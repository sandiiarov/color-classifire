import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

const LABELS = gql`
  query Labels {
    labels {
      id
      name
    }
  }
`;

const COLORS = gql`
  query Colors($id: ID!) {
    colors(where: { label: { id: $id } }) {
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

const DELETE_COLOR = gql`
  mutation DeleteColor($id: ID!) {
    deleteColor(where: { id: $id }) {
      id
    }
  }
`;

export default compose(
  graphql(LABELS, {
    props: ({ data: { labels = [] } }) => ({ labels }),
  }),
  graphql(COLORS, {
    skip: ({ labels }) => labels.length === 0,
    options: ({ labels }) => ({ variables: { id: labels[0].id } }),
    props: ({ data: { refetch, colors = [] } }) => ({
      colors,
      getColors: id => refetch({ id, skip: false }),
    }),
  }),
  graphql(DELETE_COLOR, {
    props: ({ mutate }) => ({
      deleteColor: (id, labelID) =>
        mutate({
          variables: { id },
          update: (cache, { data: { deleteColor } }) => {
            const { colors } = cache.readQuery({
              query: COLORS,
              variables: { id: labelID, skip: false },
            });

            cache.writeQuery({
              query: COLORS,
              variables: { id: labelID, skip: false },
              data: {
                colors: colors.filter(color => deleteColor.id !== color.id),
              },
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteColor: {
              __typename: 'Color',
              id,
            },
          },
        }),
    }),
  }),
  withHandlers({
    onChange: ({ getColors }) => id => {
      getColors(id);
    },
  })
);
