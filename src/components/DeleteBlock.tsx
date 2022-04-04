import useHttp from '../hooks/use-http';
import { useNavigate } from 'react-router-dom';

export interface IDeleteBlockProps {
  id: string;
}

const DeleteBlock: React.FunctionComponent<IDeleteBlockProps> = ({ id }: IDeleteBlockProps) => {
  const { isLoading, error, sendRequest } = useHttp();

  const navigate = useNavigate();

  const transforTask = () => {
    navigate(0);
  };
  const handleDeleteTicket = async (id: string) => {
    sendRequest(
      {
        url: `https://monday-crm-clone-default-rtdb.firebaseio.com/tickets/${id}.json`,
        method: 'DELETE',
        body: '',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      transforTask
    );
  };

  return (
    <div className="delete-block">
      <div className="delete-icon" onClick={() => handleDeleteTicket(id)}>
        x
      </div>
    </div>
  );
};

export default DeleteBlock;
