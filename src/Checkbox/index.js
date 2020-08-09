import React, {useState} from 'react';
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
const Checkbox = React.forwardRef((props, ref) => {
	const {variant, initialValue, onChange, icon: Icon, styles: customStyles, mergeStyles, children, ...others} = props;
	const _variant = ['primary', 'secondary'].indexOf(variant) >= 0 ? variant : 'primary';
	const [state, setState] = useState(initialValue);

	return <ThemeConsumer>
		{value =>
			Style.it(
				stylesToCSS(mergeStyles ?
					merge(styles(value, _variant), stylesValidator(customStyles)) :
					customStyles ? stylesValidator(customStyles) : styles(value, _variant)),
				<div className={'root'} style={{cursor: others.disabled ? 'default' : 'pointer'}}
				     data-checked={state} data-disabled={others.disabled}
				     onClick={() => {
					     !others.disabled && setState(!state);
					     !others.disabled && onChange && onChange(!state);
				     }}>
					<input type={'checkbox'} disabled={others.disabled} value={state} checked={state}
					       onChange={event => setState(event.target.checked)}
					       aria-checked={state} aria-disabled={others.disabled} ref={ref}
					       style={{width: 0, height: 0, margin: 0, padding: 0}}
					       {...others}/>
					{Icon ?
						typeof Icon === 'string' ?
							<img src={Icon} alt={path.basename(Icon, path.extname(Icon))} className={'icon'}/>
							:
							<Icon className={'icon'} data-checked={state} data-disabled={others.disabled}/>
						:
						<svg className={'icon'} xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 24 24'}
						     data-checked={state} data-disabled={others.disabled}>
							{state && <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>}
						</svg>
					}
					<span className={'label'} data-checked={state} data-disabled={others.disabled}>
			     {children}
			     </span>
				</div>
			)
		}
	</ThemeConsumer>
});

Checkbox.propTypes = {
	/**
	 * Variant of the component. Can be `primary` or `secondary`
	 *
	 * `string` - default `primary`
	 */
	variant: PropTypes.oneOf(['primary', 'secondary']),
	/**
	 * Sets the initial state of the checkbox
	 *
	 * `boolean` - default `false`
	 */
	initialValue: PropTypes.bool,
	/**
	 * Triggered when the checkbox changes
	 *
	 * `function(state)`
	 */
	onChange: PropTypes.func,
	/**
	 * Overrides the icon of the checkbox. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Styles of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Checkbox/styles.js Checkbox - default Styles}
	 */
	styles: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		icon: PropTypes.shape({default: PropTypes.object}),
		label: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the defaultTheme of the component will inherit and/or override all the properties from the default Styles
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Checkbox/styles.js Checkbox - default Styles}
	 */
	mergeStyles: PropTypes.bool
}

Checkbox.defaultProps = {
	variant: 'primary',
	initialValue: false,
	disabled: false,
	styles: {},
	mergeStyles: true
}

export default Checkbox;