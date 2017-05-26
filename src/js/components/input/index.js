import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';
import MaskedInput from 'react-maskedinput';

import styles from 'styles/blocks/input';

const Input = ({ type, name, label, meta, placeholder, mask, onChange, required }) => {
    const inputCN = CN(styles.input, {
        [styles.input_required]: required,
        [styles.input_valid]: meta[name].touched && !meta[name].invalid
    });

    const inputProps = {
        type,
        name,
        placeholder,
        onChange,
        className: styles.control,
        value: meta[name].value
    };

    return (
        <div className={ inputCN }>
            <label className={ styles.label }>
                { mask ? (
                    <MaskedInput mask={ mask } { ...inputProps } />
                ) : (
                    <input { ...inputProps } />
                ) }
                <span className={ styles.labelText }>{ label }</span>
            </label>
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        invalid: PropTypes.bool
    }),
    placeholder: PropTypes.string,
    mask: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool
};

Input.defaultProps = {
    type: 'text'
};

export default Input;
