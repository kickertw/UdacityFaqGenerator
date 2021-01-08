import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './MainTable.css';
import { db } from '../firebase';
import { Form } from 'react-bootstrap';

function MainTable(props) {  
  const [data, setData] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({ email: '' });
  const [searchText, setSearchText] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  
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
        newQa.isFiltered = false;
        tableData.push(newQa);
      });
      setData(tableData);
      setCount(tableData.length);
      setTotal(tableData.length);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const getDateAsString = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var newData = data;
    newData.forEach(item => {
      if (searchText.length === 0 || item.question.includes(searchText) || item.answer.includes(searchText)) {
        item.isFiltered = false;
      } else {
        item.isFiltered = true;
      }
    });
    
    setData(newData);
    setCount(data.filter(i => !i.isFiltered).length);
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

      <Form inline onSubmit={handleSubmit}>
        <Form.Label htmlFor="inlineSearchForm" srOnly>Search Text</Form.Label>
        <Form.Control
          className="mb-2 mr-sm-2"
          id="inlineSearchFormInput"
          placeholder="Type to search here"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="submit" className="mb-2">
          🔎
        </Button>
        <p>Showing {count} of {total} records.</p>
      </Form>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th className="col-question">Question</th>
            <th>Answer</th>
            <th className="col-date">AMA Date</th>
          </tr>
        </thead>
        <tbody>          
          {data.map(item => {
            if (!item.isFiltered) {
              return (
                <MainTableRow isLoggedIn={(userInfo.email.length > 0)} item={item}/>
              )
            }

            return (null);
          })}
        </tbody>
      </Table>    
    </div>
  );
}

function MainTableRow(props) {
  return (
    <tr key={props.item.id}>
      { props.isLoggedIn ? 
        (<td><Link to={`/item/${props.item.id}`}>{props.item.question}</Link></td>) :
        (<td>{props.item.question}</td>)
      }
      <td>{props.item.answer}</td>
      <td>{props.item.ama_date}</td>
    </tr>
  );
}

export default MainTable;
