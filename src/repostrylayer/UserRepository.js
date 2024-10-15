// repositories/UserRepository.js
import User from '../Model/User.js';

class UserRepository {
  async createUser({ name, email, password, phone }) {
    const newUser = new User({
      name,
      email,
      phone,
      password,
    });
    return await newUser.save();
  }
  async findByUserEmail( email ) {
    try {
      
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      console.log('Error finding user by email:', err.message);
      // Re-throw the error if you want to handle it outside the function
      throw err; 
    }
  }
}

export default UserRepository;
