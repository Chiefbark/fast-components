import React from 'react';
import TextInput from './index';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('TextInput - render', () => {
	// Default render
	const wrapper1 = mount(<TextInput>Label</TextInput>);
	expect(wrapper1.find('button')).toHaveLength(0);
	expect(wrapper1.find('label')).toHaveLength(1);
	expect(wrapper1.find('label').text()).toEqual('Label');
	expect(wrapper1.find('img')).toHaveLength(0);

	// HelperText render
	const wrapper2 = mount(<TextInput helperText={'This is a helper text'}>Label</TextInput>);
	expect(wrapper2.find('small')).toHaveLength(1);

	// Error render
	const wrapper3 = mount(<TextInput helperText={'This is a helper text'} error={true}>Label</TextInput>);
	expect(wrapper3.find('small').hasClass('error')).toBe(true);
	expect(wrapper3.find('label').hasClass('error')).toBe(true);
	expect(wrapper3.find('input').prop('data-error')).toBe(true);

	// Initial value render
	const wrapper4 = mount(<TextInput initialValue={'Hello World'}/>);
	expect(wrapper4.find('input').prop('value')).toEqual('Hello World');

	// Disabled render
	const wrapper5 = mount(<TextInput disabled={true}/>);
	expect(wrapper5.find('input').prop('disabled')).toBe(true);
});