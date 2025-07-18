const Product = require('../models/Product');

exports.searchProducts = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i');
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex }
      ]
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
}; 