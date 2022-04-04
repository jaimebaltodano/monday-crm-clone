import { useEffect, useState } from 'react';
import TicketCard from '../components/TicketCard';
import useHttp from '../hooks/use-http';
import { useSelector, useDispatch } from 'react-redux';
import { TicketObj } from '../types/ticket';
import { IStore } from '../store';

export interface IDashboardProps {}

type ResponseObj = { [name: string]: TicketObj };

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [tickets, setTickets] = useState<Array<TicketObj>>([]);
  const categories: string[] = useSelector((state: IStore) => state.categories);

  const dispatch = useDispatch();

  const transforTask = (tickets: ResponseObj) => {
    const arrayOfKeys = Object.keys(tickets);
    const arrayOfData = Object.keys(tickets).map((key) => tickets[key]);
    const formattedData: Array<TicketObj> = [];

    arrayOfKeys.forEach((key, _i) => {
      const formatted = { ...arrayOfData[_i] };
      formatted['documentid'] = key;
      formattedData.push(formatted);
    });

    const uniqueCategories = new Set(formattedData?.map(({ category }) => category));

    setTickets(formattedData);
    dispatch({ type: 'addCategories', categories: Array.from(uniqueCategories) });
  };

  useEffect(() => {
    sendRequest(
      {
        url: 'https://monday-crm-clone-default-rtdb.firebaseio.com/tickets.json',
        method: 'GET',
        body: '',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      transforTask
    );
  }, []);

  const colors: Array<string> = ['rgb(255,179,186)', 'rgb(255,223,186)', 'rgb(255,255,186)', 'rgb(186,255,201)', 'rgb(186,255,255)'];

  const list: Array<any> = [];
  tickets &&
    categories?.forEach((uniqueCat, indexCat) => {
      list.push(
        <div key={indexCat}>
          <h3>{uniqueCat}</h3>
          {tickets
            .filter((ticket) => ticket.category === String(uniqueCat))
            .map((filteredTicket, ind) => (
              <TicketCard key={ind} id={ind} color={colors[indexCat] || colors[0]} ticket={filteredTicket} />
            ))}
        </div>
      );
    });

  return (
    <div className="dashboard">
      <h1>My Projects</h1>
      {isLoading && <h3>Fetching Tickets</h3>}
      {!isLoading && <div className="ticket-container">{list}</div>}
    </div>
  );
};

export default Dashboard;
