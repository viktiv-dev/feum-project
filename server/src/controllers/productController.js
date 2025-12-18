const productService = require('../services/productService');

async function getProduct(req, res) {
    try {
        const product = await productService.getProduct(req.params.id);
        res.json(product)
    }
    catch (error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch product'});
    }
}

async function createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({error: "Failed to create product"})
    }
}

async function deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({message: "Product has been deleted"})
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({error: error.message})
    }
}

async function updateProduct(req, res) {
    try {
      await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({message: 'Product was updated'})
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to update product'})
    }
}

async function getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to fetch all products"})
    }
}

module.exports = {
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct
}