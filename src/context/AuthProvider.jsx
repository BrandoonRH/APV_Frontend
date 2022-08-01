import { useState, useEffect, createContext } from "react";
import {  Navigate } from 'react-router-dom';
import clientAxios from "../config/axios";

const AuthContext = createContext(); 

const AuthProvider = ({children}) => {
const [loading, setLoading ] = useState(true); 
const [auth, setAuth] = useState({}); 

useEffect(() => {
    const authUser = async () => {
    const token = localStorage.getItem('token'); 
    if(!token){
        setLoading(false)
        return
    } 
    const config = {
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const {data} = await clientAxios('veterinarios/profile', config); 
        setAuth(data)
    } catch (error) {
        //console.log(error.response.data.msg)
        setAuth({}); 
    }
        setLoading(false); 
    }
    authUser(); 
}, [])

const closeSession = () => {
    localStorage.removeItem('token'); 
    setAuth({}); 
    <Navigate to = "/"/>
}

const updateProfile = async datosProfile => {
    const token = localStorage.getItem('token'); 
    if(!token){
        setLoading(false)
        return
    } 
    const config = {
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }
    }

    try {
            const url = `veterinarios/profile/${datosProfile._id}`; 
            const {data} = await clientAxios.put(url, datosProfile, config ); 
            setAuth(data)
            return {
                message: 'Actualizado Correctamente'
            }
    } catch (error) {
       return{
        message: error.response.data.msg,
        error: true
       }
    }
}

const saveNewPassword = async (passwords) => {

    const token = localStorage.getItem('token'); 
    if(!token){
        setLoading(false)
        return
    } 
    const config = {
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const url = 'veterinarios/profile/updatepassword'; 
        const {data} = await clientAxios.put(url, passwords, config); 
       
        return {
            message: data.msg
        }
        
    } catch (error) {
        return {
            message: error.response.data.msg,
            error: true
        }
    }
    
}
    
return(
    <AuthContext.Provider 
    value={{auth, setAuth, loading, closeSession, updateProfile, saveNewPassword }}
    >
        {children}
    </AuthContext.Provider>
)
}

export {
    AuthProvider
}

export default AuthContext