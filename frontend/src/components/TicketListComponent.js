import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.withCredentials = false;
function TicketListComponent() {
    const [ticketList, setTicketList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const apiURL = "http://127.0.0.1:8000/api/tickets";
    const fetchData = async () => {
        const response = await axios.get(apiURL,
            {'withCredentials': false});
        console.log(response)
        setTicketList(response.data);
        console.log(ticketList);
        console.log(response.data);
    }
    return (
        <div className="main-section">
            <h1>All Tickets</h1>
            <div className="ticket-list">
                {ticketList.map((ticket, index) => (
                    <ul>
                        <li>Ticket: {ticket.title}</li>
                        <li>Description: {ticket.description}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
}
export default TicketListComponent;