
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import NewPassword from './pages/NewPassword';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ ChangePassword';

import ManagePatients from './pages/ManagePatients';

import {AuthProvider} from './context/AuthProvider.jsx'
import {PatientsProvider} from './context/PatientsProvider.jsx'

function App() { 

  return (
   <BrowserRouter>
    <AuthProvider>
      <PatientsProvider>
        <Routes>

              <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Login />}/>
                  <Route path='register' element={<Register />}/>
                  <Route path='recover-password' element={<RecoverPassword />}/>
                  <Route path='recover-password/:token' element={<NewPassword />}/>
                  <Route path='confirm-account/:token' element={<ConfirmAccount />}/>
              </Route>

              <Route  path='/admin' element={<ProtectedRoute />}>
                      <Route index element={<ManagePatients />}/>
                      <Route path="profile" element={<EditProfile/>} />
                      <Route path="change-password" element={<ChangePassword/>} />
              </Route>

        </Routes>
      </PatientsProvider>
    </AuthProvider>
     
   </BrowserRouter>
  )
}

export default App
