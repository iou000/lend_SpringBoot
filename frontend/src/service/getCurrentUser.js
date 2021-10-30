import axios from 'axios';


export function getCurrentUser() {
    
    return axios({
        method: 'get',
        url: '/api/user',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
    })
} 