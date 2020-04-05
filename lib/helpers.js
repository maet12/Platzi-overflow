'user strict'

const handlenbars = require('handlebars');

function registerHelper() {

    handlenbars.registerHelper('answerNumber', (answers) => {
        const keys = Object.keys(answers);
        return keys.length;
    })

    handlenbars.registerHelper('ifEquals', (a, b, options) => {
        if(a === b){
            return options.fn(this);
        }
        return options.inverse(this)
    })

    return handlenbars;
}

module.exports = registerHelper();


