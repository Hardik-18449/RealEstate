import { db } from "../Config/db.js";

// Save Order to MySQL
export const confirmOrder = (req, res) => {
    const { username, email, total_price, no_of_products, products } = req.body;

    // We MUST stringify the products array for the JSON/TEXT column
    const query = `INSERT INTO orderDetails (username, email, total_price, no_of_products, products) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [username, email, total_price, no_of_products, JSON.stringify(products)], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Order Placed Successfully", orderId: result.insertId });
    });
};

// Fetch Orders for a specific User
export const getMyOrders = (req, res) => {
    const { email } = req.params; 
    const query = "SELECT * FROM orderDetails WHERE email = ? ORDER BY order_date DESC";

    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        const formattedResults = results.map(order => ({
            ...order,
            products: typeof order.products === 'string' ? JSON.parse(order.products) : order.products
        }));

        res.json(formattedResults);
    });
};

// Get ALL orders for admin
export const getAllOrdersAdmin = (req, res) => {
    const query = "SELECT * FROM orderDetails ORDER BY order_date DESC";
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        const formattedResults = results.map(order => ({
            ...order,
            products: typeof order.products === 'string' ? JSON.parse(order.products) : order.products
        }));

        res.json(formattedResults);
    });
};

// Update order status (Pending -> Shipped -> Delivered)
export const updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = "UPDATE orderDetails SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Status updated successfully" });
    });
};