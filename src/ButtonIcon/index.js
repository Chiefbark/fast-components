import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import path from 'path';

import {styles, stylesValidator} from './styles';
import {getClassName, withCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

const DATA_ID = 'FC_ButtonIcon';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const ButtonIcon = React.forwardRef((props, ref) => {
	const {variant, icon: Icon, rounded, styles: customStyles, mergeStyles, children, className: customClassName, ...others} = props;
	const _variant = ['default', 'primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'default';

	return <ThemeConsumer>
		{value => {
			const className = `${DATA_ID}-${_variant}${getClassName(value, customStyles, ButtonIcon)}`;

			return withCSS(mergeStyles ?
				merge(styles(value, _variant), stylesValidator(customStyles)) :
				customStyles ? stylesValidator(customStyles) : styles(value, _variant),
				<button type={'button'} className={`${className} root ${customClassName}`.trim()}
				        style={{
					        cursor: others.disabled ? 'default' : 'pointer',
					        borderRadius: rounded ? '50%' : undefined
				        }}
				        aria-disabled={others.disabled} ref={ref}
				        {...others}>
					{typeof Icon === 'string' ?
						<img src={Icon} alt={path.basename(Icon, path.extname(Icon))} className={`${className} icon`}
						     data-disabled={others.disabled}/>
						:
						Icon && <Icon className={`${className} icon`} data-disabled={others.disabled}/>
					}
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
ButtonIcon.stylesID = 0;
/**
 * Used to create unique css stylesheets when the theme is overridden
 * @type {number}
 */
ButtonIcon.themeID = 0;
/**
 * Stores the hashes of all themes used in this Component, so there are no duplicated css stylesheets
 * @type {string[]}
 */
ButtonIcon.themeHashes = [];

ButtonIcon.propTypes = {
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
	 * Specifies if the button is rounded or not
	 *
	 * `boolean` - default `true`
	 */
	rounded: PropTypes.bool,
	/**
	 * Styles of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/ButtonIcon/styles.js ButtonIcon - default Styles}
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
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/ButtonIcon/styles.js ButtonIcon - default Styles}
	 */
	mergeStyles: PropTypes.bool
}

ButtonIcon.defaultProps = {
	variant: 'default',
	rounded: true,
	mergeStyles: true,
	disabled: false
}

export default ButtonIcon;