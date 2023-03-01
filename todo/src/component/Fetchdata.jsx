import { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react'
export const  Fetchdata=()=> {
  const [datas,getData]=useState([])
 useEffect(()=>{
  fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res=>res.json())
  .then(data=>getData(data))
  .catch(err=>console.log(err))
 },[])

const da=()=>{
    
}

  return (
    <TableContainer>
        <Table size="sm">
            <TableCaption>
                Todo hApp
            </TableCaption>
            {/* <Thead display="flex">
                <Tr>Todo</Tr>
                <Tr >Title</Tr>
                <Tr>Status</Tr>
                <Tr>Action</Tr>
            </Thead> */}
            
        <Tbody borderColor="4px red.100">
       { datas.map((item, i)=>(
    <Tr key={i}>
      <Td>{item.id}</Td>
      <Td>{item.title}</Td>
      <Td>{item.completed}</Td>
      <Td>
        <Button variant="outline" colorScheme="teal" onClick={()=>console.log(item)}>
          Edit
        </Button>
      </Td>
    </Tr>
 ))}
            </Tbody>
        </Table>
    </TableContainer>
  );
}