import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css";
import Header from "./components/Header";
import Index from "./pages";
import Register from "./pages/registerPage";
import Login from "./pages/loginPage";
import JobsPage from "./pages/jobsPage"
import SingleJobPage from "./pages/singleJobPage";
import UserPage from "./pages/userPage";
import Logout from "./pages/logoutPage";
import CreateJobPage from "./pages/createJobPage";
import EditJobPage from "./pages/editJobPage"

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" Component={Index}/>
                    <Route path="/index" Component={Index}/>
                    <Route path="/jobs" Component={JobsPage} />
                    <Route path="/login" Component={Login} />
                    <Route path="/logout" Component={Logout} />
                    <Route path="/register" Component={Register} />
                    <Route path="/jobs/:jobId" Component={SingleJobPage} />
                    <Route path="/users/:userId" Component={UserPage}/>
                    <Route path="/create" Component={CreateJobPage}/>
                    <Route path="/edit/:jobId" Component={EditJobPage}/>
                </Routes>
            </Router>
            
        </>
    )
}

export default App;
