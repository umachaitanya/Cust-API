const express = require('express');
const router = express.Router()
const Customer = require('../models/customer')

// Get all customers
router.get('/', async (req, res) => {
    try {
  const customers = await Customer.find()
  res.json(customers)
    } catch (err) {
  res.status(500).json({message : err.message})
    }
})

// Get one customers
router.get('/:id',getCustomer, (req, res) => {
    res.send(res.customer)
})

// Create one customer
router.post('/', async (req, res) => {
    const customer = new Customer({ 
        name : req.body.name,
        role : req.body.role

    })
    try{
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one customer
router.put('/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
      res.customer.name = req.body.name
    }
  
    if (req.body.subscribedChannel != null) {
      res.customer.subscribedChannel = req.body.role
    }
    try {
      const updatedCustomer = await res.customer.save()
      res.json(updatedCustomer)
    } catch {
      res.status(400).json({ message: err.message })
    }
  
  })

// Delete one customer
router.delete('/:id', getCustomer, async(req, res) => {
    try {
        await res.customer.remove()
        res.json({ message: 'Deleted This Subscriber' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }
})

async function getCustomer(req, res, next) {
    try {
      customer = await Customer.findById(req.params.id)
      if (customer == null) {
        return res.status(404).json({ message: 'Cant find customer'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.customer = customer
    next()
  }

module.exports = router