import React, {useState} from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';

import {styles, stylesValidator} from './styles';
import {getClassName, withCSS} from '../utils';
import {ThemeConsumer} from '../Theme';

const DATA_ID = 'FC_Switch';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const Switch = React.forwardRef((props, ref) => {
	const {variant, initialValue, helperText, error, onChange, icon: Icon, styles: customStyles, mergeStyles, children, className, ...others} = props;
	const _variant = ['default', 'primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'primary';
	const [state, setState] = useState(initialValue);

	return <ThemeConsumer>
		{value => {

			const className = `${DATA_ID}-${_variant}${getClassName(value, customStyles, Switch)}`;

			return withCSS(mergeStyles ?
				merge(styles(value, _variant), stylesValidator(customStyles)) :
				customStyles ? stylesValidator(customStyles) : styles(value, _variant),
				<div className={`${className} root ${className}`}
				     data-checked={state} data-disabled={others.disabled} data-error={error}>
					<div style={{cursor: others.disabled ? 'default' : 'pointer'}}
					     onClick={() => {
						     !others.disabled && setState(!state);
						     !others.disabled && onChange && onChange(!state);
					     }}>
						<input type={'checkbox'} disabled={others.disabled} value={state} checked={state}
						       onChange={event => setState(event.target.checked)}
						       style={{width: 0, height: 0, margin: 0, padding: 0}}
						       aria-checked={state} aria-disabled={others.disabled} ref={ref}
						       {...others}/>
						<div className={`${className} track`}
						     data-checked={state} data-disabled={others.disabled} data-error={error}>
							<div/>
						</div>
						<span className={`${className} label`}
						      data-checked={state} data-disabled={others.disabled} data-error={error}>
							{children}
						</span>
					</div>
					{helperText &&
					<small className={`${className} helperText`}
					       data-checked={state} data-disabled={others.disabled} data-error={error}>
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
Switch.stylesID = 0;
/**
 * Used to create unique css stylesheets when the theme is overridden
 * @type {number}
 */
Switch.themeID = 0;
/**
 * Stores the hashes of all themes used in this Component, so there are no duplicated css stylesheets
 * @type {string[]}
 */
Switch.themeHashes = [];

Switch.propTypes = {
	/**
	 * Variant of the component. Can be `default`, `primary` or `secondary`
	 *
	 * `string` - default `primary`
	 */
	variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
	/**
	 * Sets the initial state of the checkbox
	 *
	 * `boolean` - default `false`
	 */
	initialValue: PropTypes.bool,
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
	 * Triggered when the checkbox changes
	 *
	 * `function(state)`
	 */
	onChange: PropTypes.func,
	/**
	 * Styles of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Switch/styles.js Switch - default Styles}
	 */
	styles: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		track: PropTypes.shape({default: PropTypes.object}),
		label: PropTypes.shape({default: PropTypes.object}),
		helperText: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the defaultTheme of the component will inherit and/or override all the properties from the default Styles
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Switch/styles.js Switch - default Styles}
	 */
	mergeStyles: PropTypes.bool
}

Switch.defaultProps = {
	variant: 'default',
	initialValue: false,
	mergeStyles: true,
	disabled: false
}

export default Switch;