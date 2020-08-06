import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import merge from 'deepmerge';

import {theme, themeValidator} from './theme';
import themeToCSS from '../utils/themeToCSS';
import path from 'path';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @return {React.Component}
 */
const Checkbox = React.forwardRef((props, ref) => {
	const {icon: Icon, initialState, theme: customTheme, mergeThemes, children, onChange, ...others} = props;
	const [state, setState] = useState(initialState);

	return Style.it(
		themeToCSS(mergeThemes ? merge(theme, themeValidator(customTheme)) : customTheme ? themeValidator(customTheme) : theme),
		<div className={'root'} style={{cursor: others.disabled ? 'default' : 'pointer'}}
		     data-checked={state} data-disabled={others.disabled}
		     onClick={() => {
			     !others.disabled && setState(!state);
			     !others.disabled && onChange && onChange(!state);
		     }}>
			<input type={'checkbox'} disabled={others.disabled} value={state} checked={state}
			       onChange={event => setState(event.target.checked)}
			       aria-checked={state} aria-disabled={others.disabled} ref={ref} style={{display: 'none'}}
			       {...others}/>
			{Icon ?
				typeof Icon === 'string' ?
					<img src={Icon} alt={path.basename(Icon, path.extname(Icon))}
					     className={'icon'}/>
					:
					<Icon className={'icon'} data-checked={state} data-disabled={others.disabled}/>
				:
				<svg className={'icon'} xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 24 24'}
				     data-checked={state} data-disabled={others.disabled}>
					{state &&
					<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
					}
				</svg>
			}
			<span className={'label'} data-checked={state} data-disabled={others.disabled}>
			     {children}
			     </span>
		</div>
	)
});

Checkbox.propTypes = {
	/**
	 * Overrides the icon of the checkbox. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Defines if the component is checked or not
	 *
	 * `boolean` - default `false`
	 */
	initialState: PropTypes.bool,
	/**
	 * Triggered when the checkbox changes
	 *
	 * `function(state)`
	 */
	onChange: PropTypes.func,
	/**
	 * Theme of the component
	 *
	 * `object`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Checkbox/theme.js Checkbox - default theme}
	 */
	theme: PropTypes.shape({
		root: PropTypes.shape({default: PropTypes.object}),
		icon: PropTypes.shape({default: PropTypes.object}),
		label: PropTypes.shape({default: PropTypes.object})
	}),
	/**
	 * If `true`, the theme of the component will inherit and/or override all the properties from the default theme
	 *
	 * `boolean` - default `true`
	 *
	 * @see {@link https://github.com/Chiefbark/fast-components/tree/master/src/Checkbox/theme.js Checkbox - default theme}
	 */
	mergeThemes: PropTypes.bool
}

Checkbox.defaultProps = {
	initialState: false,
	disabled: false,
	theme: {},
	mergeThemes: true
}

export default Checkbox;