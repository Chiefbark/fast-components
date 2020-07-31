import React from 'react';
import PropTypes from 'prop-types';
import styles from './buttonIcon.module.css';

import path from 'path';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @see ButtonIcon.propTypes
 * @return {React.Component}
 */
function ButtonIcon(props) {
	const {icon: Icon, style, iconStyle, ...others} = props;

	return (
		<button type={'button'} className={styles.root}
		        style={{...{cursor: others.disabled ? 'default' : 'pointer'}, style}}
		        aria-disabled={others.disabled}
		        {...others}>
			{typeof Icon === 'string' ?
				<img src={Icon} className={styles.icon} style={iconStyle}
				     alt={path.basename(Icon, path.extname(Icon))}/>
				:
				<Icon className={styles.icon} style={iconStyle}/>
			}
		</button>
	)
}

ButtonIcon.propTypes = {
	/**
	 * The icon to display. Can be either a component or a path/url to the image
	 *
	 * `React Element | image path`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Overrides the styles of the button
	 *
	 * `styles`
	 */
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	/**
	 * Overrides the styles of the icon
	 *
	 * `styles`
	 */
	iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default ButtonIcon;