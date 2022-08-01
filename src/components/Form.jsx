import {useState} from 'react'
import Alert from './Alert.jsx';
import usePatients from '../hooks/usePatients.jsx';
import { useEffect } from 'react';

function Form() {
const [name, setName] = useState('');
const [propietario, setPropietario] = useState('');
const [email, setEmail] = useState('');
const [fecha, setFecha] = useState('');
const [sintomas, setSintomas] = useState('');
const [alert, setAlert] = useState({}); 
const [id, setId] = useState(null); 


const { savePatient, patient } = usePatients(); 

useEffect(() => {
    if(patient?.name){
        setName(patient.name)
        setPropietario(patient.propietario)
        setEmail(patient.email)
        setFecha(patient.fecha)
        setSintomas(patient.sintomas)
        setId(patient._id)
    }

}, [patient])

const handleSubmit = e => {
    e.preventDefault(); 

    if([name, propietario, email, fecha, sintomas].includes('')){
        setAlert({message: 'Todos los Campos son Obligatorios', error: true})
        return
    }
    savePatient({name, propietario, email, fecha, sintomas, id}); 
    setAlert({message: 'Guardado Correctamente'})
    setName('')
    setEmail('')
    setPropietario('')
    setSintomas('')
    setFecha('')
    setId(null)
    setTimeout(() => {
        setAlert({})
    }, 3000);
}//handleSubmit 

const {message} = alert; 
  return (
    <>
         <h2 className="font-black text-3xl text-center">Formulario para Añadir Pacientes</h2>
         <p className="text-xl mt-5 mb-10 text-center">
              Añade tus pacientes {''}
              <span className="text-indigo-600 font-bold"> y Administralos</span>
            </p>

         {message &&   <Alert alert = {alert}/> }

         <form onSubmit={handleSubmit} className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' >
                <div className='mb-5'>
                    <label htmlFor="mascota" className='text-gray-700 uppercase font-bold'>Nombre Mascota</label>
                    <input value={name} onChange={e=>setName(e.target.value)} className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="text" name="" id="mascota" placeholder='Nombre de la Mascota'/>
                </div>

                <div className='mb-5'>
                    <label htmlFor="propietario" className='text-gray-700 uppercase font-bold'>Nombre Propietario</label>
                    <input value={propietario} onChange={e=>setPropietario(e.target.value)} className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="text" name="" id="propietario" placeholder='Nombre del Propietario'/>
                </div>

                <div className='mb-5'>
                    <label htmlFor="email" className='text-gray-700 uppercase font-bold'>Email Propietario</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="email" name="" id="email" placeholder='Email del Propietario'/>
                </div>

                <div className='mb-5'>
                    <label htmlFor="fecha" className='text-gray-700 uppercase font-bold'>Fecha Alta</label>
                    <input value={fecha} onChange={e=>setFecha(e.target.value)} className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md' type="date" name="" id="fecha"/>
                </div>

                <div className='mb-5'>
                    <label htmlFor="sintomas" className='text-gray-700 uppercase font-bold'>Sintomas</label>
                   <textarea value={sintomas} onChange={e=>setSintomas(e.target.value)} name="" id="sintomas" placeholder='Describe los Sintomas' className='border-2 w-full p-2 mt-2 placeholderbg-gray-400 rounded-md'></textarea>
                </div>
                
                <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors rounded-md'/>
         </form>
    
    </>
  )
}

export default Form