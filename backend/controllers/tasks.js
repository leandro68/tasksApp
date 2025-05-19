const tasksRouter = require('express').Router()
const Task = require('../models/task')
const User = require('../models/user')
const Client = require('../models/client')
const jwt = require('jsonwebtoken')

//devuelve la lista completa de tareas
tasksRouter.get('/', async (request, response) => {
  
  const tasks = await Task.find({}).populate('user', { name: 1}).populate('client', { name: 1, subscriber: 1 })
  response.json(tasks)
})

//crea una tarea nueva
tasksRouter.post('/', async (request, response) => {
  const body = request.body
  const client = await Client.findById(body.clientId)
  console.log('body',body)
  console.log('request.user.id',request.user.id)
  
  const task = new Task({
    inputDate: body.inputDate,
    user: request.user.id,
    client: client.id,
    category: body.category, 
    goTrip: body.goTrip,
    startWork: body.startWork,
    endWork: body.endWork,
    backTrip: body.backTrip,
    order: body.order, 
    report: body.report,
    state: body.state
  })  

  const savedTask = await task.save()
  response.status(201).json(savedTask)
})

//elimina una tarea
tasksRouter.delete('/:id', async (request, response) => {
  
  await Task.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

//modifica los datos de una tarea
tasksRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const task = {
    inputDate: body.inputDate,
    user: user.id,
    client: body.clientId,
    category: body.category, 
    goTrip: body.goTrip,
    startWork: body.startWork,
    endWork: body.endWork,
    backTrip: body.backTrip,
    order: body.order, 
    report: body.report,
    state: body.state
  }

  const updatedTask = await Task.findByIdAndUpdate(request.params.id, task, { new: true, runValidators: true })
  response.json(updatedTask)
})

//endpoint para buscar tareas segun el state requerido
tasksRouter.get('/state/:state', async (request, response) => {
  const { state } = request.params; // Obtener el estado desde los parámetros de la URL

  // Validar que el estado es uno de los valores permitidos
  if (!['WAITING', 'STARTED', 'FINISHED'].includes(state)) {
    return response.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const tasks = await Task.find({ state })
      .populate('user', { name: 1 })
      .populate('client', { name: 1, subscriber: 1 });

    response.json(tasks);
  } catch (error) {
    response.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

module.exports = tasksRouter