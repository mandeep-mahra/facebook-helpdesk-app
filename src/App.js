import { Routes, Route } from 'react-router-dom';
import Signin from './Pages/signin';
import Signup from './Pages/signup';
import Home from './Pages/home';
import PageOptions from './Pages/PageOptions';
import Integration from './Pages/integration';
import AgentPage from './Pages/agentPage'

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pageOptions" element={<PageOptions />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/agentPage" element={<AgentPage />} />
       </Routes>
    </>
    //<UploadPost />
 );
};

export default App;