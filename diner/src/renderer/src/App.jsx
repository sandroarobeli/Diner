import { Routes, Route } from 'react-router-dom'

import Login from './pages/general/Login'
import Tables from './pages/general/Tables'

// NEXT:

// 2' ALSO MAKE SURE MODAL PROCESS OR LOGIN DONT TRIGGER SPLASH MESSAGE
// 3 SEE IF I CAN EXTRACT CONTROLLERS INTO SEPARATE FILES. START ONE BY ONE
// 4 CHECK CREATED AT FUNCTIONALITY (DATE-TIME CLASS)

const App = () => {
  return (
    <Routes>
      <Route path="" exact element={<Login />} />
      <Route path="tables" exact element={<Tables />} />
      {/*<Route path="admin/dashboard" exact element={<AdminDashboard />} />*/}
    </Routes>
  )
}

export default App
