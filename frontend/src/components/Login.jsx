const Login = ({username, password, handleLogin, setUsername, setPassword}) => {
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