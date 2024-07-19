import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TabContext from './hooks/useContext/TabContext'
import MainTabContext from './hooks/useContext/MainTabContext.jsx'
import AuthContext from './hooks/useContext/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <AuthContext>
            <TabContext>
                <MainTabContext>
                    <App />
                </MainTabContext>
            </TabContext>
        </AuthContext>
    </Router>

)
