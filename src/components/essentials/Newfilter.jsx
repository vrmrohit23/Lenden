import React, { useState } from 'react';


const FilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('Brand');
  const [selectedFilters, setSelectedFilters] = useState({
    "Brand": {
      "OnePlus": true // Default selected filter for the "Brand" category
    }
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (category, filter) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [filter]: !prevState[category]?.[filter],
      }
    }));
  };

  const categories = [
    "Product Type",
    "Availability",
    "Brand",
    "Price Range",
    "Ram",
    "Storage",
    "Screen Size",
    "Battery Capacity",
    "Warranty Type"
  ];

  const filters = {
    "Product Type": ["Type 1", "Type 2", "Type 3"],
    "Availability": ["In Stock", "Out of Stock"],
    "Brand": ["Infinix", "Motorola", "Nokia", "OnePlus", "Oppo", "Poco", "Realme", "Samsung", "Vivo", "Xiaomi"],
    "Price Range": ["$0-$100", "$100-$300", "$300-$500", "$500+"],
    "Ram": ["2GB", "4GB", "8GB", "16GB"],
    "Storage": ["16GB", "32GB", "64GB", "128GB"],
    "Screen Size": ["5 inch", "6 inch", "7 inch"],
    "Battery Capacity": ["2000mAh", "3000mAh", "4000mAh"],
    "Warranty Type": ["1 Year", "2 Years", "No Warranty"]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md flex justify-between items-center">
        <button className="text-black text-xl">&larr;</button>
        <h1 className="text-lg font-semibold">Filters</h1>
        <div></div>
      </header>
      <div className="flex flex-grow">
        <aside className="w-1/4 bg-gray-100 p-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer mb-2 p-2 rounded ${
                selectedCategory === category ? 'bg-white text-green-700 font-bold' : ''
              }`}
            >
              <h2 className="text-lg font-medium">{category} (1)</h2>
            </div>
          ))}
        </aside>
        <main className="flex-grow p-4 bg-white">
          {filters[selectedCategory] && filters[selectedCategory].map((filter, index) => (
            <label key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={selectedFilters[selectedCategory]?.[filter] || false}
                onChange={() => handleCheckboxChange(selectedCategory, filter)}
                className="form-checkbox"
              />
              <span>{filter}</span>
            </label>
          ))}
        </main>
      </div>
      <footer className="p-4 bg-white shadow-md flex justify-between items-center">
        <button onClick={() => setSelectedFilters({})} className="text-red-500">Clear All</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
      </footer>
    </div>
  );
};

export default FilterComponent;
