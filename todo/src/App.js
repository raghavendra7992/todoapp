import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useEffect,useState } from "react";

const App = () => {
  const [tbdata, settbdata] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(data => settbdata(data));
  }, []);
  const [direc, setdirection] = useState("asc");

const Sort = (col) => {
  settbdata(prevD => {
    const sorted = prevD.sort((a, b) => {
      if (a[col] < b[col]) return direc === "asc" ? -1 : 1;
      if (a[col] > b[col]) return direc === "asc" ? 1 : -1;
      return 0;
    });
    setdirection(prev => prev === "asc" ? "desc" : "asc");
    return sorted;
  });
};


//view user
const [getuser, userdata] = useState(null);

const view = (userId) => {
  userdata(userId);
};


const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data));
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display:"flex",marginLeft:"40px",color:"red"}}>
      <div>
      <h3>Todo ID</h3>
        <h3>Title</h3>
        <h3>User ID</h3>
        <h3>Name</h3>
        <h3>Email</h3>
        </div>
      <div style={{marginLeft:"30px"}}>
      <h3> {userData.id}</h3>
      <h3>_ {userData.title}</h3>
       <h3>{userData.username}</h3>
       <h3>{userData.name}</h3>
       <h3>{userData.email}</h3>
      </div>
    </div>
  );
};


  
  return (
    <>
    <h1 style={{textAlign:"center"}}>Todo List</h1>
    <div style={{display:"flex"}}>
      
    <Table size="sm" variant="striped" colorScheme="teal">
  <Thead color="brown" borderColor="blueviolet" bg='grey'>
    <Tr>
    <Th onClick={() => Sort("id")}>Todo ID</Th>
<Th onClick={() => Sort("title")}>Title</Th>
<Th onClick={() => Sort("completed")}>Status</Th>
<Th>Action</Th>

    </Tr>
    
  </Thead>
  <Tbody bg="grey">
    {tbdata.map(item => (
      <Tr key={item.id}>
        <Td>{item.id}</Td>
        <Td>{item.title}</Td>
        <Td>{item.completed ? "Complete" : "Incomplete"}</Td>
        <Td><Button onClick={() => view(item.userId)}>View User</Button></Td>
      </Tr>
    ))}
  </Tbody>
  
</Table>

<div style={{float:"right"}}>
{getuser && <User userId={getuser} />}
</div>
</div>
</>
  )
}

export default App