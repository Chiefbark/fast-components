import React from 'react';
import Checkbox from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Checkbox - render', () => {
	// Default render
	const wrapper1 = mount(<Checkbox>checkbox</Checkbox>);
	expect(wrapper1.find('div').hasClass('root')).toEqual(true);
	expect(wrapper1.find('img')).toHaveLength(0);
	expect(wrapper1.find('svg')).toHaveLength(1);
	expect(wrapper1.find('div').prop('data-checked')).toBe(false);
	wrapper1.find('div').simulate('click');
	expect(wrapper1.find('div').prop('data-checked')).toBe(true);

	// Icon render
	const wrapper2 = mount(<Checkbox initialState={true}
		icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}>checkbox</Checkbox>);
	expect(wrapper2.find('img')).toHaveLength(1);
	expect(wrapper2.find('svg')).toHaveLength(0);
	expect(wrapper2.find('img').prop('alt')).toEqual('2089610');
	expect(wrapper2.find('div').prop('data-checked')).toBe(true);
	wrapper2.find('div').simulate('click');
	expect(wrapper2.find('div').prop('data-checked')).toBe(false);

	// Icon disabled render
	const wrapper3 = mount(<Checkbox disabled>checkbox</Checkbox>);
	expect(wrapper3.find('div').prop('data-disabled')).toBe(true);
	expect(wrapper3.find('input').prop('aria-disabled')).toBe(true);

	// Disabled render
	const wrapper4 = mount(<Checkbox disabled={true}>button</Checkbox>);
	expect(wrapper4.find('input').prop('disabled')).toBe(true);
});