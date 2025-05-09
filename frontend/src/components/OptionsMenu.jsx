const OptionsMenu = ({setuser, setmessage}) => {
    
    const handleLogout = () => {
        window.localStorage.removeItem('loggedTasksAppUser')
        setmessage('User logout successfully')
        setuser(null)
        setTimeout(() => {
            setmessage(null)
        }, 5000)
    }

    return (
        <div>
            <button className="menuButton" onClick={handleLogout}>Logout</button>
            <button className="menuButton" onClick={handleLogout}>New Task</button>
            <button className="menuButton" onClick={handleLogout}>New Client</button>
            <hr/>
        </div>
        
    )
}

export default OptionsMenu