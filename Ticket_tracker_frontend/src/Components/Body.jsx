import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteTicket, getAllTickets } from '../Ticket';

const Body = () => {
    const navigator = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getTickets();
    },[]);

    function getTickets() {
        getAllTickets()
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => console.log(error));
    }

    function handelUpdate(id) {
        navigator(`/update/${id}`);
    }

    function handelView(id) {
        navigator(`/view/${id}`);
    }

    function handelDelete(id) {
        deleteTicket(id)
            .then((response) => {
                console.log(response.data);
                getTickets();
            })
            .catch((error) => console.log(error));
    }

    const filteredTickets = tickets.filter(
        (ticket) =>
            (ticket.title && ticket.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className='container'>
            <br />
            <h1 className='text-center'>List of Tickets</h1>
            <br />

            <Link id='add-btn' className='btn btn-primary' to={'/add'}>
                Add Ticket
            </Link>

            <div className='mb-3'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <br />
            <table className='table table-success table-hover'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th colSpan='1' className='text-center'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket, index) => (
                        <tr key={ticket.id}>
                            <td>{index+1}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.date}</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center gap-2'>
                                    <button className='btn btn-success' onClick={() => handelUpdate(ticket.id)}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger' onClick={() => handelDelete(ticket.id)}>
                                        Delete
                                    </button>
                                    <button className='btn btn-danger' onClick={() => handelView(ticket.id)}>
                                        View
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Body;
