import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect("___URL___", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
};

export default connect;