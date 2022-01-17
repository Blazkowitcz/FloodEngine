/**
 * Remove special char like long dash
 * @param {String} name 
 * @returns 
 */
 function formatName(name){
    name = name.replace(/\u2013|\u2014/g, "-");
    return name;
}

module.exports = {formatName};