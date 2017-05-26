import { isEmpty } from 'js/utils';
import { phoneRegExp } from 'js/constants/validate';

export function validateCallBackForm(data) {
    const errors = {};

    if (isEmpty(data.customer)) {
        errors.customer = 'Укажите имя';
    }

    if (isEmpty(data.phone)) {
        errors.phone = 'Укажите телефон';
    } else if (!phoneRegExp.test(data.phone)) {
        errors.phone = 'Неверный формат';
    }

    return errors;
}
