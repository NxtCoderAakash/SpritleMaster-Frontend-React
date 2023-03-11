import "./index.css";
const Answers = (props) => {
  const { data, getResult } = props;

  return (
    <li className="result-item">
      {data.operation} = {getResult(data.operation)}
    </li>
  );
};

export default Answers;
