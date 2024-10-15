import pkg from 'bcryptjs';
const { genSalt, hash,compare } = pkg

class HashUtil {
  async hashPassword(password) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
  async isMatch(password,userpassword){
     const passwordver=await compare(password,userpassword)
     return passwordver
  }
}

export default HashUtil;
