import React, { useContext, useState } from "react";
import InputCmp from "../../../components/InputCmp";
import { AppContext } from "../../../context/appContext";

export default function PickFertilizer({ setType , onClickCancel}) {

   const [formData, setFormData] = useState({
    fertilizer :{name: '', _id: ''},
    name:''
    
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list based on input
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const {host,  fertilizers} = useContext(AppContext);
  const allCustomers = fertilizers;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value != '') {
      // Filter customers based on input value
      const filtered = allCustomers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setFilteredCustomers(filtered);
    }
    else setFilteredCustomers([]);
    
    console.log(allCustomers);

    setFormData({
      ...formData,
      [name]: value,
    

    });
    
    }
  
  const handleCustomerSelect = (customer) => {
    setFormData({
      ...formData,
      fertilizer: {name: customer.name, _id: customer._id},
      name: customer.name,
    
    });
   

    setType(customer)
    onClickCancel();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">
          Chọn loại phân
        </h2>
        <InputCmp title="Loại phân" name="name" value={formData.name} onChange={handleInputChange} placeholder="abc" />
        {filteredCustomers.length > 0 && (
        <ul className="suggestions-list font-semibold text-xl">
          {filteredCustomers.map(customer => (
            <li
              key={customer._id}
              onClick={() => handleCustomerSelect(customer)}
              className="suggestion-item text-xl hover:text-accept hover:text-2xl cursor-pointer "
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
