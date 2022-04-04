import { TicketObj } from '../types/ticket';
import blankAvatar from '../images/blank-avatar.png';

export interface IAvatarDisplayProps {
  ticket: TicketObj;
}

const AvatarDisplay: React.FunctionComponent<IAvatarDisplayProps> = ({ ticket }: IAvatarDisplayProps) => {
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img src={ticket.avatar ? ticket.avatar : blankAvatar} alt={`Avatar of ${ticket.owner}`} />
      </div>
    </div>
  );
};

export default AvatarDisplay;
