import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

const ConfirmAccount = () => {
 
   const [accountConfirm, setAccountConfirm] = useState(false); 
   const [loadingData, setLoadingData] = useState(true); 
   const [alert, setAlert] = useState({}); 

   const params = useParams(); 
   const {token} = params; 

   useEffect(() => {
      const confirmAccount = async () => {
        try {

          const url = `veterinarios/confirm/${token}`; 
          const {data} = await clientAxios(url); 
          setAccountConfirm(true);
          setAlert({
            message: data.msg, 
          })
        
        } catch (error) {
          setAlert({
            message: error.response.data.msg,
            error: true
          })
        }
        setLoadingData(false)
      }

      confirmAccount();
   }, [])

    return (
      <>
          <div>
               <h1 className="text-indigo-600 font-black text-6xl">
                  Confirma tu Cuenta y Comienza a Administrar
                  <span className="text-black"> tus Pacientes</span>
                </h1>
           </div>
           <div className="mt-20 md:mt-5 shadow-2xl px-5 py-10 rounded-xl bg-white">

           {!loadingData && 
            <Alert
            alert = {alert}
            />
           }
           {accountConfirm &&
               <Link to="/" className="block text-center my-5 text-gray-400">Inicia Sesión </Link>
           }
           </div>
      </>
    )
  }
  
  export default ConfirmAccount; 