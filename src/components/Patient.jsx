import usePatients from "../hooks/usePatients";

function Patient({patient}) {

  const {setEdit, deletePatient } = usePatients(); 

  const {email, fecha, name, propietario, sintomas, _id} = patient;
  const formatDate = (fecha) => {
     const newDate = new Date(fecha); 
     return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(newDate);
  }
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-5">Nombre: {" "}
            <span className="font-normal normal-case text-black">{name}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-5">Propietario: {" "}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-5">Email Propietario: {" "}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-5">Fecha: {" "}
            <span className="font-normal normal-case text-black">{formatDate(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-5">Sintomas de {name}: {" "}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>
        <div className="flex justify-between my-5">
            <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg" onClick={() => setEdit(patient)}>
             Editar
            </button>
            <button className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg" onClick={() => deletePatient(_id)}>
             Eliminar
            </button>

        </div>
    </div>
  )
}

export default Patient