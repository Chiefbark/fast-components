import React, {useState} from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';

import {styles, stylesValidator} from './styles';
import {getClassName, withCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

const DATA_ID = 'FC_TextInput';

const TextInput = React.forwardRef((props, ref) => {
	const {variant, initialValue, type, helperText, error, styles: customStyles, mergeStyles, children, className: customClassName, onChange, ...others} = props;
	const _variant = ['default', 'primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'primary';
	const _type = ['email', 'number', 'password', 'tel', 'text'].indexOf(type) >= 0 ? type : 'text';
	const [state, setState] = useState(initialValue);

	return <ThemeConsumer>
		{value => {
			const className = `${DATA_ID}-${_variant}${getClassName(value, customStyles, TextInput)}`;

			return withCSS(mergeStyles ?
				merge(styles(value, _variant), stylesValidator(customStyles)) :
				customStyles ? stylesValidator(customStyles) : styles(value, _variant),
				<div className={`${className} root ${customClassName}`.trim()}
				     data-disabled={others.disabled} data-error={error}>
					<div>
						<input type={_type} disabled={others.disabled} value={state}
						       className={`${className} input`}
						       onChange={event => {
							       setState(event.currentTarget.value);
							       onChange && onChange();
						       }}
						       aria-disabled={others.disabled} data-error={error} ref={ref}
						       {...others}/>
						<label className={`${className} label`} htmlFor={others.id}
						       data-disabled={others.disabled} data-error={error}>
							{children}
						</label>
					</div>
					{helperText &&
					<small className={`${className} helperText`}
					       data-disabled={others.disabled} data-error={error}>
						{helperText}
					</small>
					}
				</div>,
				className)
		}
		}
	</ThemeConsumer>
});

/**
 * Used to create unique css stylesheets when the styles are overridden
 * @type {number}
 */
TextInput.stylesID = 0;
/**
 * Used to create unique css stylesheets when the theme is overridden
 * @type {number}
 */
TextInput.themeID = 0;
/**
 * Stores the hashes of all themes used in this Component, so there are no duplicated css stylesheets
 * @type {string[]}
 */
TextInput.themeHashes = [];

TextInput.propTypes = {
	/**
	 * Variant of the component. Can be `default`, `primary` or `secondary`
	 *
	 * `string` - default `primary`
	 */
	variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
	/**
	 * Sets the initial value of the input
	 *
	 * `string`
	 */
	initialValue: PropTypes.string,
	/**
	 * Type of the input. Can be one of `email, number, password, tel, text`
	 *
	 * `string` - default `text`
	 */
	type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
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
	 * Styles of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/TextInput/styles.js TextInput - default Styles}
	 */
	styles: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		input: PropTypes.shape({default: PropTypes.object}),
		label: PropTypes.shape({default: PropTypes.object}),
		helperText: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the Styles of the component will inherit and/or override all the properties from the default Styles
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/TextInput/styles.js TextInput - default Styles}
	 */
	mergeStyles: PropTypes.bool
}

TextInput.defaultProps = {
	variant: 'primary',
	initialValue: '',
	type: 'text',
	mergeStyles: true,
	disabled: false,
	error: false
}

export default TextInput;