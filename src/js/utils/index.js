export { default as http } from 'js/utils/http';

export function isEmpty(value) {
    return !value || value.trim() === '';
}

export function getFormData(form) {
    const fields = form.querySelectorAll('input');
    const data = Array.from(fields).reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {});

    return data;
}
