import React from 'react';
import { shallow } from 'enzyme';
import Bar from '@vx/shape/build/shapes/Bar';
import { Sparkline, BarSeries, Label } from '../../src/';

describe('<BarSeries />', () => {
  const sparklineProps = {
    ariaLabel: 'test',
    width: 100,
    height: 100,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    data: Array(10).fill().map((_, i) => i),
  };

  test('it should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  test('it should render one Bar per data point', () => {
    const wrapper = shallow(<Sparkline {...sparklineProps}><BarSeries /></Sparkline>);
    const series = wrapper.find(BarSeries).dive();
    expect(series.find(Bar).length).toBe(sparklineProps.data.length);
  });

  test('it should pass (d, i) to renderLabel, fill, fillOpacity, stroke, strokeWidth func-type props', () => {
    const func = stringOrNumber => (d, i) => {
      expect(d).toEqual(expect.any(Object));
      expect(i).toEqual(expect.any(Number));
      return stringOrNumber === 'string' ? 'test' : 1;
    };

    shallow(
      <Sparkline {...sparklineProps}>
        <BarSeries
          fill={func('string')}
          fillOpacity={func('number')}
          stroke={func('string')}
          strokeWidth={func('number')}
          renderLabel={func('string')}
        />
      </Sparkline>,
    ).find(BarSeries).dive();

    const props = 5;
    const assertionsPerCall = 2;
    expect.assertions(props * sparklineProps.data.length * assertionsPerCall);
  });

  test('it should render a label if returned by renderLabel', () => {
    const wrapper = shallow(
      <Sparkline {...sparklineProps}>
        <BarSeries renderLabel={(d, i) => (i === 1 || i === 3 ? 'test' : null)} />
      </Sparkline>,
    ).find(BarSeries).dive();

    expect(wrapper.find(Label).length).toBe(2);
  });

  test('it should used the passed LabelComponent for the labels', () => {
    const wrapper = shallow(
      <Sparkline {...sparklineProps}>
        <BarSeries
          renderLabel={(d, i) => (i === 1 || i === 3 ? 'test' : null)}
          LabelComponent={<text className="test-label" />}
        />
      </Sparkline>,
    ).find(BarSeries).dive();

    expect(wrapper.find('.test-label').length).toBe(2);
  });
});
