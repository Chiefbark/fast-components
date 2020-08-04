import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';
import path from 'path';

import theme from './theme';
import themeToCSS from '../utils/themeToCSS';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const ButtonIcon = React.forwardRef((props, ref) => {
	const {icon: Icon, theme: customTheme, mergeThemes, children, ...others} = props;

	return Style.it(
		themeToCSS(mergeThemes ? merge(theme, customTheme) : customTheme),
		<button type={'button'}
		        className={'root'}
		        style={{cursor: others.disabled ? 'default' : 'pointer'}}
		        aria-disabled={others.disabled} ref={ref}
		        {...others}>
			{typeof Icon === 'string' ?
				<img src={Icon} alt={path.basename(Icon, path.extname(Icon))}
				     className={'icon'}/>
				:
				Icon &&
				<Icon className={'icon'}/>
			}
		</button>
	)
});

ButtonIcon.propTypes = {
	/**
	 * Displays an icon in the button. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Theme of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/ButtonIcon/theme.js ButtonIcon - default theme}
	 */
	theme: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		icon: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the theme of the component will inherit and/or override all the properties from the default theme
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/ButtonIcon/theme.js ButtonIcon - default theme}
	 *
	 * `boolean` - default `true`
	 */
	mergeThemes: PropTypes.bool
}

ButtonIcon.defaultProps = {
	disabled: false,
	theme: {},
	mergeThemes: true
}

export default ButtonIcon;