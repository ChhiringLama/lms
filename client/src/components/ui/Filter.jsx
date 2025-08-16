import { useEffect, useState } from "react";

const Filter = ({ handleFilterChange }) => {
  // Fake data for categories
  const categories = [
  "Business",
  "Design",
  "Economics",
  "Health",
  "Marketing",
  "Math",
  "Microprocessor",
  "Operating System",
  "Politics",
  "Programming",
  "Science"
];

  // State for selected categories and price order
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceOrder, setPriceOrder] = useState("");

  // Handle category selection (multi-select)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category);
      const next = isSelected
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      return next;
    });
  };

  // Handle price order change
  const handlePriceOrderChange = (e) => {
    const next = e.target.value;
    setPriceOrder(next);
  };

  // Notify parent on any change
  useEffect(() => {
    handleFilterChange(selectedCategories, priceOrder);
  }, [selectedCategories, priceOrder, handleFilterChange]);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Order Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sort by Price</h3>
        <select
          value={priceOrder}
          onChange={handlePriceOrderChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Order</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="form-checkbox"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;