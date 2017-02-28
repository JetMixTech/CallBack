import React, { PropTypes } from 'react';
import CN from 'classnames';

import styles from 'styles/blocks/icon';

function Icon({ view }) {
    return (
        <i className={ CN(styles.icon, styles[view]) } aria-hidden="true"></i>
    );
}

Icon.propTypes = {
    view: PropTypes.string
};

export default Icon;