
import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
      <h1>APV - Administrador de Pacientes</h1>
      <main className='container mx-auto md:grid grid-cols-2 mt-10 gap-10 p-5 items-center'>
      <Outlet/>
      </main>
    </>
  )
}

export default AuthLayout