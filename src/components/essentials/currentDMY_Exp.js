

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
export {
    thisday,thismonth,thisyear,monthsnames
}
