import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "../pages/MainPage";
import RedirectPage from "../pages/RedirectPage";
import ErrorPage from "../pages/ErrorPage";
import Navbar from "../components/Navbar";
import AllUrlsPage from "../pages/AllUrlsPage";
import Github from "../components/Github";

export default () => (
    <div style={{overflowX: "hidden"}}>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/all" element={<AllUrlsPage />}  />
                <Route path="/404" element={<ErrorPage/>}/>
                <Route path="/:shortId" element={<RedirectPage/>}/>
            </Routes>
            <Github />
        </Router>
    </div>
);
