// services/AuthService.js
import HashUtil from '../utilitylayer/HashUtil.js';
import UserRepository from '../repostrylayer/UserRepository.js';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../utils/config.js';

class AuthService {
  constructor() {
    this.hashUtil = new HashUtil();
    this.userRepository = new UserRepository();
  }

  async signupUser({ name, email, password, phone }) {
    
    const hashedPassword = await this.hashUtil.hashPassword(password);
    
    
    const newUser = await this.userRepository.createUser({ name, email, password: hashedPassword, phone });

    
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, String(process.env.JWT_KEY), { expiresIn: '1h' });

    return { token };
  }
  async loginuser({ email, password }) {
    try {
      
      const user = await this.userRepository.findByUserEmail(email);

      
      if (!user) {
        return { userVer: false };
      }

      
      const passwordVer = await this.hashUtil.isMatch(password, user.password);

      
      if (!passwordVer) {
        return { passVer: false };
      }

    
      return { user };
    } catch (err) {
      console.log('Error logging in user:', err.message);
      throw err;
    }
  }
}
  


export default AuthService;
