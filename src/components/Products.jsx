import React, { useEffect, useState } from 'react'
import { RiArrowDownSFill } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import Product from '../components/Product.js'
import axios from "axios";

const Products = () => {

    const [bulkOpen, setBulkOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [defaultOpen, setDefaultOpen] = useState(false);

    //filter products
    const [products, setProducts] = useState(Product);
    const [selectBrand, setSelectBrand] = useState('');

   function handleBrandFilter(brand) {
  setSelectBrand(prev =>
    prev === brand ? "" : brand
  );
}


const filterProducts = selectBrand
  ? products.filter(item => item.brand === selectBrand)
  : products;




    return (
        <>
            <section className="w-full min-h-screen bg-gray-100 p-6">

                {/* OUTER ROW */}
                <div className="flex  justify-between items-start">

                    {/* LEFT */}
                    <div className="hidden md:flex flex-col items-start gap-4 uppercase mt-8">

                        {/* Bulk Products */}
                        <div className="w-60 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h1 className='font-semibold'>Bulk Products</h1>
                                <button onClick={() => setBulkOpen(!bulkOpen)}>
                                    <RiArrowDownSFill
                                        className={`text-xl cursor-pointer transition-transform duration-300 ${bulkOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <input type="radio" className='size-5' />
                                <label className="text-gray-400">yes</label>
                            </div>
                        </div>

                        {/* Sub Categories */}
                        <div className="w-60 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h1 className='font-semibold'>Sub Categories</h1>
                                <button onClick={() => setSubOpen(!subOpen)}>
                                    <RiArrowDownSFill
                                        className={`text-xl cursor-pointer transition-transform duration-300 ${subOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <input type="radio" className='size-5' />
                                <label className="text-blue-400">Wires & Cables</label>
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="w-60 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h1 className='font-semibold'>Brand</h1>
                                <button onClick={() => setBrandOpen(!brandOpen)}>
                                    <RiArrowDownSFill
                                        className={`text-xl cursor-pointer transition-transform duration-300 ${brandOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="mt-2 flex flex-col gap-2 text-gray-400 ">
                                <label className="flex items-center gap-2 ">
                                    <input
                                        type="radio"
                                        name="brand"
                                        className="size-5"
                                        onChange={() => handleBrandFilter("Polycab")}
                                    />

                                    Polycab
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="brand"
                                        className="size-5"
                                        onChange={() => handleBrandFilter("Havells")}
                                    />
                                    Havells
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="brand"
                                        className="size-5"
                                        onChange={() => handleBrandFilter("Finolex")}
                                    />
                                    Finolex
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="brand"
                                        className="size-5"
                                        onChange={() => handleBrandFilter("Goldmedal")}
                                    />
                                    Goldmedal
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full mx-4 mt-8">

                        {/* Default div */}
                        <div className="border-gray-500 p-4 shadow bg-white">
                            <div className="flex items-center justify-between text-xl md:text-2xl">
                                <span>Default</span>
                                <button onClick={() => setDefaultOpen(!defaultOpen)}>
                                    <RiArrowDownSFill
                                        className={`text-xl cursor-pointer transition-transform duration-300 ${defaultOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Images  */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">

                            {filterProducts.map((item) => (
                                <div key={item.id}
                                    className="bg-white  flex flex-col items-start">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full pt-4 h-40 object-contain"
                                    />

                                    {/* Rating */}

                                    <div className="mt-4 px-2 flex gap-1 text-1xl md:text-2xl ">
                                        {[...Array(5)].map((_, i) => (
                                            <CiStar
                                                key={i}

                                            />
                                        ))}
                                    </div>


                                    {/* Title */}
                                    <h1 className="mt-1 px-2 text-sm font-medium">
                                        {item.title}
                                    </h1>

                                    {/* Price */}
                                    <p className="mt-1 px-2  text-green-600 font-bold">
                                        ₹{item.price}
                                    </p>

                                </div>
                            ))}
                        </div>


                    </div>

                </div>



            </section>


        </>


    )
}

export default Products
