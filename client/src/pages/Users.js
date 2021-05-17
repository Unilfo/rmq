import React from 'react';
import TableUsers from '../components/Table';
import CustomTable from '../components/customTable';

let us = [
  {id: '1', name:'asd1', password:'10', role:'admin'},
  {id: '2', name:'asd2', password:'11', role:'admin'},
  {id: '3', name:'asd3', password:'12', role:'admin'},
  {id: '4', name:'asd4', password:'14', role:'admin'},
  {id: '5', name:'asd5', password:'15', role:'admin'},
  {id: '6', name:'asd6', password:'4536', role:'user'},
]

const Users = () => {
  return (
    <div>
      {/* <TableUsers/> */}
      <CustomTable headers={'1','2','3'} users={us}/>
    </div>
  )
};

export default Users;