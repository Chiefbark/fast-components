import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';

import {styles, stylesValidator} from './styles';
import {stylesToCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

const TextInput = React.forwardRef((props, ref) => {
	const {variant, initialValue, type, helperText, error, styles: customStyles, mergeStyles, children, onChange, ...others} = props;
	const _variant = ['primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'primary';
	const _type = ['email', 'number', 'password', 'tel', 'text'].indexOf(type) >= 0 ? type : 'text';
	const [state, setState] = useState(initialValue);

	return <ThemeConsumer>
		{value =>
			Style.it(
				stylesToCSS(mergeStyles ?
					merge(styles(value, _variant), stylesValidator(customStyles)) :
					customStyles ? stylesValidator(customStyles) : styles(value, _variant)),
				<div className={'root'} data-disabled={others.disabled} data-error={error}>
					<div className={'root'} style={{borderRadius: 0, flexDirection: 'column'}}>
						<input type={_type}
						       className={'input'} id={others.id} disabled={others.disabled} value={state}
						       aria-disabled={others.disabled} ref={ref} data-error={error}
						       onChange={event => {
							       setState(event.currentTarget.value);
							       onChange && onChange();
						       }}
						       {...others}/>
						{children &&
						<label className={'label'} htmlFor={others.id}>{children}</label>
						}
					</div>
					{helperText && <small className={'helperText'}>{helperText}</small>}
				</div>
			)
		}
	</ThemeConsumer>
});

TextInput.propTypes = {
	/**
	 * Variant of the component. Can be `primary` or `secondary`
	 *
	 * `string` - default `primary`
	 */
	variant: PropTypes.oneOf(['primary', 'secondary']),
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
		label: PropTypes.shape({default: PropTypes.object})
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
	disabled: false,
	styles: {},
	mergeStyles: true
}

export default TextInput;