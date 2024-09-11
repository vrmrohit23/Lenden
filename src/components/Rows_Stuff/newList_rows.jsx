import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip,Button} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const statusColorMap = {
  Food: "success",
  Travel: "danger",
  Hotel: "primary",
  Fuel: "warning",
  Other:"secondary"
};

export default function newList_rows({expenseslist}) {
    const columns = [
        {
            uid:"Day",
            name:"Day"
        },
       
        {
            uid:"category",
            name:"Category"
        },
        {
            uid:"Payment_Method",
            name:"P-Method"
        },
        {
            uid:"Amount",
            name:"Amount"
        },
        {
            uid:"actions",
            name:"Actions"
        }
    ]
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    console.log(cellValue)
    switch (columnKey) {
      case "Day":
        return (
          <div className="text-default-600 font-bold">
            {user.Day + "-" + user.Month + "-" + user.Year}
          </div>
        );
      case "Note":
        return (
            <div className="flex justify-start">

           
            </div>
            
        );
      case "category":
        return (
          <Chip className="capitalize" color={statusColorMap[user.category]} size="base" variant="flat">
            {cellValue}
          </Chip>
        );
      case "Payment_Method":
        return (

            <div className="flex flex-col">
            <p className="text-bold text-default-600 text-sm capitalize">{cellValue}</p>
            
          </div>
        )  
      case "Amount":
        return (
            <div className="text-default-600 text-bold">

            {user.Amount}
            </div>
         
        )  
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center text-lg">
             <Tooltip  content='Show Note' >
                <span className=" text-default-600 cursor-pointer active:opacity-50">
                <FontAwesomeIcon  icon="fa-regular fa-eye" />
                </span>
            </Tooltip>
            <Tooltip  color="" content="Edit Expense">
              <span className=" text-default-600   hover:text-success cursor-pointer active:opacity-50">
              <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Expense">
              <span className="  text-danger cursor-pointer active:opacity-50">
              <FontAwesomeIcon icon="fa-regular fa-trash-can" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Example table with custom cells" className="sm:px-20  py-10 bg-slate-700 mb-10">
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className="text-sm ">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={expenseslist} >
        {(item) => (
          <TableRow key={item.$id}>
            {(columnKey) => {{console.log(columnKey)} return <TableCell className="sm:text-bas ">{renderCell(item, columnKey)}</TableCell>}}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
