const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ error: 'error getting accounts' })
    })
})

server.get('/:id', (req, res) => {
  const { id } = req.params
  db.select('*').from('accounts').where({ id }).first()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json({ error: 'error getting account by id' })
    })
})

server.post('/', (req, res) => {
  const newAccount = req.body
  db('accounts').insert(newAccount, 'id')
    .then(ids => {
      const [id] = ids;
      return db('accounts').select('id', 'name', 'budget').where({ id }).first()
        .then(account => {
          res.status(201).json(account)
        })
        .catch(err => {
          res.status(500).json({ error: 'error creating account' })
        })
    })
})

server.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  db('accounts').where({ id }).update(changes)
    .then(updated => {
      res.status(200).json(`${updated} updated`)
    })
    .catch(err => {
      res.status(500).json({ error: 'error updating account' })
    })
})

server.delete('/:id', (req, res) => {
  const id = req.params
  db('accounts')
    .where(id)
    .del()
    .then(account => {
      res.status(200).json({
        message: `${account} deleted.`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error deleting the account.'
    });
  });
})

module.exports = server;