const clientsRouter = require('express').Router()
const Client = require('../models/client')
const User = require('../models/user')

clientsRouter.get('/', async (request, response) => {
  const clients = await Client.find({})
  response.json(clients)
})

clientsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const client = new Client({
    name: body.name,
    subscriber: body.subscriber,
    user: user.id
  })  

  const savedClient = await client.save()

  //actualiza en el usuario la lista de clientes creados por el usuario
  user.clients = user.clients.concat(savedClient._id)
  await user.save()
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