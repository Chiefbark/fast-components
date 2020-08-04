import React from 'react';
import ButtonIcon from './index';
import merge from 'deepmerge';
import theme from './theme';
import themeToCSS from '../utils/themeToCSS';

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
});

test('ButtonIcon - theme', () => {
	const customTheme = {
		root: {
			default: {backgroundColor: 'red', borderColor: 'red'},
			':hover': {backgroundColor: 'indianred'}
		}
	}
	// Default theme
	const wrapper1 = mount(<ButtonIcon>button</ButtonIcon>);
	expect(wrapper1.prop('theme')).toEqual({});
	expect(wrapper1.find('Style').prop('children')[0]).toEqual(themeToCSS(theme));

	// Custom theme
	const wrapper2 = mount(<ButtonIcon theme={customTheme}>button</ButtonIcon>);
	expect(wrapper2.prop('theme')).toEqual(customTheme);
	expect(wrapper2.find('Style').prop('children')[0]).toEqual(themeToCSS(merge(theme, customTheme)));

	// Custom theme override
	const wrapper3 = mount(<ButtonIcon theme={customTheme} mergeThemes={false}>button</ButtonIcon>);
	expect(wrapper3.prop('theme')).toEqual(customTheme);
	expect(wrapper3.find('Style').prop('children')[0]).toEqual(themeToCSS(customTheme));
});