import { Router } from "express";
import { client } from "../utils/db.js";



const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const products = await client.collection('products').find().toArray();
    res.status(200).json({
        "data": products
    });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
    const products = { 
        name: req.body.name, 
        price: req.body.price, 
        image: req.body.image, 
        description: req.body.description,
        category: req.body.category,
        createdAt: new Date(),
        updatedAt: new Date()
    };
const result = await client.collection('products').insertOne(products);
    res.status(201).json({message: "Product has been created successfully", result});
});

productRouter.put("/:id", async (req, res) => {
    const result = await client.collection('products').updateOne(
        { _id: req.params.id },
        { $set: {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            category: req.body.category,
            createdAt: new Date(),
            updatedAt: new Date()
        }}
    );
    res.status(200).json({
        "message": "Product has been updated successfully",
        "result": result
    });
});

productRouter.delete("/:id", async (req, res) => {
    const result = await client.collection('products').deleteOne({ _id: req.params.id });
    res.status(200).json({
        "message": "Product has been deleted successfully",
        "result": result
    });
});

export default productRouter;
