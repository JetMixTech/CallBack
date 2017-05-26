import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

import styles from 'styles/blocks/modal';
import { Icon, Form, Input, Button } from 'js/components/ui';
import { http } from 'js/utils';

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            side: 'left',
            visible: false,
            isSent: false
        };
    }

    componentDidMount() {
        document.addEventListener('keyup', this.closeOnEsc);
        this.container.addEventListener('transitionend', this.containerAnimationEnd);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.side !== nextState.side
            || this.state.visible !== nextState.visible
            || this.state.isSent !== nextState.isSent;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.closeOnEsc);
        this.container.removeEventListener('transitionend', this.containerAnimationEnd);
    }

    closeOnEsc = (event) => {
        if (event.keyCode === 27) {
            this.close();
        }
    };

    open() {
        this.setState({ visible: true, isSent: false });
    }

    close = () => {
        this.form && this.form.reset();
        this.setState({ visible: false });
    };

    containerAnimationEnd = () => {
        if (!this.state.visible) {
            this.setState({ side: 'left' });
        }
    };

    sendEmail = () => {
        const formData = this.form.getData();

        if (this.props.config.sendToTMService && this.props.config.sendToTMService.enabled) {
            const serviceData = {
                name: formData.customer,
                date: Date.now(),
                source: 'Неизвестно',
                taskType: 'Заявка',
                taskSource: location.href,
                comment: `Телефон: ${formData.phone}, Удобное время для звонка: ${formData.time}`
            };

            http.post(this.props.config.endpoints.ticket, serviceData);
        }

        const senderData = {
            ...this.props.config,
            payload: { ...formData, location: location.href }
        };

        http.post(this.props.config.endpoints.sender, senderData)
            .then((response) => {
                if (response.success) {
                    this.form.unsetSubmitting();
                    this.form.reset();
                    this.setState({ isSent: true });
                }
            });

        this.form.setSubmitting();
    };

    changeSide = () => {
        this.setState({
            side: this.state.side === 'left' ? 'right' : 'left'
        });
    };

    render() {
        const { side, visible, isSent } = this.state;
        const { config } = this.props;

        return (
            <div className={ CN(styles.modal, { [styles.modal_visible]: visible }) }>
                <div className={ styles.container } ref={ (container) => { this.container = container; } }>
                    <div className={ CN(styles.side, styles.side_left, { [styles.side_visible]: side === 'left' }) }>
                        <div className={ CN(styles.side_in, styles.side_center) }>
                            <div className={ styles.center }>
                                <p className={ styles.text }>
                                    { config.textBoard }
                                </p>
                                <p className={ styles.phone }>{ config.companyPhone }</p>
                            </div>
                            <div className={ styles.callbackButton }>
                                <Button
                                    icon="callback"
                                    text="Заказать звонок"
                                    view="secondary"
                                    onClick={ this.changeSide }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={ CN(styles.side, styles.side_right, { [styles.side_visible]: side === 'right' }) }>
                        { isSent ? (
                            <div className={ CN(styles.side_in, styles.side_center) }>
                                <Icon view="success" />
                                <p className={ CN(styles.text, styles.text_offset) }>
                                    Ваш запрос был успешно отправлен, ожидайте звонка от нашего оператора!
                                </p>
                            </div>
                        ) : (
                            <div className={ styles.side_in }>
                                <div className={ styles.title }>
                                    { config.title }
                                </div>
                                <div className={ styles.form }>
                                    <Form onSubmit={ this.sendEmail } ref={ (form) => { this.form = form; } }>
                                        <Input
                                            type="text"
                                            name="customer"
                                            label="Имя"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            name="phone"
                                            label="Телефон"
                                            placeholder="+7 (000) 000-00-00"
                                            mask="+7 (111) 111-11-11"
                                            required
                                        />
                                        <Input
                                            type="text"
                                            name="time"
                                            label="Удобное время для вас"
                                            placeholder="Сегодня, завтра, в течение часа"
                                        />
                                        <Button
                                            icon="callback"
                                            text="Перезвонить мне"
                                            theme={ this.props.config.theme }
                                        />
                                    </Form>
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
                <div className={ styles.overlay } onClick={ this.close }></div>
            </div>
        );
    }
}

Modal.propTypes = {
    config: PropTypes.object
};

export default Modal;
