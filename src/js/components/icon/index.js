import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

import styles from 'styles/blocks/icon';

const Icon = ({ view }) => (
    <i className={ CN(styles.icon, styles[view]) } aria-hidden="true"></i>
);

Icon.propTypes = {
    view: PropTypes.string
};

export default Icon;
