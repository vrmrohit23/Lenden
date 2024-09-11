import React from 'react'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RenderTabs({setformat}) {
  return (

    <div className="flex flex-col items-center ">
      <Tabs aria-label="Options" onSelectionChange={setformat} color='primary'>
        <Tab key="list" title={
          <div className='space-x-2'>
            <FontAwesomeIcon icon="fa-solid fa-list-ul" />
            <span>List</span>
          </div>
        }>
        
        </Tab>
        <Tab key="table" title={
           <div className='space-x-2'>
           <FontAwesomeIcon icon="fa-solid fa-table-list" />
           <span>Table</span>
         </div>
        }>
        </Tab>
        
      </Tabs>
    </div>
  );
}


export default RenderTabs