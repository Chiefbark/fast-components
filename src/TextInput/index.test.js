import React from 'react';
import TextInput from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('TextInput - render', () => {
	// Default render
	const wrapper1 = mount(<TextInput>Label</TextInput>);
	expect(wrapper1.find('label').text()).toEqual('Label');
	expect(wrapper1.find('div').at(0).hasClass('root')).toEqual(true);
	expect(wrapper1.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper1.find('div').at(0).prop('data-error')).toBe(false);

	// HelperText render
	const wrapper2 = mount(<TextInput helperText={'This is a helper text'}>Label</TextInput>);
	expect(wrapper2.find('small').text()).toEqual('This is a helper text');

	// Disabled render
	const wrapper3 = mount(<TextInput disabled={true}>Label</TextInput>);
	expect(wrapper3.find('div').at(0).prop('data-disabled')).toBe(true);
	expect(wrapper3.find('div').at(0).prop('data-error')).toBe(false);
	expect(wrapper3.find('input').prop('aria-disabled')).toBe(true);

	// Error render
	const wrapper4 = mount(<TextInput error={true}>Label</TextInput>);
	expect(wrapper4.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper4.find('div').at(0).prop('data-error')).toBe(true);
	expect(wrapper4.find('input').prop('disabled')).toBe(false);
	expect(wrapper4.find('input').prop('aria-disabled')).toBe(false);
	expect(wrapper4.find('input').prop('data-error')).toBe(true);
});