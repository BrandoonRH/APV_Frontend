import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alert from '../components/Alert.jsx';

function  ChangePassword() {
  const { saveNewPassword } = useAuth(); 
  const [alert, setAlert] = useState({}); 
  const [password, setPassword] = useState({ password: '', new_password: ''}); 

  const handleSubmit = async e => {

    e.preventDefault()
      if(Object.values(password).some(element => element === '')){
        setAlert({message: 'Todos los Campos son Obligatorios', error: true})
        return
      }
      if(password.new_password.length < 6 ){
        setAlert({message: 'El password Nuevo debe tener al menos 6 caracteres', error: true})
        return
      }
      
      const response = await saveNewPassword(password); 
      setAlert(response); 
  }

  const {message} = alert; 
  return (
    <>
      <AdminNav/>
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
          <span className="text-indigo-600 font-bold">Password Aquí</span>
      </p>
      <div className="flex justify-center">

          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

            {
                message &&   <Alert
                alert={alert}
                />
              }
              <form onSubmit={handleSubmit}>

                  <div className="my-3">
                      <label htmlFor="password" className="uppercase font-bold text-gray-600">Password Actual:</label>
                      <input type="password" name="password" id="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Password Actual"                    
                       onChange={ e => setPassword({
                         ...password,
                         [e.target.name] : e.target.value
                       })}
                      />
                  </div>

                  <div className="my-3">
                      <label htmlFor="new_password" className="uppercase font-bold text-gray-600">Nuevo Password:</label>
                      <input type="password" name="new_password" id="new_password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Nuevo Password" 
                       onChange={ e => setPassword({
                         ...password,
                         [e.target.name] : e.target.value
                       })}
                      />
                  </div>

                  <input type="submit" value="Guardar Cambios" className="bg-indigo-400 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-700 cursor-pointer "/>

              </form>

            </div>

      </div>
    </>
  )
}

export default  ChangePassword