import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import TicketPage from './pages/TicketPage';
import Nav from './components/Nav';
import { IStore } from './store';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const categories = useSelector((state: IStore) => state.categories);
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/ticket/:id" element={<TicketPage editMode={true} categories={categories} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Application;
