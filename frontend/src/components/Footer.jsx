import React from "react";
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-10">
      <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold text-gray-700 mb-2">SHOP</h4>
          <ul className="space-y-2">
            <li><Link to='' className="text-gray-500 hover:underline">Women</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Men</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Kids</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Home</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Beauty</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Student Discount</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Gift Cards</Link></li>
            <li><Link to='' className="text-gray-500 hover:underline">Magazine</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-700 mb-2">CORPORATE INFO</h4>
          <ul className="space-y-2">
            <li><Link to='/' className="text-gray-500 hover:underline">Career at H&M</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">About H&M Group</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Sustainability H&M Group</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Press</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Investor Relations</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Corporate Governance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-700 mb-2">HELP</h4>
          <ul className="space-y-2">
            <li><Link to='/' className="text-gray-500 hover:underline">Customer Service</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">My Account</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Find a Store</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Legal & Privacy</Link></li>
            <li><Link to='/' className="text-gray-500 hover:underline">Gift Card Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-700 mb-2">BECOME A MEMBER</h4>
          <p className="text-gray-500">Join now and get 10% off your next purchase!</p>
          <Link to='/' className="text-gray-500 hover:underline mt-2 inline-block">Read more</Link>
        </div>
      </div>

      <div className="w-full mx-auto flex justify-between items-center mt-8 border-t border-gray-200 pt-6">
        <div className="text-gray-500 text-sm">
          <span>United States ($)</span>
          <Link to='/' className="ml-4 hover:underline">Change Region</Link>
        </div>

        <div className="flex space-x-6">
          <Link to='/' className="text-gray-500 hover:underline">Instagram</Link>
          <Link to='/' className="text-gray-500 hover:underline">YouTube</Link>
          <Link to='/' className="text-gray-500 hover:underline">Facebook</Link>
        </div>
      </div>

      <div className="w-full mx-auto text-center text-xs text-gray-500 mt-6">
        <p>&copy; H&M Hennes & Mauritz AB. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
