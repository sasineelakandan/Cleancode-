
import AuthService from '../servicelayer/AuthService.js'

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async signup(req, res, next) {
    try {
      const { name, email, password, phone } = req.body;
      const result = await this.authService.signupUser({ name, email, password, phone });

      res.status(200).cookie('token', result.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000, 
      }).send({
        message: 'User registered successfully!',
   
      });
      
    } catch (err) {
      res.status(500).json({ error: err.message || 'An error occurred during signup.' });
    }
  }
  async login(req,res,next){
    try{
     const {email,password}=req.body;
     const result=await  this.authService.loginuser({email,password})
     res.send(result)
    }catch(err){
      console.log(err)
    }
  }
}

export default AuthController;
