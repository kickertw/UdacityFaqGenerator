import { Link } from "react-router-dom";

function MainTableRow(props) {
    return (
      <tr key={props.item.id}>
        { props.isLoggedIn ? 
          (<td><Link to={`/item/${props.item.id}`}>{props.item.question}</Link></td>) :
          (<td>{props.item.question}</td>)
        }
        <td><div dangerouslySetInnerHTML={{ __html: props.item.answer }}></div></td>
        <td>{props.item.ama_date}</td>
      </tr>
    );
  }

  export default MainTableRow;
