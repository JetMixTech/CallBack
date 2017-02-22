import React, { PropTypes, Component } from 'react';
import CN from 'classnames';

import styles from 'styles/blocks/modal';
import { Icon, Form, Input, Button } from 'js/components/ui';
import { http } from 'js/utils';

class Modal extends Component {
    constructor() {
        super();
        this.state = { visible: false, isSent: false };
        this.close = this.close.bind(this);
        this.closeOnEsc = this.closeOnEsc.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.closeOnEsc);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.closeOnEsc);
    }

    closeOnEsc(event) {
        if (event.keyCode === 27) {
            this.close();
        }
    }

    open() {
        this.setState({ visible: true, isSent: false });
    }

    close() {
        this.form && this.form.reset();
        this.setState({ visible: false });
    }

    sendEmail() {
        const formData = this.form.getData();

        if (this.props.config.sendToTMService.enabled) {
            const serviceData = {
                name: formData.customer,
                date: Date.now(),
                source: 'Неизвестно',
                taskType: 'Заявка',
                taskSource: location.href,
                comment: `Телефон: ${formData.phone}, Удобное время для звонка: ${formData.time}`
            };

            http.post('https://api.jetmix.su/v1/tickets', serviceData);
        }

        const senderData = {
            ...this.props.config,
            payload: { ...formData, location: location.href }
        };

        http.post('https://sender.jetmix.su', senderData)
            .then((response) => {
                if (response.success) {
                    this.form.unsetSubmitting();
                    this.form.reset();
                    this.setState({ isSent: true });
                }
            });

        this.form.setSubmitting();
    }

    render() {
        const { sendEmail, close, props: { config }, state: { visible, isSent } } = this;

        return (
            <div className={ CN(styles.modal, { [styles.modal_visible]: visible }) }>
                <div className={ styles.container }>
                    <div className={ CN(styles.side, styles.side_left) }>
                        <div className={ CN(styles.side_in, styles.side_center) }>
                            <p className={ styles.text }>
                                Готовы ответить на любые технические вопросы по телефону:
                            </p>
                            <p className={ styles.phone }>{ config.companyPhone }</p>
                        </div>
                    </div>
                    <div className={ styles.side }>
                        { isSent ? (
                            <div className={ CN(styles.side_in, styles.side_center) }>
                                <Icon view="rocket" />
                                <p className={ styles.text }>
                                    Ваш запрос был успешно отправлен, ожидайте звонка от нашего оператора!
                                </p>
                            </div>
                        ) : (
                            <div className={ styles.side_in }>
                                <div className={ styles.title }>
                                    Укажите ваши контакты и наш звонок не заставит себя ждать
                                </div>
                                <div className={ styles.form }>
                                    <Form onSubmit={ sendEmail } ref={ (form) => { this.form = form; } }>
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
                                            placeholder="Сегодня, завтра, в течении часа"
                                            required
                                        />
                                        <Button icon="callback" text="Перезвонить мне" />
                                    </Form>
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
                <div className={ styles.overlay } onClick={ close }></div>
            </div>
        );
    }
}

Modal.propTypes = {
    config: PropTypes.object
};

export default Modal;
