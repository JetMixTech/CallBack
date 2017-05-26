import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

import styles from 'styles/blocks/button';
import { Icon } from 'js/components/ui';

function Button({ icon, text, view, theme, onClick, disabled }) {
    const buttonCN = CN(styles.button, styles[view], styles[theme], {
        [styles.button_disabled]: disabled
    });
    const iconCN = CN(styles.text, {
        [styles.text_shifted]: !!icon
    });

    return (
        <button className={ buttonCN } onClick={ onClick } disabled={ disabled }>
            <span className={ styles.in }>
                { icon && <Icon view={ icon } /> }
                { text && <span className={ iconCN }>{ text }</span> }
            </span>
        </button>
    );
}

Button.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.string,
    view: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    theme: 'winter'
};

export default Button;
