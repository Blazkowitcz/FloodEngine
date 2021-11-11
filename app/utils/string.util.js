/**
 * Return option value
 * @param {JSON} options 
 * @param {String} key 
 * @returns 
 */
function getOptionValue(options, key) {
    try {
        JSON.parse(JSON.stringify(options));
        if(options[key] !== undefined){
            return options[key];
        }
        return undefined
    } catch (e) {
        return undefined;
    }
}

/**
 * Add options in SQL Query
 * @param {JSON} options 
 * @param {String} query 
 * @returns 
 */
function setQueryOptions(options, query){
    if(options !== undefined){
        if(options.order !== undefined){
            query += " ORDER BY " + options.order.column + " " + options.order.direction; 
        }
        if(options.limit !== undefined){
            query += " LIMIT " + options.limit;
        }
    }
    return query;
}

/**
 * Set query with multiple where
 * @param {JSON} options 
 * @param {String} query 
 * @returns 
 */
function setMultipleWhere(options, query){
    if(Object.keys(options).length > 1){
        query = query.replace('?', '');
        Object.keys(options).forEach(function(k, v){
            query = query + `${k} = "${options[k]}" `;
            if(v + 1 < Object.keys(options).length){
                query = query + "AND ";
            }
        });
    }
    return query;
}

module.exports = {getOptionValue, setQueryOptions, setMultipleWhere};