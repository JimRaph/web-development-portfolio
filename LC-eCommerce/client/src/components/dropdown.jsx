
"use client";

import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

export function HeaderDropDown({logOutHandler}) {
  return (
    <Dropdown 
    renderTrigger={() => (
      <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 mb-2 py-2 rounded">
        Menu
      </button>
    )}
    dismissOnClick={false}>
      <Link to = "/order-history">
      <Dropdown.Item>Order History</Dropdown.Item>
      </Link>
      
      <Dropdown.Item onClick={logOutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
