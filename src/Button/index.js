import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import path from 'path';

import {styles, stylesValidator} from './styles';
import {getClassName, withCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

const DATA_ID = 'FC_Button';

function renderIcon(Icon, {placement, className, disabled}) {
	return (
		typeof Icon === 'string' ?
			<img src={Icon} alt={path.basename(Icon, path.extname(Icon))} className={`${className} icon ${placement}`}
			     data-disabled={disabled}/>
			:
			Icon && <Icon className={`${className} icon ${placement}`} data-disabled={disabled}/>
	)
}

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const Button = React.forwardRef((props, ref) => {
	const {variant, icon: Icon, placement, styles: customStyles, mergeStyles, children, className: customClassName, ...others} = props;
	const _variant = ['default', 'primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'default';

	return <ThemeConsumer>
		{value => {
			const className = `${DATA_ID}-${_variant}${getClassName(value, customStyles, Button)}`;

			return withCSS(mergeStyles ?
				merge(styles(value, _variant), stylesValidator(customStyles)) :
				customStyles ? stylesValidator(customStyles) : styles(value, _variant),
				<button type={'button'} className={`${className} root ${customClassName}`.trim()}
				        style={{cursor: others.disabled ? 'default' : 'pointer'}}
				        aria-disabled={others.disabled} ref={ref}
				        {...others}>
					{placement === 'left' && renderIcon(Icon, {
						placement: placement,
						className: `${className}`,
						disabled: others.disabled
					})}
					<span>{children}</span>
					{placement === 'right' && renderIcon(Icon, {
						placement: placement,
						className: `${className}`,
						disabled: others.disabled
					})}
				</button>,
				className)
		}
		}
	</ThemeConsumer>
});

/**
 * Used to create unique css stylesheets when the styles are overridden
 * @type {number}
 */
Button.stylesID = 0;
/**
 * Used to create unique css stylesheets when the theme is overridden
 * @type {number}
 */
Button.themeID = 0;
/**
 * Stores the hashes of all themes used in this Component, so there are no duplicated css stylesheets
 * @type {string[]}
 */
Button.themeHashes = [];

Button.propTypes = {
	/**
	 * Variant of the component. Can be `default`, `primary` or `secondary`
	 *
	 * `string` - default `default`
	 */
	variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
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
	 * Styles of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Button/styles.js Button - default Styles}
	 */
	styles: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		icon: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the Styles of the component will inherit and/or override all the properties from the default Styles
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Button/styles.js Button - default Styles}
	 */
	mergeStyles: PropTypes.bool
}

Button.defaultProps = {
	variant: 'default',
	placement: 'right',
	mergeStyles: true,
	disabled: false
}

export default Button;