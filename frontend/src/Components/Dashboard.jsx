import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from '../Pages/Overview';
import Products from '../Pages/Products';
import Sales from '../Pages/Sales';
import Financials from '../Pages/Financials';
import Expenses from '../Pages/Expenses';
import Livestock from '../Pages/Livestock';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-100">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="financials" element={<Financials />} />
          <Route path='expense' element={<Expenses/>}></Route>
          <Route path='livestock' element={<Livestock/>}></Route>
        </Routes>
      </div>  
    </div>
  );
}
