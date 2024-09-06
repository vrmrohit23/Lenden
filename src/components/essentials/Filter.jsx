import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

function Filter({ categoryoptions = [], filteroptions, month ,setselectedfilters}) {

    const [selectedcategory, setselectedcategory] = useState(categoryoptions[0]);
    const [selectedoptions, setselectedoptions] = useState({
        'Category': [],
        'P_Method': []
    });
    const [display, setdisplay] = useState(false);
    const [rangevalue, setrangevalue] = useState(0);
    const [selecteddate, setselecteddate] = useState(null);
    let montharray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    if (month !== "Feb") {

        montharray.push('29', '30')
        if (month !== "Apr" && month !== "Jun" && month !== "Sep" && month !== "Nov") {
            montharray.push('31')
        }
    }
    // to handle the apply button of filter
    const handle_Apply = () => {
        let newfilterobject = { ...selectedoptions };
        if (rangevalue > 0) {
            newfilterobject["Range"] = rangevalue;
        }
        if (selecteddate != null) {
            newfilterobject["Date"] = selecteddate;
        }
        setselectedfilters(newfilterobject);
        setdisplay(false)
        console.log(newfilterobject);
    }
    const handleCheckboxChange = (category, member) => {
        setselectedoptions(prevState => {
            const newFilters = { ...prevState };
            if (newFilters[category].includes(member)) {
                // Remove member
                newFilters[category] = newFilters[category].filter(item => item !== member);
            } else {
                // Add member
                newFilters[category] = [...newFilters[category], member];
            }

            return newFilters;
        });
    };

    return (
        <>
            <div className='flex justify-center mx-4 sm:mx-10 '>
                <button className='  px-8 shadow-lg rounded-3xl mb-1 py-1 duration-200 font-bold bg- hover:text-white  hover:bg-teal-600 sm:text-xl' onClick={() => setdisplay(true)}>
                    <FontAwesomeIcon icon={"fa-solid fa-filter"}/>  Filters
                    
                </button>
            </div>
            <div className={'fixed  inset-0 justify-center w-full h-full items-center backdrop-blur-sm bg-black bg-opacity-60 z-50 ' + (display ? 'flex' : 'hidden')} >
                <div className=' relative overflow-auto bg-white  w-full mx-3  rounded-xl shadow-lg border-2 border-gray-800 sm:w-3/4 sm:max-w-xl'>
                    <div className=' flex items-center shadow-sm'>
                        <h1 className='text-4xl mx-4 cursor-pointer' onClick={() => setdisplay(false)}>&larr;</h1>
                        <h1 className='text-xl font-semibold font-mono'>Filters</h1>

                    </div>
                    <div className='flex '>
                        <aside className='bg-sky-100 h-full pt-5 pb-40 text-md sm:text-lg'>
                            {categoryoptions.map((category) =>
                                <div key={category} className={'font-light px-2  cursor-pointer my-2 py-1 font-sans sm:px-4 ' + (selectedcategory === category ? 'bg-white text-teal-600' : '')} onClick={() => setselectedcategory(category)}>
                                    <h2 className=''>{category}</h2>
                                </div>
                            )
                            }
                        </aside>

                        <div className='h-full mx-2 mt-2 w-full text-sm sm:text-lg sm:mx-4'>
                            {filteroptions[selectedcategory] &&
                                filteroptions[selectedcategory].map((members) =>
                                    <label htmlFor="" key={members} className='flex mb-2'>

                                        <input type="checkbox" name="" id="" className='mr-1 w-4 ' checked={selectedoptions[selectedcategory].includes(members)}
                                            onChange={() => { handleCheckboxChange(selectedcategory, members); }} />
                                        <h2 className=''>{members}</h2>
                                    </label>
                                )}
                            {selectedcategory === 'Amount' &&
                                <div className='w-full'>
                                    <input type="range" id='amountrange' value={rangevalue} className='w-full' onChange={(e) => setrangevalue(e.target.value)} max={100000} />
                                    <div className=' justify-between  sm:flex'>
                                        <p className=' text-nowrap sm:mr-4'>0</p>
                                        <p className='sm:mr-4'>-</p>
                                        <input type="text" id='amountrange' className=' w-full border-2 border-gray-300 rounded-md focus:outline-none px-2' value={rangevalue} onChange={(e) => setrangevalue(e.target.value)} />
                                    </div>
                                    <button className="mt-4 relative block px-2 py-1 font-semibold text-black hover:text-white bg-transparent border  border-black overflow-hidden group hover:scale-110 duration-300  " onClick={() => setrangevalue(0)}>
                                        <span className="absolute inset-0 w-0  bg-blue-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                                        <span className="relative z-10 " >Reset</span>
                                    </button>
                                </div>
                            }
                            {selectedcategory === 'Date' &&
                                <div>
                                    <ul className='flex flex-wrap'>
                                        {montharray.map((item) =>
                                            <li key={item} className={'mr-1 my-1 px-1 bg-sky-200 hover:bg-sky-400 cursor-pointer  sm:mx-2 sm:px-2 rounded-md ' + (selecteddate === item ? 'bg-sky-400 outline-dashed' : '')} onClick={() => setselecteddate(item)}>
                                                {item}
                                            </li>
                                        )}
                                    </ul>
                        
                                    <button className="mt-4 relative block px-2 py-1 font-semibold text-black hover:text-white bg-transparent border  border-black overflow-hidden group hover:scale-110 duration-300  " onClick={() => setselecteddate(null)}>
                                        <span className="absolute inset-0 w-0  bg-blue-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                                        <span className="relative z-10 ">Reset</span>
                                    </button>

                                </div>
                            }


                        </div>
                    </div>
                    <div className='py-1 flex justify-center'>
                        <div className='flex justify-between'>
                            <button className='focus:outline-none  mr-3 px-2 py-1 font-semibold font-serif text-red-400 hover:bg-slate-800 hover:text-red-600 sm:text-xl duration-300 rounded-sm' onClick={() => {
                                setselectedoptions({
                                    'Category': [],
                                    'P_Method': []
                                });
                                setrangevalue(0);
                                setselecteddate(null)
                            }}>
                                Clear All
                            </button>
                            <button className='focus:outline-none  px-2 py-1 font-semibold font-mono text-white bg-teal-500 hover:bg-teal-600 sm:text-xl duration-300 rounded-sm sm:px-4' onClick={handle_Apply}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter