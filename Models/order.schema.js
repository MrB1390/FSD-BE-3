import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
      type: Number,
      default: 0
    },
    customerName: {
        type: String,
        required: [true, 'customerName is required'],
        maxLength: 50,
    },
    customerId: {
        type: Number,
    },
    customerMail: {
        type: String,
        required: [true, 'customerMail is required'],
        maxLength: 50,
    },
    customerAddress: {
        type: String,
        required: [true, 'customerAddress is required'],
        maxLength: 50,
    },
     orderStatus: {
        type: String,
        enum : ['placed','not-placed'],
        default: 'placed'
    }, 
    totalPrice:{
          type: Number,
          required: [true, 'totalPrice is required'],
    },  
    productId: [{
        type: Number, // Change the type to Number
        required: [true, 'productId is required']
    }],
    categoryName: String,
    productName: String
});

orderSchema.pre("save", async function(next) {
    try {
        const count = await Order.countDocuments({});
        this.orderId = count + 1;
        //Fetch Category and Product Name based on productId
        const products = await mongoose.model('product').findOne({ productId: this.productId });

        if(products ){
            // Concatenate category names and product names
            this.categoryName = products.categoryName
            this.productName = products.productName
        } else {
            console.error("Product(s) not Found");
        }
        next();
    } catch (error) {
        next(error);
    }
  });
  
  
  
  const Order = mongoose.model('order',orderSchema);
  export default Order;