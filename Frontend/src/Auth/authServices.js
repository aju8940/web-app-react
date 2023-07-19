import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})
const API = instance


// REGISTER USER 
const register = async (userData) => {
    console.log(userData);
    const response = await API.post('/api/user/signup', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// LOGIN USER

const login = async (userData) => {
    const response = await API.post('/api/user/login', userData)
    if (response.data.status) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}


// LOGOUT 
const logout = ()=>{
    localStorage.removeItem('user')
}



const authService = {
    register,
    logout,
    login,
}

export default authService