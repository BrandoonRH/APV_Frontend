import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const PatientsContext = createContext(); 

 const PatientsProvider = ({children}) => {

   const [patients, setPatients] = useState([]); 
   const [patient, setPatient]= useState({}); 

   useEffect(() => {
          const getPatients = async () => {
            try {
            const token = localStorage.getItem('token'); 
            const config = {
                  headers: {
                     "Content-Type": "application/json", 
                     Authorization: `Bearer ${token}`
                  }
               }
               const {data} = await clientAxios('pacientes', config)
               setPatients(data)
            } catch (error) {
               console.log(error)
            }
          }
          getPatients(); 
   }, [])

   const savePatient = async (patient) => {
      const token = localStorage.getItem('token'); 
      const config = {
         headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
         }
      }
      if(patient.id){
         //Edit new Rgister 
         try {

            const {data} = await clientAxios.put(`pacientes/${patient.id}`, patient, config)
            const patientUpdate = patients.map( patientState => patientState._id === data._id ? data : patientState)
            setPatients(patientUpdate)

         } catch (error) {
            console.log(error)
         }
      }else{
         //Save New Register 
         try {

            const {data} = await clientAxios.post('pacientes', patient, config); 
            const {createdAt, updatedAt, __v, ...patientSave} = data
            setPatients([patientSave, ...patients]); 

           } catch (error) {
            console.log(error.response.data.msg); 
           }
      }
   }//savePatient

   const setEdit = async (patient) => {
      setPatient(patient); 
   }

   const deletePatient = async id => {
      const confirmDelete = confirm('¿Deseas Eliminar el Paciente?'); 
      if(confirmDelete){
         try {
            const token = localStorage.getItem('token'); 
            const config = {
               headers: {
                  "Content-Type": "application/json", 
                  Authorization: `Bearer ${token}`
               }
             }
             const {data} = await clientAxios.delete(`pacientes/${id}`, config)
             const patientsUpdate = patients.filter(patientsState => patientsState._id !== id)
             setPatients(patientsUpdate); 
         } catch (error) {
            console.log(error)
         }
      }
   }

   return (
      <PatientsContext.Provider
         value = {{ patients, savePatient, setEdit, patient, deletePatient }}
      >
        {children}

      </PatientsContext.Provider>
   )
}

export {
   PatientsProvider
}

export default PatientsContext; 
