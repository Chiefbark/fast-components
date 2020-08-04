import React from 'react';
import Checkbox from './index';
import merge from 'deepmerge';
import theme from './theme';
import themeToCSS from '../utils/themeToCSS';

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
});

test('Checkbox - theme', () => {
	const customTheme = {
		root: {
			default: {backgroundColor: 'red', borderColor: 'red'},
			':hover': {backgroundColor: 'indianred'}
		}
	}
	// Default theme
	const wrapper1 = mount(<Checkbox>checkbox</Checkbox>);
	expect(wrapper1.prop('theme')).toEqual({});
	expect(wrapper1.find('Style').prop('children')[0]).toEqual(themeToCSS(theme));

	// Custom theme
	const wrapper2 = mount(<Checkbox theme={customTheme}>checkbox</Checkbox>);
	expect(wrapper2.prop('theme')).toEqual(customTheme);
	expect(wrapper2.find('Style').prop('children')[0]).toEqual(themeToCSS(merge(theme, customTheme)));

	// Custom theme override
	const wrapper3 = mount(<Checkbox theme={customTheme} mergeThemes={false}>checkbox</Checkbox>);
	expect(wrapper3.prop('theme')).toEqual(customTheme);
	expect(wrapper3.find('Style').prop('children')[0]).toEqual(themeToCSS(customTheme));
});