// // Car Model for AddCar functionality
// export class CarModel {
//   constructor(data = {}) {
//     this.id = data.id || null;
//     this.brand = data.brand || '';
//     this.model = data.model || '';
//     this.year = data.year || '';
//     this.price = data.price || 0;
//     this.seats = data.seats || 0;
//     this.transmission = data.transmission || '';
//     this.fuel = data.fuel || '';
//     this.location = data.location || '';
//     this.image = data.image || '';
//     this.description = data.description || '';
//     this.available = data.available !== undefined ? data.available : true;
//     this.features = data.features || [];
//     this.mileage = data.mileage || 0;
//     this.licensePlate = data.licensePlate || '';
//     this.insurance = data.insurance || '';
//     this.createdAt = data.createdAt || new Date().toISOString();
//     this.updatedAt = data.updatedAt || new Date().toISOString();
//   }

//   // Validation methods
//   validate() {
//     const errors = [];

//     if (!this.brand || this.brand.trim() === '') {
//       errors.push('Brand is required');
//     }

//     if (!this.model || this.model.trim() === '') {
//       errors.push('Model is required');
//     }

//     if (!this.year || this.year < 1900 || this.year > new Date().getFullYear() + 1) {
//       errors.push('Valid year is required');
//     }

//     if (!this.price || this.price <= 0) {
//       errors.push('Price must be greater than 0');
//     }

//     if (!this.seats || this.seats <= 0) {
//       errors.push('Number of seats must be greater than 0');
//     }

//     if (!this.transmission || !['Manual', 'Automatic', 'Semi-Automatic'].includes(this.transmission)) {
//       errors.push('Valid transmission type is required');
//     }

//     if (!this.fuel || !['Petrol', 'Diesel', 'Hybrid', 'Electric'].includes(this.fuel)) {
//       errors.push('Valid fuel type is required');
//     }

//     if (!this.location || this.location.trim() === '') {
//       errors.push('Location is required');
//     }

//     if (!this.licensePlate || this.licensePlate.trim() === '') {
//       errors.push('License plate is required');
//     }

//     return {
//       isValid: errors.length === 0,
//       errors
//     };
//   }

//   // Convert to API format
//   toAPIFormat() {
//     return {
//       brand: this.brand,
//       model: this.model,
//       year: parseInt(this.year),
//       price: parseFloat(this.price),
//       seats: parseInt(this.seats),
//       transmission: this.transmission,
//       fuel: this.fuel,
//       location: this.location,
//       image: this.image,
//       description: this.description,
//       available: this.available,
//       features: this.features,
//       mileage: parseInt(this.mileage),
//       licensePlate: this.licensePlate,
//       insurance: this.insurance
//     };
//   }

//   // Create from API data
//   static fromAPI(data) {
//     return new CarModel({
//       id: data._id || data.id,
//       brand: data.brand,
//       model: data.model,
//       year: data.year,
//       price: data.price,
//       seats: data.seats,
//       transmission: data.transmission,
//       fuel: data.fuel,
//       location: data.location,
//       image: data.image,
//       description: data.description,
//       available: data.available,
//       features: data.features || [],
//       mileage: data.mileage,
//       licensePlate: data.licensePlate,
//       insurance: data.insurance,
//       createdAt: data.createdAt,
//       updatedAt: data.updatedAt
//     });
//   }

//   // Get display price
//   getDisplayPrice() {
//     return `$${this.price}/day`;
//   }

//   // Get full car name
//   getFullName() {
//     return `${this.brand} ${this.model} ${this.year}`;
//   }

//   // Check if car is available
//   isAvailable() {
//     return this.available;
//   }

//   // Get car status
//   getStatus() {
//     return this.available ? 'Available' : 'Not Available';
//   }
// }

// // Validation helper functions
// export const validateCarData = (data) => {
//   const car = new CarModel(data);
//   return car.validate();
// };

// // Default car data for form initialization
// export const getDefaultCarData = () => {
//   return new CarModel({
//     brand: '',
//     model: '',
//     year: new Date().getFullYear(),
//     price: 0,
//     seats: 4,
//     transmission: 'Automatic',
//     fuel: 'Petrol',
//     location: '',
//     image: '',
//     description: '',
//     available: true,
//     features: [],
//     mileage: 0,
//     licensePlate: '',
//     insurance: ''
//   });
// };

// // Transmission options
// export const transmissionOptions = [
//   { value: 'Manual', label: 'Manual' },
//   { value: 'Automatic', label: 'Automatic' },
//   { value: 'Semi-Automatic', label: 'Semi-Automatic' }
// ];

// // Fuel type options
// export const fuelOptions = [
//   { value: 'Petrol', label: 'Petrol' },
//   { value: 'Diesel', label: 'Diesel' },
//   { value: 'Hybrid', label: 'Hybrid' },
//   { value: 'Electric', label: 'Electric' }
// ];

// // Seat options
// export const seatOptions = [
//   { value: 2, label: '2 Seats' },
//   { value: 4, label: '4 Seats' },
//   { value: 5, label: '5 Seats' },
//   { value: 6, label: '6 Seats' },
//   { value: 7, label: '7 Seats' },
//   { value: 8, label: '8 Seats' }
// ];

// // Feature options
// export const featureOptions = [
//   { value: 'Air Conditioning', label: 'Air Conditioning' },
//   { value: 'Bluetooth', label: 'Bluetooth' },
//   { value: 'GPS Navigation', label: 'GPS Navigation' },
//   { value: 'Backup Camera', label: 'Backup Camera' },
//   { value: 'Leather Seats', label: 'Leather Seats' },
//   { value: 'Sunroof', label: 'Sunroof' },
//   { value: 'Cruise Control', label: 'Cruise Control' },
//   { value: 'USB Charging', label: 'USB Charging' },
//   { value: 'Heated Seats', label: 'Heated Seats' },
//   { value: 'All Wheel Drive', label: 'All Wheel Drive' }
// ];

// // API service functions
// export const carAPI = {
//   // Create new car
//   async createCar(carData) {
//     try {
//       const response = await fetch('/api/cars', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(carData.toAPIFormat())
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to create car');
//       }
      
//       return await response.json();
//     } catch (error) {
//       throw new Error(`Error creating car: ${error.message}`);
//     }
//   },

//   // Update existing car
//   async updateCar(carId, carData) {
//     try {
//       const response = await fetch(`/api/cars/${carId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(carData.toAPIFormat())
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to update car');
//       }
      
//       return await response.json();
//     } catch (error) {
//       throw new Error(`Error updating car: ${error.message}`);
//     }
//   },

//   // Get car by ID
//   async getCarById(carId) {
//     try {
//       const response = await fetch(`/api/cars/${carId}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch car');
//       }
      
//       const data = await response.json();
//       return CarModel.fromAPI(data);
//     } catch (error) {
//       throw new Error(`Error fetching car: ${error.message}`);
//     }
//   },

//   // Get all cars
//   async getAllCars() {
//     try {
//       const response = await fetch('/api/cars');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch cars');
//       }
      
//       const data = await response.json();
//       return data.map(car => CarModel.fromAPI(car));
//     } catch (error) {
//       throw new Error(`Error fetching cars: ${error.message}`);
//     }
//   },

//   // Delete car
//   async deleteCar(carId) {
//     try {
//       const response = await fetch(`/api/cars/${carId}`, {
//         method: 'DELETE'
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to delete car');
//       }
      
//       return true;
//     } catch (error) {
//       throw new Error(`Error deleting car: ${error.message}`);
//     }
//   }
// };

// export default CarModel; 