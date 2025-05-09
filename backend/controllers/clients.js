const clientsRouter = require('express').Router()
const Client = require('../models/client')

clientsRouter.get('/', async (request, response) => {
  const clients = await Client.find({})
  response.json(clients)
})

clientsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const client = new Client({
    name: body.name,
    subscriber: body.subscriber
  })  

  const savedClient = await client.save()

  response.status(201).json(savedClient)
})


clientsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const client = {
    name: body.name,
    subscriber: body.subscriber
  }

  const updatedClient = await Client.findByIdAndUpdate(request.params.id, client, { new: true, runValidators: true })
  response.json(updatedClient)
})

module.exports = clientsRouter