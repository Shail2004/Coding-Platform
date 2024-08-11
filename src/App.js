import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Header from './Components/Header'
import Login from './Components/Login';
import Signup from './Components/Signup';

import  { useState } from 'react';
import CreateProblem from './Components/CreateProblem';

import Playground from './Components/Playground';
import ProblemTable from './Components/ProblemTable';
import CodingArena from './Components/CodingArena';
// import { useMenuState } from '@chakra-ui/react/dist';

const App = () => {

  const [problems, setProblems] = useState([
  ]);
  
  const addProblem = (problem) => {
    setProblems([...problems, problem]);
  };


  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/problems' element={<ProblemTable/>}/>
        <Route path='/playground' element={<Playground/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        <Route path="/create-problem" element={<CreateProblem addProblem={addProblem} />} />   
        <Route path="/problem/CodingArena" element = {<CodingArena />}></Route>
      </Routes>
    </Router>
  )
}

export default App