import { useSelector } from "react-redux";
import {Expenserows} from '../index'

// current date-month-year variabls for export
const date = new Date();
const thisday = date.getDate() +'';
const currentmonthno = date.getMonth();
const monthsnames = {
    "01":"Jan",
    "02":"Feb",
    "03":"Mar",
    "04":"Apr",
    "05":"May",
    "06":"Jun",
    "07":"Jul",
    "08":"Aug",
    "09":"Sep",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec"
}
const thismonth = monthsnames[currentmonthno];
const thisyear = date.getFullYear() + '';
// <------------------------------------->
// Recent Expenses table for exporting
// function CurrentDMY_Exp(){
// const recentexpenses = useSelector((state) => state.expense.expenseslist.filter(expense=>expense.Month === thismonth && expense.Year === thisyear && expense.Day === thisday));

// return (
//     <table className=' rounded-lg w-full px-4 bg-transparent'>
//           <thead className=''>

//             <tr >
//               <th className='border-2 text bg-gray-300 max-w-12 border-slate-600 py-1'>Day-Month-Year</th>
//               <th className='border-2 bg-gray-300 max-w-28 border-slate-600 py-1'>Description</th>
//               <th className='border-2 bg-gray-300 border-slate-600 py-1'>Category</th>
//               <th className='border-2 bg-gray-300 border-slate-600 py-1'>Status</th>
//               <th className='border-2 bg-gray-300 border-slate-600 py-1' >Amount</th>
//             </tr>
//           </thead>
//           <tbody>

    
//         {recentexpenses.map((option)=>{
//             return <Expenserows expense={option} firstbutton={"Approve"} secondbutton={"Reject"}  key={option.$id}/>
//         })}
//         </tbody>
//         </table>
// )
//     }
export {
    thisday,thismonth,thisyear,monthsnames
}
// export default CurrentDMY_Exp;