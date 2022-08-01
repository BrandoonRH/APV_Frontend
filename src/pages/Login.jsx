import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from '../components/Alert.jsx';
import clientAxios from "../config/axios";

export const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [alert, setAlert] = useState({}); 

  const { setAuth } = useAuth(); 

  const navigate = useNavigate(); 

  const handleSubmit = async e => {
    e.preventDefault(); 
    
    if([email, password].includes(''))
    {
      setAlert({message: 'Todos los Campos son Obligatorios', error: true}); 
      return
    }

    try {
      const {data} = await clientAxios.post('veterinarios/login', {email, password}); 
      localStorage.setItem('token', data.token); 
      setAuth(data)
      navigate('/admin'); 
    } catch (error) {
      setAlert({message: error.response.data.msg, error: true}); 

    }

  }
 
  const {message} = alert; 
  return (
        <>
           <div>
               <h1 className="text-indigo-600 font-black text-6xl">
                  Inicia Sesión y Administra tus 
                  <span className="text-black">Pacientes</span>
                </h1>
           </div>
           <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-xl bg-white">
           {
              message &&   <Alert
              alert={alert}
              />
            }
              <form action="" onSubmit={handleSubmit}>
                  <div className="my-5">
                    <label for="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="email" id="email" placeholder="Email de registro" value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>

                  <div className="my-5">
                    <label for="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="password" id="password" placeholder="Tú Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                  </div>
                  <input type="submit"
                         className="bg-indigo-600 w-full py-3 px-10  rounded-xl text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto hover:-translate-y-2"
                         value="Iniciar Sesión" />
              </form>

              <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/register" className="block text-center my-5 text-gray-400">¿No tienes Cuenta? Registrate </Link>
                <Link to="/recover-password" className="block text-center my-5 text-gray-400">¿Olvidaste tu Password?</Link>
              </nav>

           </div>

        </>
  )
}

export default Login; 
