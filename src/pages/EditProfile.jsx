import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth.jsx"
import Alert from '../components/Alert.jsx';

function EditProfile() {
  const [profile, setProfile] = useState({})
  const [alert, setAlert] = useState({}); 
  const {auth, updateProfile} = useAuth()

  useEffect(() => {
     setProfile(auth)      
  }, [auth])
  
  const handleSubmit = async e => {
    e.preventDefault()
    const {name, email} = profile; 

    if([name, email].includes('')){
      setAlert({message: 'Nombre y Email son Obligatorios', error: true})
      return
    }

    const result = await updateProfile(profile)
    setAlert(result); 

  }
  const {message} = alert; 

  return (
    <>
      <AdminNav/>
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
          <span className="text-indigo-600 font-bold">Información Aquí</span>
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
                    <label htmlFor="name" className="uppercase font-bold text-gray-600">Nombre:</label>
                    <input type="text" name="name" id="name" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Nuevo Nombre"
                    value={profile.name || ''}
                    onChange={ e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                    })}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio WEB:</label>
                    <input type="text" name="web" id="web" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Sitio WEB"
                     value={profile.web || ''}
                     onChange={ e => setProfile({
                       ...profile,
                       [e.target.name] : e.target.value
                     })}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono:</label>
                    <input type="tel" name="telefono" id="telefono" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Télefono" 
                     value={profile.telefono || ''}
                     onChange={ e => setProfile({
                       ...profile,
                       [e.target.name] : e.target.value
                     })}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="email" className="uppercase font-bold text-gray-600">Teléfono:</label>
                    <input type="email" name="email" id="email" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" placeholder="Tú Nuevo Email" 
                     value={profile.email || ''}
                     onChange={ e => setProfile({
                       ...profile,
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

export default EditProfile