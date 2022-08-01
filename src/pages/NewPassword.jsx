
 import { useState, useEffect } from "react";
 import { useParams, Link } from "react-router-dom";
 import Alert from "../components/Alert.jsx";
import clientAxios from "../config/axios";

 const NewPassword = () => {
  const [password, setNewPassword] = useState(''); 
  const [password_confirm, setPasswordConfirm] = useState(''); 
  const [alert, setAlert] = useState({}); 
  const [tokenValid, setTokenValid] = useState(false); 
  const [PasswordChanged, setPasswordChanged] = useState(false); 

  const params = useParams(); 
  const {token} = params; 

  useEffect(() => {
      const checkToken = async () => {
        try {
          await clientAxios(`veterinarios/recover-password/${token}`); 
          setAlert({message: 'Ingresa tu Nuevo Password'});
          setTokenValid(true); 
        } catch (error) {
          setAlert({message: 'Hubo un Error con el Enlace', error: true})
        }
      }

     checkToken();

  }, [])

  const handleSubmit = async e =>{
    e.preventDefault();

    if(password !== password_confirm){
      setAlert({message: 'Passwords Diferentes', error: true})
      return 
    }
    if(password.length < 6 )
    {
      setAlert({message: 'EL password debe tener al menos 6 caracteres', error: true});
      return
    }

    try {

      const url = `veterinarios/recover-password/${token}`; 
      const { data } = await clientAxios.post(url, { password }); 
      setPasswordChanged(true)
      setAlert({message: data.msg}); 

    } catch (error) {
      setAlert({message: error.response.data.msg, error: tru});
    }

  }

  const {message} = alert; 
  return (
    <>
     <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Recupera tu Acceso y Administra 
            <span className="text-black"> tus Pacientes</span>
          </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-xl bg-white">
           {
              message &&   <Alert
              alert={alert}
              />
            }
              {tokenValid && (
                <>
                <form onSubmit={handleSubmit}>
                
                    <div className="my-5">
                      <label for="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                      <input type="password"
                              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                              name="password" id="password" placeholder="Tú Password" value={password} onChange={e=>setNewPassword(e.target.value)}/>
                    </div>

                    <div className="my-5">
                      <label for="password_confirm" className="uppercase text-gray-600 block text-xl font-bold">Confirma tu Nuevo Password</label>
                      <input type="password"
                              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                              name="password" id="password_confirm" placeholder="Confirma tú Password" value={password_confirm} onChange={e=>setPasswordConfirm(e.target.value)}/>
                    </div>

                    <input type="submit"
                            className="bg-indigo-600 w-full py-3 px-10  rounded-xl text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto hover:-translate-y-2"
                            value="Cambiar Password" />
                </form>
               {PasswordChanged && (
                 <Link to="/" className="block text-center my-5 text-gray-600 text-2xl font-bold border-b-4 hover:border-indigo-500 ">Inicia Sesión</Link>
               )}
                </>
          
              )}
   
           </div>
    </>
  )
}
export default NewPassword;
