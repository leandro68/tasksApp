import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from '../reducers/userReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    window.localStorage.removeItem('loggedTasksAppUser')
    dispatch(setUser(null))
    navigate('/') // Redirigir al usuario a login después de cerrar sesión
  }, [dispatch, navigate])

  return null
}

export default Logout