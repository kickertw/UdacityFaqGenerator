import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker';
import { Trash } from 'react-bootstrap-icons';
import { Editor } from '@tinymce/tinymce-react';

import { useParams } from 'react-router-dom';
import { useHistory, Link } from "react-router-dom";
import { db } from '../firebase';

import './FaqItem.css';
import 'react-datepicker/dist/react-datepicker.css';

function FaqItem(props) {
  const { id } = useParams();
  const itemRef = db.collection('faqs').doc(id);
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState('');
  const [amaDate, setAmaDate] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    if (props.user.userInfo === null) {
      history.push('/');
    }

    const fetchData = async () => {
      const item = await itemRef.get();

      if (item.exists) {
        const tempItem = item.data();
        setQ(tempItem.question);
        setAnswer(tempItem.answer);

        if (typeof tempItem.ama_date !== 'string') {
          setAmaDate(tempItem.ama_date.toDate());
        } else {
          setAmaDate(new Date(tempItem.ama_date));  
        }
      }
    };

    fetchData();
    return () => {
      setQ('');
      setAnswer('');
    }
  // eslint-disable-next-line
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = {
      question: q,
      answer: answer,
      ama_date: amaDate
    };

    if (id !== null){
      itemRef.set(data);
    } else {
      db.collection('faqs').add(data);
    }

    history.push('/');
  }

  const deleteItem = async (evt) => {
    evt.preventDefault();
    await itemRef.delete();
    history.push('/');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="itemForm.Question">
        <Form.Label>Question:</Form.Label>
        <Form.Control 
          required
          as="textarea"
          rows={3}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="itemForm.Answer">
        <Form.Label>Answer:</Form.Label>
        <Editor
          apiKey='8un91eqna2uhxy0m3dgdmx0bzzut7k8ezprb1iv0xq7gpat3'
          value={answer}
          init={{
            height: 200,
            width: '50%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount emoticons'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | bullist numlist outdent indent | link | removeformat | emoticons'
          }}
          onEditorChange={(content, editor) => setAnswer(content)}
        />        
        <Form.Control.Feedback type="invalid">
          Required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="itemForm.AmaDate">
        <Form.Label>AMA Date:&nbsp;&nbsp;</Form.Label>
        <DatePicker
          dateFormat="dd MMM yyyy"
          todayButton="Today"
          selected={amaDate}
          onChange={date => setAmaDate(date)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
      <Button variant="danger" onClick={deleteItem} ><Trash/></Button>
      <Link to='/'>
        <Button variant="secondary">Cancel</Button>
      </Link>
    </Form>    
  );
}

export default FaqItem;
