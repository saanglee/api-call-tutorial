import Tutorial from '../components/Tutorial';
import TutorialsList from '../components/TutorialList';
import AddTutorial from '../components/AddTutorial';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<TutorialsList />} />
          <Route path='/tutorials' element={<TutorialsList />} />
          <Route path='/add' element={<AddTutorial />} />
          <Route path='/tutorials/:id' element={<Tutorial />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
