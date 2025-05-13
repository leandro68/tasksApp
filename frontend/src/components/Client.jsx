import {useState} from 'react'
import clientService from '../services/clients'
import { setMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'

const Client = ({clients, setclientlist}) => {
    const [clientName, setClientName] = useState('')
    const [subscriber, setSubscriber] = useState('')

    const dispatch = useDispatch()
    
    const handleSubscriber = (event) => {
        setSubscriber(event.target.value);
        //console.log('value', event.target.value);
    }

    const handleSaveClient = async (event) => {
        event.preventDefault()
        
        const clientObject = {
              name: clientName,
              subscriber: subscriber,
        }
        //console.log('clientObject:',clientObject)
                 
        try {
            const returnedClient = await clientService.create(clientObject);
            setclientlist(clients.concat(returnedClient.name));
            setClientName('');
            dispatch(setMessage(`${returnedClient.name} added`))
    
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000);
        } catch (exception) {
            dispatch(setMessage('Error al agregar el cliente'))
            console.error(exception);
    
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000);
        }
    }
    
    
    
    return (
        <div>
           <h2>New client</h2>
            <form onSubmit={handleSaveClient}>
                <div>
                    <label>name: </label>
                    <input type="text" 
                           placeholder="nombre del cliente"
                           onChange={({ target }) => setClientName(target.value)}/>
                </div>
                <div>
                    <p>Subscriber:</p>
                    <input type="radio" id="opcionSI" name="grupo" value="true" onClick={handleSubscriber} />
                    <label htmlFor="opcionSI">SI</label>

                    <input type="radio" id="opcionNO" name="grupo" value="false" onClick={handleSubscriber}/>
                    <label htmlFor="opcionNO">NO</label>
                </div>
                <button className="outOfMenuButton" type="submit">save</button>
            </form>  
            <hr/>
        </div>
        
    )
}

export default Client