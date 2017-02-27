import React, { PropTypes, Component } from 'react';

import styles from 'styles/lib/base';
import Modal from 'js/components/modal';
import { Button } from 'js/components/ui';

class Application extends Component {
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        if (this.props.config.triggerBy) {
            document.addEventListener('click', (event) => {
                if (event.target.matches(this.props.config.triggerBy)) {
                    this.openModal();
                }
            });
        }
    }

    openModal() {
        this.modal.open();
    }

    render() {
        return (
            <div className={ styles.main }>
                <Modal ref={ (modal) => { this.modal = modal; } } config={ this.props.config } />
                <div className={ styles.floatButton }>
                    <Button icon="call" view="float" onClick={ this.openModal } />
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    config: PropTypes.object
};

export default Application;
