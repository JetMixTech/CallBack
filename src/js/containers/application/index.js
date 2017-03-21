import React, { PropTypes, Component } from 'react';

import styles from 'styles/lib/base';
import Modal from 'js/components/modal';
import { Button } from 'js/components/ui';

class Application extends Component {
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.openModalByTriggerSelector = this.openModalByTriggerSelector.bind(this);
    }

    componentDidMount() {
        if (this.props.config.triggerBy) {
            document.addEventListener('click', this.openModalByTriggerSelector);
        }
    }

    componentWillUnmount() {
        if (this.props.config.triggerBy) {
            document.removeEventListener('click', this.openModalByTriggerSelector);
        }
    }

    openModalByTriggerSelector(event) {
        let { target } = event;

        while (target !== document.documentElement) {
            if (target.matches(this.props.config.triggerBy)) {
                this.openModal();
                break;
            }

            target = target.parentNode;
        }
    }

    openModal() {
        this.modal.open();
    }

    render() {
        return (
            <div className={ styles.main }>
                <Modal ref={ (modal) => { this.modal = modal; } } config={ this.props.config } />
                { !this.props.config.disableFloatButton && (
                    <div className={ styles.floatButton }>
                        <Button icon="call" view="float" theme={ this.props.config.theme } onClick={ this.openModal } />
                    </div>
                ) }
            </div>
        );
    }
}

Application.propTypes = {
    config: PropTypes.object
};

export default Application;
