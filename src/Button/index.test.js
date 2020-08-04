import React from 'react';
import Button from './index';
import merge from 'deepmerge';
import theme from './theme';
import themeToCSS from '../utils/themeToCSS';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

test('Button - default theme', () => {
	const button = shallow(<Button>button</Button>);

	// Button Component with default theme
	expect(button.childAt(0).text()).toMatch(themeToCSS(theme));
});

test('Button - custom theme', () => {
	const customTheme = {
		root: {
			default: {backgroundColor: 'red', borderColor: 'red'},
			':hover': {
				backgroundColor: 'indianred'
			}
		}
	}
	const buttonMerge = shallow(<Button theme={customTheme}>button</Button>);
	const buttonOverride = shallow(<Button theme={customTheme} mergeThemes={false}>button</Button>);

	// Button Component merging themes
	expect(buttonMerge.childAt(0).text()).not.toMatch(themeToCSS(customTheme));
	expect(buttonMerge.childAt(0).text()).toMatch(themeToCSS(merge(theme, customTheme)));

	// Button Component overriding themes
	expect(buttonOverride.childAt(0).text()).not.toMatch(themeToCSS(merge(theme, customTheme)));
	expect(buttonOverride.childAt(0).text()).toMatch(themeToCSS(customTheme));
});

test('Button - with icons', () => {
	const buttonLeftIcon = shallow(<Button icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}
	                                       placement={'left'}>button</Button>);
	const buttonRightIcon = shallow(<Button icon={'https://image.flaticon.com/icons/svg/2089/2089610.svg'}
	                                        placement={'right'}>button</Button>);

	// Button Component with left icon
	expect(buttonLeftIcon.html()).toMatch(/<img .*\/>button/);

	// Button Component with right icon
	expect(buttonRightIcon.html()).toMatch(/button<img .*\/>/);
});