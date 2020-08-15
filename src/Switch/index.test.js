import React from 'react';
import Switch from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Switch - render', () => {
	// Default render
	const wrapper1 = mount(<Switch>switch</Switch>);
	expect(wrapper1.find('div').at(0).hasClass('root')).toEqual(true);
	expect(wrapper1.find('span').text()).toEqual('switch');
	expect(wrapper1.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper1.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper1.find('div').at(0).prop('data-error')).toBe(false);

	// Helper text render
	const wrapper2 = mount(<Switch helperText={'This is a helper text'}>switch</Switch>);
	expect(wrapper2.find('small').text()).toEqual('This is a helper text');

	// Disabled render
	const wrapper3 = mount(<Switch disabled={true}>switch</Switch>);
	expect(wrapper3.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper3.find('div').at(0).prop('data-disabled')).toBe(true);
	expect(wrapper3.find('div').at(0).prop('data-error')).toBe(false);
	expect(wrapper3.find('input').prop('aria-checked')).toBe(false);
	expect(wrapper3.find('input').prop('aria-disabled')).toBe(true);

	// Error render
	const wrapper4 = mount(<Switch error={true}>switch</Switch>);
	expect(wrapper4.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper4.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper4.find('div').at(0).prop('data-error')).toBe(true);
	expect(wrapper4.find('input').prop('disabled')).toBe(false);
	expect(wrapper4.find('input').prop('aria-disabled')).toBe(false);
});