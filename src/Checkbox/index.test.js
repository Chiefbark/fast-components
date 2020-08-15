import React from 'react';
import Checkbox from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Checkbox - render', () => {
	// Default render
	const wrapper1 = mount(<Checkbox>checkbox</Checkbox>);
	expect(wrapper1.find('div').at(0).hasClass('root')).toEqual(true);
	expect(wrapper1.find('img')).toHaveLength(0);
	expect(wrapper1.find('svg')).toHaveLength(1);
	expect(wrapper1.find('span').text()).toEqual('checkbox');
	expect(wrapper1.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper1.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper1.find('div').at(0).prop('data-error')).toBe(false);

	// Icon render
	const wrapper2 = mount(<Checkbox initialValue={true}
	                                 icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}>checkbox</Checkbox>);
	expect(wrapper2.find('img')).toHaveLength(1);
	expect(wrapper2.find('svg')).toHaveLength(0);
	expect(wrapper2.find('img').at(0).prop('alt')).toEqual('2089610');
	expect(wrapper2.find('div').at(0).prop('data-checked')).toBe(true);
	expect(wrapper2.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper2.find('div').at(0).prop('data-error')).toBe(false);

	// Helper text render
	const wrapper3 = mount(<Checkbox helperText={'This is a helper text'}>checkbox</Checkbox>);
	expect(wrapper3.find('small').text()).toEqual('This is a helper text');

	// Disabled render
	const wrapper4 = mount(<Checkbox disabled={true}>checkbox</Checkbox>);
	expect(wrapper4.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper4.find('div').at(0).prop('data-disabled')).toBe(true);
	expect(wrapper4.find('div').at(0).prop('data-error')).toBe(false);
	expect(wrapper4.find('input').prop('aria-checked')).toBe(false);
	expect(wrapper4.find('input').prop('aria-disabled')).toBe(true);

	// Error render
	const wrapper5 = mount(<Checkbox error={true}>checkbox</Checkbox>);
	expect(wrapper5.find('div').at(0).prop('data-checked')).toBe(false);
	expect(wrapper5.find('div').at(0).prop('data-disabled')).toBe(false);
	expect(wrapper5.find('div').at(0).prop('data-error')).toBe(true);
	expect(wrapper5.find('input').prop('disabled')).toBe(false);
	expect(wrapper5.find('input').prop('aria-disabled')).toBe(false);
});