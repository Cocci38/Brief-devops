import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    ownedByCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
});

const Product = mongoose.model("product", productSchema);

export default Product;