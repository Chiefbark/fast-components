import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';

import {theme, themeValidator} from './theme';
import themeToCSS from '../utils/themeToCSS';
import {ButtonIcon} from '../index';

const TextInput = React.forwardRef((props, ref) => {
	const {buttonIconProps, placement, label, theme: customTheme, mergeThemes, children, onChange, ...others} = props;
	const [state, setState] = useState('');
	delete others.placeholder;

	return Style.it(
		themeToCSS(mergeThemes ? merge(theme, themeValidator(customTheme)) : customTheme ? themeValidator(customTheme) : theme),
		<div className={'root'} data-disabled={others.disabled}>
			{placement === 'left' && buttonIconProps && <ButtonIcon {...buttonIconProps} disabled={others.disabled}/>}
			<div className={'root'} style={{borderRadius: 0}}>
				<input type={'text'} className={'input'} ref={ref} disabled={others.disabled}
				       aria-disabled={others.disabled} value={state}
				       onChange={event => {
					       setState(event.currentTarget.value);
					       onChange && onChange();
				       }}
				       {...others}/>
				{label && <label className={'label'} htmlFor={others.id}>{label}</label>}
			</div>
			{placement === 'right' && buttonIconProps && <ButtonIcon {...buttonIconProps} disabled={others.disabled}/>}
		</div>
	)
});

TextInput.propTypes = {
	/**
	 * If provided, will render a ButtonIcon component
	 *
	 * `object`
	 *
	 * @see ButtonIcon.propTypes
	 */
	buttonIconProps: PropTypes.object,
	/**
	 * Position of the icon if defined
	 *
	 * `string` - default `right`
	 */
	placement: PropTypes.oneOf(['left', 'right']),
	/**
	 * Label of the input
	 *
	 * `string`
	 */
	label: PropTypes.string,
	/**
	 * Theme of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/TextInput/theme.js TextInput - default theme}
	 */
	theme: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		input: PropTypes.shape({default: PropTypes.object}),
		label: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the theme of the component will inherit and/or override all the properties from the default theme
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/TextInput/theme.js TextInput - default theme}
	 */
	mergeThemes: PropTypes.bool
}

TextInput.defaultProps = {
	disabled: false,
	placement: 'right',
	theme: {},
	mergeThemes: true
}

export default TextInput;