import React, { useState, useRef, useEffect } from "react";
import { RiArrowDownSFill, RiFilter3Line } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import sanitary1 from '../assets/sanitary1.png'


const Sanitary = () => {
    const [bulkOpen, setBulkOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [subSelected, setSubSelected] = useState("");

    const [bulkSelected, setBulkSelected] = useState(false);


    const [sanitarys] = useState(KitchenSanitary);
    const [selectBrand, setSelectBrand] = useState("");

    const filterRef = useRef(null);

    function handleBrandFilter(brand) {
        setSelectBrand((prev) => (prev === brand ? "" : brand));
    }

    const filterSanitary = selectBrand
        ? sanitarys.filter((item) => item.brand === selectBrand)
        : sanitarys;

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
                            Kitchen & Sanitary 
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
                                {["Cera", "Elica", "Jaquar", "Hindware","Parryware"].map(
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
                        {["Cera", "Elica", "Jaquar", "Hindware","Parryware"].map(
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
        {filterSanitary.map((item) => (
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

const KitchenSanitary = [
  {
    id: 1,
    title: "Stainless Steel Kitchen Sink (Single Bowl)",
    price: 3200,
    brand: "Cera",
    image: sanitary1,
    rating: 4,
  },
  {
    id: 2,
    title: "Wall Mounted Kitchen Chimney 60cm",
    price: 8500,
    brand: "Elica",
    image: sanitary1,
    rating: 5,
  },
  {
    id: 3,
    title: "Kitchen Faucet with Pull Down Spray",
    price: 2100,
    brand: "Jaquar",
    image: sanitary1,
    rating: 4,
  },
  {
    id: 4,
    title: "Ceramic Wash Basin (Table Top)",
    price: 2800,
    brand: "Hindware",
    image: sanitary1,
    rating: 4,
  },
  {
    id: 5,
    title: "Wall Hung Western Toilet Seat",
    price: 6200,
    brand: "Parryware",
    image: sanitary1,
    rating: 5,
  },
  {
    id: 6,
    title: "Bathroom Shower Set with Hand Shower",
    price: 3500,
    brand: "Jaquar",
    image: sanitary1,
    rating: 4,
  },
];

export default Sanitary;
