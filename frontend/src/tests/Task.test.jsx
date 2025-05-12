import { render, screen } from '@testing-library/react'
import Task from '../components/Task'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const task = {
    inputDate: '2025-05-05T09:51:00.000Z',
    order: 'Component testing is done with react-testing-library',
    client: {name:'LANCENTER'},
    state: 'WAITING'
  }

  render(<Task task={task} />)
  

  const element1 = screen.getByText('05/05/25 - LANCENTER')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('Component testing is done with react-testing-library')
  expect(element2).toBeDefined()
  //screen.debug(element2)
})

test('renders content', () => {
  const task = {
    inputDate: '2025-05-05T09:51:00.000Z',
    order: 'Component testing is done with react-testing-library',
    client: {name:'LANCENTER'},
    state: 'STARTED'
  }

  render(<Task task={task} />)
  //screen.debug()

  const element1 = screen.getByText('05/05/25 - LANCENTER')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('Component testing is done with react-testing-library')
  expect(element2).toBeDefined()
})



