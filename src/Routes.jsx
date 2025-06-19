import Home from './pages/Home'
import { BrowserRouter as Router } from 'react-router-dom'
const AppRoutes = () => {
    return (
        <Router>
             <Routes>
                <Route Path="/" element={<Home/>}></Route>
             </Routes>

        </Router>
    )
}