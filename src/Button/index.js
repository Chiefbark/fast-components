import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';
import path from 'path';

import {theme, themeValidator} from './theme';
import themeToCSS from '../utils/themeToCSS';

function renderIcon(Icon, placement) {
	return (
		typeof Icon === 'string' ?
			<img src={Icon} alt={path.basename(Icon, path.extname(Icon))} className={`icon ${placement}`}/>
			:
			Icon && <Icon className={`icon ${placement}`}/>
	)
}

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const Button = React.forwardRef((props, ref) => {
	const {icon: Icon, placement, theme: customTheme, mergeThemes, children, ...others} = props;

	return Style.it(
		themeToCSS(mergeThemes ? merge(theme, themeValidator(customTheme)) : customTheme ? themeValidator(customTheme) : theme),
		<button type={'button'}
		        className={'root'}
		        style={{cursor: others.disabled ? 'default' : 'pointer'}}
		        aria-disabled={others.disabled} ref={ref}
		        {...others}>
			{placement === 'left' && renderIcon(Icon, placement)}
			<span>{children}</span>
			{placement === 'right' && renderIcon(Icon, placement)}
		</button>
	)
});

Button.propTypes = {
	/**
	 * Displays an icon in the button. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Position of the icon if defined
	 *
	 * `string` - default `right`
	 */
	placement: PropTypes.oneOf(['left', 'right']),
	/**
	 * Theme of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Button/theme.js Button - default theme}
	 */
	theme: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		icon: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the theme of the component will inherit and/or override all the properties from the default theme
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Button/theme.js Button - default theme}
	 */
	mergeThemes: PropTypes.bool
}

Button.defaultProps = {
	disabled: false,
	placement: 'right',
	theme: {},
	mergeThemes: true
}

export default Button;