import AvatarDisplay from './AvatarDisplay';
import StatusDisplay from './StatusDisplay';
import PriorityDisplay from './PriorityDisplay';
import ProgressDisplay from './ProgressDisplay';
import DeleteBlock from './DeleteBlock';
import { Link } from 'react-router-dom';
import { TicketObj } from '../types/ticket';

export interface ITicketCardProps {
  id: number;
  color: string;
  ticket: TicketObj;
}

const TicketCard: React.FunctionComponent<ITicketCardProps> = ({ color, ticket }: ITicketCardProps) => {
  return (
    <div className="ticket-card">
      <Link to={`/ticket/${ticket.documentid}`} id="link">
        <div className="ticket-color" style={{ backgroundColor: color }}></div>
        <h3>{ticket.title} </h3>
        <AvatarDisplay ticket={ticket} />
        <StatusDisplay status={ticket.status} />
        <PriorityDisplay priority={ticket.priority} />
        <ProgressDisplay progress={ticket.progress} />
      </Link>
      <DeleteBlock id={ticket.documentid} />
    </div>
  );
};

export default TicketCard;
