import React, { PropTypes } from 'react';
import CN from 'classnames';

import styles from 'styles/blocks/button';
import { Icon } from 'js/components/ui';

function Button({ icon, text, view, onClick, disabled }) {
    const buttonCN = CN(styles.button, styles[view], {
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
    view: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

export default Button;
