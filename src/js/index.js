import React from 'react';
import { render } from 'react-dom';

import { validateConfig } from 'js/validators/config';
import Application from 'js/containers/application';

class JMCallBack {
    constructor(config) {
        this.config = config;
        this.validateConfig();
        this.createRootElement();
        this.setToken();
        this.mountApplication();
    }

    validateConfig() {
        const errors = validateConfig(this.config);

        if (errors.length) {
            throw Error(`Missing config props: ${errors.join(', ')}`);
        }
    }

    createRootElement() {
        const root = document.createElement('div');
        root.id = 'callback-root';
        document.body.appendChild(root);
    }

    setToken() {
        if (this.config.sendToTMService.enabled) {
            localStorage.setItem('callback-token', this.config.sendToTMService.token);
        }
    }

    mountApplication() {
        render((
            <Application config={ this.config } />
        ), document.getElementById('callback-root'));
    }
}

window.JMCallBack = JMCallBack;
