import Product from "../model/product.js";

export const createProduct = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ error: "You must be authenticated to create a new product" });
  }
  const { name, description, quantity, price, productUrl } = req.body;
  const product = new Product({
    name,
    description,
    quantity,
    price,
    productUrl,
    owner: req.user,
  });
  try {
    await product.save();
    return res
      .status(201)
      .json({ product, message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.status(200).json(product);
};
