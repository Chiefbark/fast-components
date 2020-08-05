import React from 'react';
import TextInput from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('TextInput - render', () => {
	// Default render
	const wrapper1 = mount(<TextInput/>);
	expect(wrapper1.find('button')).toHaveLength(0);
	expect(wrapper1.find('label')).toHaveLength(0);
	expect(wrapper1.find('img')).toHaveLength(0);

	// Label render
	const wrapper2 = mount(<TextInput label={'Label'}/>);
	expect(wrapper2.find('label')).toHaveLength(1);
	expect(wrapper2.find('label').text()).toEqual('Label');

	// Right button render
	const wrapper3 = mount(<TextInput label={'Label'} placement={'right'}
	                                  buttonIconProps={{icon: 'https://image.flaticon.com/icons/svg/2089/2089610.svg'}}/>);
	expect(wrapper3.find('img')).toHaveLength(1);
	expect(wrapper3.find('button')).toHaveLength(1);
	expect(wrapper3.find('img').prop('alt')).toEqual('2089610');
	expect(wrapper3.find('div + ForwardRef')).toHaveLength(1);

	// Left button render
	const wrapper4 = mount(<TextInput label={'Label'} placement={'left'}
	                                  buttonIconProps={{icon: 'https://image.flaticon.com/icons/svg/2089/2089610.svg'}}/>);
	expect(wrapper4.find('img')).toHaveLength(1);
	expect(wrapper4.find('button')).toHaveLength(1);
	expect(wrapper4.find('img').prop('alt')).toEqual('2089610');
	expect(wrapper4.find('ForwardRef + div')).toHaveLength(1);

	// Disabled render
	const wrapper5 = mount(<TextInput disabled={true}
	                                  buttonIconProps={{icon: 'https://image.flaticon.com/icons/svg/2089/2089610.svg'}}/>);
	expect(wrapper5.find('input').prop('disabled')).toBe(true);
	expect(wrapper5.find('button').prop('disabled')).toBe(true);
});