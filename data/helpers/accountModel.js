const db = require('../dbConfig.js')

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

function get() {
    return db('accounts')
}

function getById(queryId) {
    return db('accounts')
        .where({ id: queryId })
}

function insert(queryBody) {
    return db('accounts')
        .insert(queryBody)
}

function update(queryId, queryBody) {
    return db('accounts')
        .where({ id: queryId })
        .update({
            name: queryBody.name,
            budget: queryBody.budget
        })
}

function remove(queryId) {
    return db('accounts')
        .where({ id: queryId })
        .del()
}