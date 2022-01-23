/**
 * Convert String to SLug
 * @param {String} string 
 * @returns {String}
 */
function stringToSlug(string) {
    let from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
    let to = "aaaaaeeeeeiiiiooooouuuunc------"

    let newText = string.split('').map(
        (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

    return newText
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-y-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

module.exports = {stringToSlug};