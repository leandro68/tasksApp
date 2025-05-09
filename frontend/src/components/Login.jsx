import loginService from '../services/login'
const Login = ({username, password, setUsername, setPassword, setUser, setMessage}) => {
    
    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const userLogged = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedTasksAppUser', JSON.stringify(userLogged)
          ) 
          setUser(userLogged)
          setUsername('')
          setPassword('')
          
          setMessage(`${userLogged.name} logged in`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        } catch (exception) {
          setMessage('Wrong credentials')
          console.log(exception)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
    }
    
    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <br/>
                <button className="outOfMenuButton" type="submit">login</button>
            </form>
            <hr/>
        </>
    )
}

export default Login