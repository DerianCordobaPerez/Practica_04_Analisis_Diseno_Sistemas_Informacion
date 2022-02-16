import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    quantity: {
      type: Number,
    },
  },
  {
    collection: 'Products',
    timestamps: true,
  },
)

export default model('Product', productSchema)