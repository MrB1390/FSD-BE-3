import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        default: 0
    },
    categoryName: {
        type: String,
        required: [true, 'categoryName is required'],
        maxLength: 50,
    },
    categoryImage: {
        data: Buffer,
        contentType: String
    }
})

categorySchema.pre("save", async function (next) {
    try {
      const count = await Category.countDocuments({});
      this.categoryId= count + 1;
      next();
    } catch (error) {
      next(error);
    }
  });

const Category = mongoose.model("category", categorySchema);
export default Category;