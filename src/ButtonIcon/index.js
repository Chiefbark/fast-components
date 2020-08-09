import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';
import path from 'path';

import {styles, stylesValidator} from './styles';
import {stylesToCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const ButtonIcon = React.forwardRef((props, ref) => {
	const {variant, icon: Icon, rounded, styles: customStyles, mergeStyles, children, ...others} = props;
	const _variant = ['primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'primary';

	return <ThemeConsumer>
		{value =>
			Style.it(
				stylesToCSS(mergeStyles ?
					merge(styles(value, _variant), stylesValidator(customStyles)) :
					customStyles ? stylesValidator(customStyles) : styles(value, _variant)),
				<button type={'button'} className={'root'}
				        style={{
					        cursor: others.disabled ? 'default' : 'pointer',
					        borderRadius: rounded ? '50%' : undefined
				        }}
				        aria-disabled={others.disabled} ref={ref}
				        {...others}>
					{typeof Icon === 'string' ?
						<img src={Icon} alt={path.basename(Icon, path.extname(Icon))} className={'icon'}/>
						:
						Icon && <Icon className={'icon'}/>
					}
				</button>
			)
		}
	</ThemeConsumer>
});

ButtonIcon.propTypes = {
	/**
	 * Variant of the component. Can be `primary` or `secondary`
	 *
	 * `string` - default `primary`
	 */
	variant: PropTypes.oneOf(['primary', 'secondary']),
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
	variant: 'primary',
	disabled: false,
	rounded: true,
	styles: {},
	mergeStyles: true
}

export default ButtonIcon;