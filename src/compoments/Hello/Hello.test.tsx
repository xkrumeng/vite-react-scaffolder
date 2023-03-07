import renderer from 'react-test-renderer';
import React from 'react';

import { Hello } from '@/compoments/Hello';

describe('Hello component', () => {
  test('should render component properly', () => {
    // given
    const dummyComponentProps = {
      bar: 'test',
      foo: 'lorem',
    };

    // when
    const componentRenderer = renderer.create(<Hello {...dummyComponentProps} />);
    const tree = componentRenderer.toJSON();

    // then
    expect(tree).toMatchSnapshot();
  });
});