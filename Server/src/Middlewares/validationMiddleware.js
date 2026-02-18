
export const validateAdminLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
};

export const validateCategory = (req, res, next) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Category name is required" });
  } 
  next();
};

 export const validateProduct = (req, res, next) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  if (isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  next();
};

export const validationErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
