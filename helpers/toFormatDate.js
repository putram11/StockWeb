function formatDate(value) {
    if (!value || !(value instanceof Date)) {
        throw new Error('Invalid date value');
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return value.toLocaleDateString('en', options);
}

module.exports = { formatDate };
