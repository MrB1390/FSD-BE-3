import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     productId: {
        type: Number,
        default: 0
     },
     productName: {
        type: String,
        required: [true, 'productName is required'],
        maxLength: 50,
    },
    productDescription: {
        type: String,
        required: [true, 'productDescription is required'],
        maxLength: 50,
    },
    productPrice: {
        type: String,
        required: [true, 'productPrice is required'],
        maxLength: 50,
    },
    productStatus: {
        type: String,
        enum : ['available','unavailable'],
        default: 'available'
    },
    productImage: {
        data: Buffer,
        contentType: String
    },
    categoryId: {
        type: Number, // Use Number type for categoryId
        required: [true, 'categoryId is required']
    },
    categoryName: String // Define categoryName as a String field
});

productSchema.pre("save", async function (next) {
    try {
      const count = await Product.countDocuments({});
      this.productId= count + 1;
      
       // Fetch category name based on categoryId
       const category = await mongoose.model('category').findOne({ categoryId: this.categoryId });
        
       // If category found, set the categoryName field
       if (category) {
           this.categoryName = category.categoryName;
       } else {
           throw new Error('Category not found');
       }
      
      next();
    } catch (error) {
      next(error);
    }
});
const Product = mongoose.model("product", productSchema);
export default Product;