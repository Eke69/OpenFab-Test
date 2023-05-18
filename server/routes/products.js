var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const productModel = require('../products.model');

const fakeProducts = [{
    id: '123',
    name: 'Old Boat',
    description: 'A very old boat. Bargain price',
    price: 700,
}, {
    id: '345',
    name: 'Computer',
    description: 'From the 1990s, a classic!',
    price: 50,
}, {
    id: '456',
    name: 'Basketball Hoop',
    description: 'Good condition, free delivery',
    price: 100,
}];

router.get('/seed', async function(req, res, next) {
    const productsCount = await productModel.countDocuments();
    if (productsCount > 0) {
        res.send('aborted');
        return;
    } else {
        await productModel.create(fakeProducts);
        res.send('seeded successfully');
    }
    
  });

/* GET products listing. */
router.get('/', async (req, res) => {
    const products = await productModel.find();
      res.send(products);
  });

/* GET product by id. */
router.get("/:id", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    })

/* CREATE products listing. */
router.post('/add', async function(req, res, next) {
    const product = new productModel(req.body);
    try {
        const response = await product.save();
        response && res.send({status: 200, message: 'Product created successfully', product: product});
    } catch (error) {
        res.send({status: 500, message: 'Unable to create product'});
    }
  });

/* UPDATE products listing. */
router.patch('/edit/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const product = req.body;
        const options = { new: true };
        const response = await productModel.findByIdAndUpdate(id, product, options);
        res.send({status: 200, message: 'Product updated successfully', response});
    } catch (error) {
        res.send({status: 500, message: error.message || 'Unable to update product'});
    }
  });

/* delete products listing. */
router.delete('/delete/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = await productModel.findByIdAndDelete(id)
        res.send({status: 200, message: `Document with id ${id} has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  });

module.exports = router;
