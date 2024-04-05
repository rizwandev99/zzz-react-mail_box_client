import { useParams } from "react-router-dom";

const Id = () => {
  let { id } = useParams();
  alert("Hello World");
  return <div>{id ? <h3>ID: {id}</h3> : <h3>No ID provided</h3>}</div>;
};

export default Id;
