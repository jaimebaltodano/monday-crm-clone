export type TicketObj = {
  category: string;
  color: string;
  title: string;
  documentid: string;
  owner: string;
  avatar: string;
  priority: number;
  description: string;
  status: string;
  progress: number;
  timestamp: string;
};

export type InputTicket = {
  avatar: string;
  category: string;
  description: string;
  id: string | null;
  status: string;
  owner: string;
  priority: number;
  progress: number;
  timestamp: string;
  title: string;
};
