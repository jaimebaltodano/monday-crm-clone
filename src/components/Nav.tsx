import { useNavigate } from 'react-router-dom';
import logo from '../images/Sin-titulo-1.png';
export interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="controls-container">
        <div className="icon" onClick={() => navigate('/ticket')}>
          +
        </div>
        <div className="icon" onClick={() => navigate('/')}>
          «
        </div>
      </div>
    </nav>
  );
};

export default Nav;
