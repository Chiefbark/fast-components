import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';

import {theme, themeValidator} from './theme';
import themeToCSS from '../utils/themeToCSS';

const TextInput = React.forwardRef((props, ref) => {
	const {initialValue, label, helperText, error, theme: customTheme, mergeThemes, children, onChange, ...others} = props;
	const [state, setState] = useState(initialValue);

	return Style.it(
		themeToCSS(mergeThemes ? merge(theme, themeValidator(customTheme)) : customTheme ? themeValidator(customTheme) : theme),
		<div className={'root'} data-disabled={others.disabled}>
			<div className={'root'} style={{borderRadius: 0, flexDirection: 'column'}}>
				<input type={'text'} className={'input'} id={others.id} disabled={others.disabled} value={state}
				       aria-disabled={others.disabled} ref={ref} data-error={error}
				       onChange={event => {
					       setState(event.currentTarget.value);
					       onChange && onChange();
				       }}
				       {...others}/>
				{label && <label className={`label ${error ? 'error' : ''}`.trim()} htmlFor={others.id}>{label}</label>}
			</div>
			{helperText && <small className={`helperText ${error ? 'error' : ''}`.trim()}>{helperText}</small>}
		</div>
	)
});

TextInput.propTypes = {
	/**
	 * Sets the initial value of the input
	 *
	 * `string`
	 */
	initialValue: PropTypes.string,
	/**
	 * Label of the input
	 *
	 * `string`
	 */
	label: PropTypes.string,
	/**
	 * Text displayed to show more info about the input
	 *
	 * `string`
	 */
	helperText: PropTypes.string,
	/**
	 * If `true`, the input will simulate an error
	 *
	 * `boolean`
	 */
	error: PropTypes.bool,
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
	initialValue: '',
	disabled: false,
	theme: {},
	mergeThemes: true
}

export default TextInput;