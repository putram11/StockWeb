function formatDate(value){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
    return value.toLocaleDateString(`en`, options)
}

module.exports = {formatDate}