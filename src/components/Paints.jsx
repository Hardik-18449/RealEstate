import React, { useState, useRef, useEffect } from "react";
import { RiArrowDownSFill, RiFilter3Line } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import paint1 from "../assets/paint1.png";


const Paints = () => {
    const [bulkOpen, setBulkOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [subSelected, setSubSelected] = useState("");

    const [bulkSelected, setBulkSelected] = useState(false);


    const [paints] = useState(Paint);
    const [selectBrand, setSelectBrand] = useState("");

    const filterRef = useRef(null);

    function handleBrandFilter(brand) {
        setSelectBrand((prev) => (prev === brand ? "" : brand));
    }

    const filterPaints = selectBrand
        ? paints.filter((item) => item.brand === selectBrand)
        : paints;

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setBulkOpen(false);
                setSubOpen(false);
                setBrandOpen(false);
                setDefaultOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="w-full min-h-screen bg-gray-100 p-4 md:p-6">

            {/* ================= MOBILE FILTER ICON ================= */}
            <div className="md:hidden flex justify-start mb-3">
                <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="flex items-center gap-1 bg-white shadow px-3 py-2 rounded"
                >
                    <RiFilter3Line size={20} />
                    <span className="text-sm font-medium">Filter</span>
                </button>
            </div>

            {/* ================= FILTER BAR ================= */}
            <div
                ref={filterRef}
                className="bg-white p-4  hidden md:flex justify-between items-start shadow"
            >
                {/* LEFT FILTERS - DESKTOP ONLY */}
                <div className="hidden md:flex gap-6">

                    {/* BULK */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 font-semibold"
                            onClick={() => setBulkOpen(!bulkOpen)}
                        >
                            Bulk Products <RiArrowDownSFill />
                        </button>

                        {bulkOpen && (
                            <div className="absolute mt-2 bg-white p-3 shadow w-40">
                            <p  onClick={() => setBulkSelected(!bulkSelected)}
                            className={`cursor-pointer px-2 py-1 rounded ${
                             bulkSelected ? "bg-blue-100 text-blue-600 font-semibold": "hover:bg-gray-100 text-gray-600"
                             }`} >Yes
                            </p>
                            </div>

                        )}
                    </div>

                    {/* SUB CATEGORY */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 font-semibold"
                            onClick={() => setSubOpen(!subOpen)}
                        >
                            Sub Categories <RiArrowDownSFill />
                        </button>

                        {subOpen && (
                            <div className="absolute mt-2 bg-white p-3 shadow w-48">
                            <p onClick={() =>setSubSelected((prev) =>prev === "Wires & Cables" ? "" : "Wires & Cables"
                             )
                            } className={`cursor-pointer px-2 py-1 rounded ${subSelected === "Wires & Cables"? "bg-blue-100 text-blue-600 font-semibold": "text-gray-600 hover:bg-gray-100" }`}>
                            Paints
                            </p>
                         </div>

                        )}
                    </div>

                    {/* BRAND */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-1 font-semibold"
                            onClick={() => setBrandOpen(!brandOpen)}
                        >
                            Brand <RiArrowDownSFill />
                        </button>

                        {brandOpen && (
                            <div className="absolute mt-2 bg-white p-3 shadow w-48">
                                {["Asian Paints", "Berger", "Nerolac", "Dulux",].map(
                                    (brand) => (
                                        <p
                                            key={brand}
                                            onClick={() => handleBrandFilter(brand)}
                                            className={`cursor-pointer py-1 ${selectBrand === brand ? "text-blue-600 font-semibold" : "text-gray-600"
                                                }`}
                                        >
                                            {brand}
                                        </p>
                    
                        )
                )}
                    </div>
            )}
                </div>
            </div>

        </div>

      {/* ================= MOBILE FILTER PANEL ================= */ }
    {
        mobileFilterOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">

                {/* Overlay */}
                <div
                    className="flex-1 bg-black bg-opacity-40"
                    onClick={() => setMobileFilterOpen(false)}
                ></div>

                {/* Drawer */}
                <div className="w-full bg-white p-4 overflow-y-auto shadow-lg">

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <button
                            onClick={() => setMobileFilterOpen(false)}
                            className="text-red-500 font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* BULK */}
                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Bulk Products</h4>
                        <label className="flex gap-2">
                            <input type="radio" />
                            Yes
                        </label>
                    </div>

                    {/* SUB CATEGORY */}
                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Sub Categories</h4>
                        <label className="flex gap-2">
                            <input type="radio" />
                            Paints
                        </label>
                    </div>

                    {/* BRAND */}
                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Brand</h4>
                        {["Asian Paints", "Berger", "Nerolac", "Dulux",].map(
                            (brand) => (
                                <label key={brand} className="flex gap-2 mb-2">
                                    <input
                                        type="radio"
                                        checked={selectBrand === brand}
                                        onChange={() => handleBrandFilter(brand)}
                                    />
                                    {brand}
                                </label>
                            )
                        )}
                    </div>

                    <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Apply Filters
                    </button>

                </div>
            </div>
        )
    }

    {/* ================= PRODUCTS GRID ================= */ }
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filterPaints.map((item) => (
            <div key={item.id} className="bg-white p-3">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-contain"
                />
                <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                        <CiStar key={i} />
                    ))}
                </div>
                <h1 className="text-sm font-medium mt-1">{item.title}</h1>
                <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>
        ))}
    </div>

    </section >
  );
};

const Paint = [
  {
    id: 1,
    title: "Asian Paints Royale Luxury Emulsion 20L",
    price: 5200,
    brand: "Asian Paints",
    image: paint1,
    rating: 5,
  },
  {
    id: 2,
    title: "Berger Easy Clean Interior Paint 10L",
    price: 3100,
    brand: "Berger",
    image: paint1,
    rating: 4,
  },
  {
    id: 3,
    title: "Nerolac Beauty Gold Washable Paint 20L",
    price: 4500,
    brand: "Nerolac",
    image: paint1,
    rating: 4,
  },
  {
    id: 4,
    title: "Dulux Velvet Touch Premium 10L",
    price: 3900,
    brand: "Dulux",
    image: paint1,
    rating: 5,
  },
  {
    id: 5,
    title: "Asian Paints Apex Exterior 20L",
    price: 4800,
    brand: "Asian Paints",
    image: paint1,
    rating: 4,
  },
  {
    id: 6,
    title: "Berger WeatherCoat Long Life 20L",
    price: 5300,
    brand: "Berger",
    image: paint1,
    rating: 5,
  },
  {
    id: 7,
    title: "Nerolac Excel Total Exterior 10L",
    price: 3400,
    brand: "Nerolac",
    image: paint1,
    rating: 4,
  },
  {
    id: 8,
    title: "Dulux Weathershield Protect 20L",
    price: 5600,
    brand: "Dulux",
    image: paint1,
    rating: 5,
  },
  {
    id: 9,
    title: "Asian Paints Tractor Emulsion 10L",
    price: 2200,
    brand: "Asian Paints",
    image: paint1,
    rating: 3,
  },
  {
    id: 10,
    title: "Berger Silk Glamor Interior 10L",
    price: 4100,
    brand: "Berger",
    image: paint1,
    rating: 4,
  },
];

export default Paints;
