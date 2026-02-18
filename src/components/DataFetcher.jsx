import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DataFetcher = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("https://dummyjson.com/products")

    setData(res.data.products);
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200 p-6 rounded shadow"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-40 object-cover mb-4"
          />

          <h2 className="font-bold text-lg">{item.title}</h2>
          <p className="text-sm">{item.description}</p>

          <p>Brand: {item.brand}</p>
          <p>Category: {item.category}</p>
          <p>Stock: {item.stock}</p>
          <p>Rating: {item.rating}</p>
          <p>Tags: {item.tags}</p>
          <p>Discount: {item.discountPercentage}%</p>

          <p className="font-semibold text-green-600">
            Price: ₹{item.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;

  

