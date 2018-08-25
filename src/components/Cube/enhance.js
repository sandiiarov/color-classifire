import { compose, withState, lifecycle } from 'recompose';

export default compose(
  withState('rotate', 'setRotate', 0),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { rgb, setRotate } = this.props;

      if (prevProps.rgb !== rgb) {
        setRotate(prevProps.rotate + 90);
      }
    },
  })
);
