import React from 'react';
import Button from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Button - render', () => {
	// Default render
	const wrapper1 = mount(<Button>button</Button>);
	expect(wrapper1.find('button').hasClass('root')).toEqual(true);
	expect(wrapper1.find('span').text()).toEqual('button');
	expect(wrapper1.find('img')).toHaveLength(0);
	expect(wrapper1.find('svg')).toHaveLength(0);

	// Left icon render
	const wrapper2 = mount(<Button icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}
	                               placement={'left'}>button</Button>);
	expect(wrapper2.find('img')).toHaveLength(1);
	expect(wrapper2.find('img + span')).toHaveLength(1);
	expect(wrapper2.find('img').prop('alt')).toEqual('2089610');

	// Right icon render
	const wrapper3 = mount(<Button icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}>button</Button>);
	expect(wrapper3.find('img')).toHaveLength(1);
	expect(wrapper3.find('span + img')).toHaveLength(1);
	expect(wrapper3.find('img').prop('alt')).toEqual('2089610');

	// Disabled render
	const wrapper4 = mount(<Button disabled={true}>button</Button>);
	expect(wrapper4.find('button').prop('disabled')).toBe(true);
	expect(wrapper4.find('button').prop('aria-disabled')).toBe(true);
});