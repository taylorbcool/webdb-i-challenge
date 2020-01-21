const express = require('express')

const Accounts = require('../data/helpers/accountModel.js')

const router = express.Router()

router.get('/', (req, res) => {
    Accounts.get()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'error retrieving accounts.' })
        })
})

router.get('/:id', (req, res) => {
  Accounts.get()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err => {
      res.status(500).json({ error: 'error retrieving account' })
    })
})

router.post('/', (req, res) => {
    Accounts.insert(req.body)
        .then(acc => {
            res.status(201).json(acc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'error adding account.' })
        })
})

router.put('/:id', (req, res) => {
    Accounts.update(req.params.id, req.body)
        .then(acc => {
            res.status(201).json(acc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'error updating account.' })
        })
})

router.delete('/:id', (req, res) => {
    Accounts.remove(req.params.id)
        .then(deleted => {
            res.status(202).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'error removing account.' })
        })
})

module.exports = router