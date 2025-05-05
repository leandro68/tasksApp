const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', async (request, response) => {
  const tasks = await Task.find({}).populate('client', { name: 1 })
  response.json(tasks)
})

tasksRouter.post('/', async (request, response) => {
  const body = request.body

  const task = new Task({
    client: body.clientId,
    category: body.category, 
    goTrip: body.goTrip,
    startWork: body.startWork,
    endWork: body.endWork,
    backTrip: body.backTrip,
    order: body.order, 
    report: body.report,
    transport: body.transport,
    tripCost: body.tripCost
  })  

  const savedTask = await task.save()
  response.status(201).json(savedTask)
})

tasksRouter.delete('/:id', async (request, response) => {
  await Task.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

tasksRouter.put('/:id', async (request, response) => {
  const body = request.body

  const task = {
    client: body.clientId,
    category: body.category, 
    goTrip: body.goTrip,
    startWork: body.startWork,
    endWork: body.endWork,
    backTrip: body.backTrip,
    order: body.order, 
    report: body.report,
    transport: body.transport,
    tripCost: body.tripCost
  }

  const updatedTask = await Task.findByIdAndUpdate(request.params.id, task, { new: true, runValidators: true })
  response.json(updatedTask)
})

module.exports = tasksRouter