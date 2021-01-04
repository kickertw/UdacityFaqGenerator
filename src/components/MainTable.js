import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './MainTable.css';
import { db } from '../firebase';

function MainTable(props) {  
  const [data, setData] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({ email: '' });
  
  useEffect(() => {
    if (props.user.userInfo !== null) {
      setUserInfo({email: props.user.userInfo.email});
    }

    const fetchData = async () => {
      const faqsRef = db.collection('faqs');
      const snapshot = await faqsRef
        .orderBy('ama_date', 'desc')
        .orderBy('question')
        .get();

      var tableData = [];
      snapshot.forEach(doc => {
        var newQa = doc.data();
        newQa.id = doc.id;
        newQa.ama_date = getDateAsString(newQa.ama_date.toDate());
        tableData.push(newQa);
      });
      setData(tableData);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const getDateAsString = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  return (
    <div className="main-table">
      { userInfo.email.length > 0 ? (
        <>
          <p>Hello {userInfo.email}!</p>
          <Link to="/item">
            <Button className="AddButton" variant="primary">Add Faq Item</Button>
          </Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-question">Question</th>
            <th>Answer</th>
            <th className="col-date">AMA Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              { userInfo.email.length > 0 ? 
                (<td><Link to={`/item/${item.id}`}>{item.question}</Link></td>) :
                (<td>{item.question}</td>)
              }
              <td>{item.answer}</td>
              <td>{item.ama_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>    
    </div>
  );
}

export default MainTable;
