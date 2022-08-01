import {useState} from 'react';
import { Link } from "react-router-dom";
import Alert from '../components/Alert.jsx';
import clientAxios from '../config/axios.jsx';

export const Register = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [telefono, setTelefono] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [password_confirm, setPasswordConfirm] = useState(''); 
  const [alert, setAlert] = useState({}); 

  const handleSubmit = async e => {
      e.preventDefault(); 
      
      if([name, email, password, password_confirm].includes(''))
      {
          setAlert({message: 'Campos Vacios', error: true})
          return
      }

      if(password !== password_confirm){
        setAlert({message: 'Passwords Diferentes', error: true})
        return 
      }

      if(password.length < 6 )
      {
        setAlert({message: 'EL password debe tener al menos 6 caracteres', error: true})
        return
      }
      setAlert({})

     //Registrar al Usuario en la API 
     try {
      const url = `veterinarios/register`;
      await clientAxios.post(url, {name, email, telefono, password});
      setAlert({message: 'Cuenta Creada, Revisa tu Email', error: false})
     } catch (error) {
       setAlert({
        message: error.response.data.msg,
        error: true
       })
     }

  }
  const {message} = alert; 
    return (
      <>
          <div>
               <h1 className="text-indigo-600 font-black text-6xl">
                  Crea tu Cuenta y Administra 
                  <span className="text-black"> tus Pacientes</span>
                </h1>
           </div>
           <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-xl bg-white">
            {
              message &&   <Alert
              alert={alert}
              />
            }
              <form  onSubmit={handleSubmit}>
              <div className="my-5">
                    <label for="name" className="uppercase text-gray-600 block text-xl font-bold">Nombre:</label>
                    <input type="text"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="name" id="name" placeholder="Tú Nombre" value={name} onChange={e=>setName(e.target.value)}/>
                  </div>

                  <div className="my-5">
                    <label for="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="email" id="email" placeholder="Tú Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>
                  <div className="my-5">
                    <label for="phone" className="uppercase text-gray-600 block text-xl font-bold">Télefono</label>
                    <input type="tel"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="telefono" id="phone" placeholder="Tú Télefono" value={telefono} onChange={e=>setTelefono(e.target.value)}/>
                  </div>

                  <div className="my-5">
                    <label for="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="password" id="password" placeholder="Tú Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                  </div>

                  <div className="my-5">
                    <label for="password_confirm" className="uppercase text-gray-600 block text-xl font-bold">Confirma tu Password</label>
                    <input type="password"
                           className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                           name="password" id="password_confirm" placeholder="Confirma tú Password" value={password_confirm} onChange={e=>setPasswordConfirm(e.target.value)}/>
                  </div>

                  <input type="submit"
                         className="bg-indigo-600 w-full py-3 px-10  rounded-xl text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto hover:-translate-y-2"
                         value="Crear Cuenta" />
              </form>

              <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/" className="block text-center my-5 text-gray-400">¿Ya tienes Cuenta? Inicia Sesión </Link>
                <Link to="/recover-password" className="block text-center my-5 text-gray-400">¿Olvidaste tu Password?</Link>
              </nav>

           </div>
           
      </>
    )
  }
  
  export default Register; 