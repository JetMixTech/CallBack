import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { getFormData } from 'js/utils';
import { validateCallBackForm } from 'js/validators/callback';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            fields: {
                customer: { invalid: false, touched: false, value: '' },
                phone: { invalid: false, touched: false, value: '' },
                time: { invalid: false, touched: false, value: '' }
            },
            submitting: false,
            disableSubmit: true
        };
    }

    componentDidMount() {
        this.props.children.forEach((children) => {
            if (this.state.fields[children.props.name]) {
                if (children.props.required === true) {
                    this.setState((prevState) => ({
                        fields: {
                            ...prevState.fields,
                            [children.props.name]: {
                                ...prevState.fields[children.props.name],
                                invalid: true
                            }
                        }
                    }));
                }
            }
        });
    }

    onChange = (event) => {
        const { target: { value, name } } = event;
        const validate = validateCallBackForm({ [name]: value });
        const fields = {
            ...this.state.fields,
            [name]: {
                invalid: !!validate[name],
                touched: true,
                value
            }
        };
        const disableSubmit = Object.keys(fields).some((field) => fields[field].invalid);

        this.setState({ fields, disableSubmit });
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.state.disableSubmit) {
            this.props.onSubmit();
        }
    };

    setSubmitting() {
        this.setState({ submitting: true });
    }

    getData() {
        return getFormData(this.form);
    }

    unsetSubmitting() {
        this.setState({ submitting: false });
    }

    reset() {
        const keys = Object.keys(this.state.fields);
        const fields = keys.reduce((acc, value) => {
            acc[value] = { invalid: true, touched: false, value: '' };
            return acc;
        }, {});

        this.form.reset();
        this.setState({ fields, disableSubmit: true });
    }

    renderChildren = () => {
        const { onChange, state: { fields, submitting, disableSubmit }, props: { children } } = this;

        return children.map((item, key) => {
            let itemProps = null;

            if (item.type.displayName === 'Input') {
                itemProps = { meta: fields, onChange, key };
            } else if (item.type.displayName === 'Button') {
                itemProps = { disabled: disableSubmit || submitting, key };
            }

            return cloneElement(item, itemProps);
        });
    };

    render() {
        return (
            <form ref={ (form) => { this.form = form; } } onSubmit={ this.onSubmit } autoComplete="off">
                { this.renderChildren() }
            </form>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element)
};

export default Form;
