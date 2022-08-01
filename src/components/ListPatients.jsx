import usePatients from "../hooks/usePatients"
import Patient from "./Patient.jsx";

function ListPatients() {
  const {patients} = usePatients(); 
  
  return (
    <>
       {patients.length ? 
       (
        <>
            <h2 className="font-black text-3xl text-center">Listado de sus Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>

            {patients.map( patient => (
              <Patient 
                key={patient._id}
                patient = {patient}
              />
            ))}


        </>
       )
       :
       (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes Registrados</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold">y Se Mostraran Aquí </span>
            </p>
        </> 
       )
       }
    
    </>
  )
}

export default ListPatients