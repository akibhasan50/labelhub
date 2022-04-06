import axios from 'axios';


export const UserService = {
  getUserInformation: () => {
        return axios.get(`https://jsonplaceholder.typicode.com/users`)
    }
}

