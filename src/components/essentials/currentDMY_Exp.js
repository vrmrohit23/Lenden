import { useSelector } from "react-redux";
import {Expenserows} from '../index'

// current date-month-year variabls for export
const date = new Date();
const thisday = date.getDate() +'';
const currentmonthno = date.getMonth();
const monthsnames = {
    0:"Jan",
    1:"Feb",
    2:"Mar",
    3:"Apr",
    4:"May",
    5:"Jun",
    6:"Jul",
    7:"Aug",
    8:"Sep",
    9:"Oct",
    10:"Nov",
    11:"Dec"
}
const thismonth = monthsnames[currentmonthno];
const thisyear = date.getFullYear() + '';
export {
    thisday,thismonth,thisyear
}
