import React from 'react';
import Button from './index';
import merge from 'deepmerge';
import theme from './theme';
import themeToCSS from '../utils/themeToCSS';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test('Button - render', () => {
	// Default render
	const wrapper1 = mount(<Button>button</Button>);
	expect(wrapper1.find('button').hasClass('root')).toEqual(true);
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
});

test('Button - theme', () => {
	const customTheme = {
		root: {
			default: {backgroundColor: 'red', borderColor: 'red'},
			':hover': {backgroundColor: 'indianred'}
		}
	}
	// Default theme
	const wrapper1 = mount(<Button>button</Button>);
	expect(wrapper1.prop('theme')).toEqual({});
	expect(wrapper1.find('Style').prop('children')[0]).toEqual(themeToCSS(theme));

	// Custom theme
	const wrapper2 = mount(<Button theme={customTheme}>button</Button>);
	expect(wrapper2.prop('theme')).toEqual(customTheme);
	expect(wrapper2.find('Style').prop('children')[0]).toEqual(themeToCSS(merge(theme, customTheme)));

	// Custom theme override
	const wrapper3 = mount(<Button theme={customTheme} mergeThemes={false}>button</Button>);
	expect(wrapper3.prop('theme')).toEqual(customTheme);
	expect(wrapper3.find('Style').prop('children')[0]).toEqual(themeToCSS(customTheme));
});