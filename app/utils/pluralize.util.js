/**
 * Set a word to plural
 * @param {String} word 
 * @returns
 */
function pluralize(word){
    let value = word[word.length - 1] === 'y' ? word.slice(0, -1) + 'ies' : word + 's';
    return value;
}

module.exports = {pluralize};