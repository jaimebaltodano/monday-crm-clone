import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { InputTicket, TicketObj } from '../types/ticket';
import useHttp from '../hooks/use-http';

export interface ITicketPageProps {
  editMode?: boolean;
  categories?: string[] | null;
}

const TicketPage: React.FunctionComponent<ITicketPageProps> = ({ editMode, categories }: ITicketPageProps) => {
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();
  const [formData, setFormData] = useState<InputTicket>({
    avatar: '',
    category: '',
    description: '',
    id: null,
    status: 'not started',
    owner: '',
    progress: 0,
    priority: 0,
    timestamp: new Date().toISOString(),
    title: '',
  });

  const navigate = useNavigate();
  let { id } = useParams();

  const transforTask = (tickets: TicketObj) => {
    navigate('/');
  };

  const transforTask1 = (tickets: InputTicket) => {
    setFormData(tickets);
  };

  useEffect(() => {
    fetchTasks(
      {
        url: `https://monday-crm-clone-default-rtdb.firebaseio.com/tickets/${id}.json`,
        method: 'GET',
        body: '',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      transforTask1
    );
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editMode) {
      fetchTasks(
        {
          url: 'https://monday-crm-clone-default-rtdb.firebaseio.com/tickets.json',
          method: 'POST',
          body: { ...formData, id: uuid() },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        transforTask
      );
    } else {
      fetchTasks(
        {
          url: `https://monday-crm-clone-default-rtdb.firebaseio.com/tickets/${id}.json`,
          method: 'PUT',
          body: { ...formData },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        transforTask
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputName = event.currentTarget.name as keyof InputTicket;
    setFormData((prev) => ({
      ...prev,
      [inputName]: event.target.value,
    }));
  };

  let errorLbl: any = '';
  if (error) {
    errorLbl = <p>{error}</p>;
  }
  return (
    <div className="ticket">
      <h1>{editMode ? 'Update your ticket' : 'Create a Ticket'}</h1>
      {errorLbl}
      <div className="ticket-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <section>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" onChange={(e) => handleChange(e)} required={true} value={formData?.title} />
            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" onChange={(e) => handleChange(e)} required={true} value={formData?.description} />
            <label>Category</label>
            <select name="category" value={formData?.category} onChange={(e) => handleChange(e)}>
              {categories?.map((category, _i) => (
                <option key={`category-${_i}`} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="new-category">New Category</label>
            <input id="new-category" name="category" type="text" onChange={(e) => handleChange(e)} value={formData?.category} />
            <label>Priority</label>
            <div className="multiple-input-container">
              <input id="priority-1" name="priority" type="radio" value={1} onChange={(e) => handleChange(e)} checked={+formData?.priority === 1} />
              <label htmlFor="priority-2">1</label>
              <input id="priority-2" name="priority" type="radio" value={2} onChange={(e) => handleChange(e)} checked={+formData?.priority === 2} />
              <label htmlFor="priority-2">2</label>
              <input id="priority-3" name="priority" type="radio" value={3} onChange={(e) => handleChange(e)} checked={+formData?.priority === 3} />
              <label htmlFor="priority-3">3</label>
              <input id="priority-4" name="priority" type="radio" value={4} onChange={(e) => handleChange(e)} checked={+formData?.priority === 4} />
              <label htmlFor="priority-4">4</label>
              <input id="priority-5" name="priority" type="radio" value={5} onChange={(e) => handleChange(e)} checked={+formData?.priority === 5} />
              <label htmlFor="priority-5">5</label>
            </div>
            {editMode && (
              <>
                <input type="range" id="progress" name="progress" value={formData?.progress} min="0" max="100" onChange={(e) => handleChange(e)} />
                <label htmlFor="progress">Progress</label>
                <label htmlFor="status">Status</label>
                <select name="status" value={formData?.status} onChange={(e) => handleChange(e)}>
                  <option value="done">Done</option>
                  <option value="working on it">Working on it</option>
                  <option value="stuck">Stuck</option>
                  <option value="not started">Not started</option>
                </select>
              </>
            )}
            <input type="submit" value={isLoading ? 'Saving...' : 'Submit'} disabled={isLoading} />
          </section>
          <section>
            <label htmlFor="owner">Owner</label>
            <input id="owner" name="owner" type="text" onChange={(e) => handleChange(e)} required={true} value={formData?.owner} />
            <label htmlFor="avatar">Avatar</label>
            <input id="avatar" name="avatar" type="url" onChange={(e) => handleChange(e)} required={true} value={formData?.avatar} />
            <div className="img-preview">{formData?.avatar && <img src={formData.avatar} alt="avatar preview" />}</div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;
