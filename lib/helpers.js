'user strict'

const handlenbars = require('handlebars');

function registerHelper() {

    handlenbars.registerHelper('answerNumber', (answers) => {
        const keys = Object.keys(answers);
        return keys.length;
    })

    return handlenbars;
}

module.exports = registerHelper();


