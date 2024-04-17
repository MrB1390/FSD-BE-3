
import dotenv from 'dotenv';
import Order from '../Models/order.schema.js';



dotenv.config();

export const createOrder = async (req, res) => {
    try {
      const { customerName,customerMail,customerAddress,orderStatus,categoryName,productName,productId,totalPrice,customerId } = req.body; // Destructure fields from req.body
      // Iterate over each productId and create a new order for each
       const orders = await Promise.all(productId.map(async (productId) => {
        const newOrder = new Order({
            customerName,
            customerMail,
            customerAddress,
            orderStatus,
            totalPrice,
            customerId,
            productId, // Use the current productId
        });
        return await newOrder.save(); // Save each order
    }));
      res.status(201).json({
        message: "Order created Successfully",
        data: orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error in Create Order" });
    }
  };
  
  export const getOrderAll = async (req, res) => {
    try {
      const data = await Order.find();
      res.status(200).json({
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error Fetching the Order",
      });
    }
  };

  export const getOrderById = async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.findOne({ orderId: id });
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server Error",
      });
    }
  };

  export const getUserOrderById = async(req,res) => {
    try {
      const id = req.params.id;
      const order = await Order.find({customerId: id});
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server Error",
      });
    }
  }

  export const updateOrderById = async (req, res) => {
    const id = req.params.id;
    const {  customerAddress } =
      req.body;
    try {
      const order = await Order.findOneAndUpdate(
        { orderId: id },
        { customerAddress },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Updated Sucessfully", data: order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const deleteOrderById = async (req, res) => {
    const id = req.params.id;
    try {
      const deleteOrder = await Order.findOneAndDelete({ orderId: id });
  
      if (!deleteOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updateOrderStatusById = async (req, res) => {
    const id = req.params.id;
    const { orderStatus } = req.body; // Assuming the new role is sent in the request body
  
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: id },
        { orderStatus },
        { new: true } // This option ensures that the updated user is returned
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order Status updated successfully", data: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };