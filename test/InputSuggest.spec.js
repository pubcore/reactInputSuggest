import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import {PureInputSuggest as InputSuggest} from '../src/InputSuggest'

describe('<InputAutocomplete/>', () => {
	const inputProps = {
		T: {},
		suggestions: ['one', 'two', 'three'],
		gofer: {}
	}
	const wrapper = mount(<InputSuggest {...inputProps} />);

  it('renders without exploding', () => {
    expect(wrapper.find(InputSuggest)).to.have.length(1);
  });
	it('renders exactly three dropdown elements', () => {
		expect(wrapper.find('.dropdown-value')).to.have.length(3);
  });
	it('contains all three elements', () => {
		expect(wrapper.contains('one')).to.equal(true);
		expect(wrapper.contains('two')).to.equal(true);
		expect(wrapper.contains('three')).to.equal(true);
  });
	it('focus on input opens dropdown', () => {
		expect(wrapper.state('dropdown')).to.equal(false)
		wrapper.find('input').simulate('focus');
		expect(wrapper.state('dropdown')).to.equal(true)
  });
	it('clicking on second element in dropdown', () => {
		expect(wrapper.state('value')).to.equal('')
		wrapper.find('.dropdown-value').at(1).simulate('click');
		expect(wrapper.state('value')).to.equal('two')
  });

});
