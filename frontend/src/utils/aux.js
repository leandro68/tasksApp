import taskService from '../services/tasks';
import clientService from '../services/clients';


export const isTokenExpired = (exp) => {
    if (!exp) return true; // Si no hay fecha de expiración, mejor considerar que está vencido
    const currentTime = Math.floor(Date.now() / 1000); // Convertir a formato UNIX
    return exp < currentTime;
}

export const fetchClientsData = (user, setClientList) => {
  if (user === null || isTokenExpired(user.exp)) {
    return}
    taskService.setToken(user.token);
    clientService.setToken(user.token);
    clientService.getAll().then(clients => setClientList(clients));
  
};

export const fetchWaitingTasksData = (user, setWaitingTasks, setStartedTasks, setClientList) => {
  if (user !== null && !isTokenExpired(user.exp)) {
    taskService.setToken(user.token);
    
    taskService.getByState({ state: 'WAITING' }).then(tasks => setWaitingTasks(tasks));
  }
};

export const fetchStartedTasksData = (user,setStartedTasks) => {
  if (user !== null && !isTokenExpired(user.exp)) {
    taskService.setToken(user.token);
    
    taskService.getByState({ state: 'STARTED' }).then(tasks => setStartedTasks(tasks));
  }
};





