import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-green-600 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to="overview"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-7 00"
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            to="products"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="sales"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Sales
          </Link>
        </li>
        <li>
          <Link
            to="expense"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Expenses
          </Link>
        </li>
        <li>
          <Link
            to="financials"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Financials
          </Link>
        </li>
        <li>
          <Link
            to="livestock"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Livestock
          </Link>
        </li>
        <li>
          <Link
            to="breedingrecord"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Breeding Record
          </Link>
        </li>
      </ul>
    </div>
  );
}
