import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    maxlength: [50, 'Brand cannot exceed 50 characters']
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true,
    maxlength: [50, 'Model cannot exceed 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be after 2000'],
    max: [new Date().getFullYear() + 1, 'Invalid year']
  },
  dailyPrice: {
    type: Number,
    required: [true, 'Daily price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  seatingCapacity: {
    type: Number,
    required: [true, 'Seating capacity is required'],
    min: [1, 'At least one seat is required'],
    max: [20, 'Too many seats']
  },
  transmission: {
    type: String,
    required: [true, 'Transmission type is required'],
   
  },
  fuelType: {
    type: String,
    required: [true, 'Fuel type is required'],
   
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description is too long']
  },
  image: {
    type: String,
    default: '', 
  },
}, {
  timestamps: true 
});

export const Product = mongoose.model('Product', productSchema);
