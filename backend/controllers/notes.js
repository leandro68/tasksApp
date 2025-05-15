const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  
  const note = new Note({
    content: body.content,
    important: body.important
  })  

  const savedNote = await note.save()

  response.status(201).json(savedNote)
})


module.exports = notesRouter
