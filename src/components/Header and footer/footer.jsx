
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10">
            <h3 className="text-3xl font-bold mb-8 text-center">Quick Links</h3>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around mb-12">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 ">
            <h3 className="text-2xl font-bold mb-4">Manage Documents</h3>
            <ul className='flex-col flex text-lg'>
              <Link to={'./expenses'}>Expenses</Link>
              <Link to={'./lendings'}>Lendings</Link>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 ">
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <ul className='flex-col flex text-lg'>
            <Link to={'./contact'}>Contact</Link>
           
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 ">
            <h3 className="text-2xl font-bold mb-4">Account</h3>
            <ul className='flex-col flex text-lg'>
            <Link to={'./login'}>Login</Link>
            <Link to={'./signup'}>Signup</Link>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 pb-4 text-center">
          <p className="text-gray-500">&copy; 2023-2024 All rights reserved.Lenden and co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




