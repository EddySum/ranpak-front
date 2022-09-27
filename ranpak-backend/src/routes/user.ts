import User from '../models/User';
import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import Session from '../models/Session';
import { authenticate } from '../middlewares/auth';
const cors = require('cors')



const router = Router();
const saltRounds = 3; // 12+ for production. Will be used in register route

router.post('/login', cors(),  async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
  
    const user = await User.findOne({email}).select('+password');
  
    if (user) {
      const passMatched = await bcrypt.compare(password, user.password);
      if (passMatched) {
        const session = await Session.create({userID: user._id});
        res.cookie('session', session._id, { signed: true, httpOnly: true });
        
        return res.status(200).json({});
      }
    }
  
    return res.status(422).json({
      errMsg: 'Incorrect Username or Password'
    });
  } catch(e) {
    return res.status(400).json(e);
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

      const userExists = await User.findOne({email});
      if(userExists) return res.status(422).json({errMsg: 'A user with this email already exists'});

      if (!(/^(?=.*[(*@%$)])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password))) {
          return res.status(422).json({errMsg: `${password} is not a valid password. Please ensure the password matches the following rules: \n \t A special character must be included: (*@%$) \n\t * At least one capital letter \n\t * At least one number`}) 
      }

      

    
      const hashedPass = await bcrypt.hash(password, saltRounds);
  
      const user = await User.create({
        email: email,
        password: hashedPass
      })
  
      return res.status(200).json({});
    } catch(e) {
      res.status(400).json(e);
    }
});

router.get('/', [authenticate()], async (req: Request, res: Response) => {
  try {
      const userID = res.locals.userID;
  
      const user = await User.findById(userID);

      if(!user) throw Error();
      const userInfo = {
        id: user.id,
        email: user.email,
      }

      return res.status(200).json(userInfo);
    } catch(e) {
      return res.status(400).json(e);
    }
});


router.post('/logout', [authenticate()], async (req: Request, res: Response) => {
  if (req.signedCookies && req.signedCookies['session']) {
    const session = await Session.findByIdAndDelete(req.signedCookies['session']);
    res.clearCookie('session');
    if (session) {
      return res.status(200).json({});
    }
  }
  return res.status(400).json();
});


module.exports = router;