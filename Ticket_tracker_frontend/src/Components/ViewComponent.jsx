import React, { useEffect, useState } from 'react'
import { getTicket } from '../Ticket';
import { useParams } from 'react-router-dom';

const ViewComponent = () => {

   const[ticket,setTicket] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        getTicket(id).then(response=>{
           setTicket(response.data);

        }).catch(error=>console.log(error))
    },[])



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card " style={{ width: '30rem' ,height:'30rem'}}>
        <div className="card-body">

            <h1 className="card-title text-center">{ticket.title}</h1>
            <br></br>
            <br></br>
            <p>Summary:</p>
            <p className="card-subtitle mb-2 text-muted">{ticket.description}</p>
            <br></br>
            <p>Description:</p>
            <p className="card-text">{ticket.content}</p>
            <br></br>
            <p>Created At: <p className="card-text"><small className="text-muted">{ticket.date}</small></p> </p>
            
        </div>
    </div>
</div>
  )
}

export default ViewComponent