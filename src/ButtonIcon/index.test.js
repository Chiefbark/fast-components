import React from 'react';
import ButtonIcon from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('ButtonIcon - render', () => {
	// Default render
	const wrapper1 = mount(<ButtonIcon>button</ButtonIcon>);
	expect(wrapper1.find('button').hasClass('root')).toEqual(true);
	expect(wrapper1.find('img')).toHaveLength(0);
	expect(wrapper1.find('svg')).toHaveLength(0);

	// Icon render
	const wrapper2 = mount(<ButtonIcon
		icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}>button</ButtonIcon>);
	expect(wrapper2.find('img')).toHaveLength(1);
	expect(wrapper2.find('img').prop('alt')).toEqual('2089610');

	// Disabled render
	const wrapper4 = mount(<ButtonIcon disabled={true}>button</ButtonIcon>);
	expect(wrapper4.find('button').prop('disabled')).toBe(true);
});