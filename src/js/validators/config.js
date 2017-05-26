export function validateConfig(config) {
    const errors = [];

    if (!config.companyName) {
        errors.push('companyName');
    }

    if (!config.companyMail) {
        errors.push('companyMail');
    }

    if (!config.companySite) {
        errors.push('companySite');
    }

    if (!config.companyPhone) {
        errors.push('companyPhone');
    }

    if (config.sendToTMService) {
        if (config.sendToTMService.enabled && !config.sendToTMService.token) {
            errors.push('sendToTMService.token');
        }
    }

    if (config.theme) {
        const themes = ['summer', 'winter', 'autumn'];
        if (!~themes.indexOf(config.theme)) {
            errors.push(`Available themes: ${themes.join(', ')}`);
        }
    }

    return errors;
}
