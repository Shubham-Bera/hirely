import UserModel from "../models/user.model.js";
import { jobList } from "../models/jobPortal.model.js";
import { body, validationResult } from "express-validator";

export default class UserController {
  static renderLogin(req, res) {
    res.render('login',{showSearchBar: false, error: null, userEmail: req.session.userEmail, role:req.session.role});
  }
  static renderRegister(req, res) {
    res.render('register',{showSearchBar: false, error: null, userEmail: req.session.userEmail, role:req.session.role});
  }
  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', {
        error: errors.array()[0].msg,
        oldInput: req.body,
        userEmail: req.session.userEmail,
        role:req.session.role
      });
    }
    const {name, email, password, role} = req.body;
    const newUser = UserModel.add({ name, email, password, role });
    console.log(newUser);
    // Redirect to login page 
    res.redirect('/login');
  }

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  
      return res.render('login', { 
        error: errors.array()[0].msg,
        oldInput: req.body, 
        userEmail: req.session.userEmail,
        role:req.session.role
      });
    }
    
    const {email, password, role} = req.body;
    const user = await UserModel.findByEmail(email);
    if (user) {
      if(user.password !== password){
        res.render('login', { error: 'Password do not match',oldInput: req.body,userEmail: req.session.userEmail, role:req.session.role });
      }else if(user.role !== role) {
        res.render('login', { error: 'Invalid Role',oldInput: req.body,userEmail: req.session.userEmail, role:req.session.role }); 
      }else{
       
        req.session.userEmail = email;
        req.session.role = role;
        req.session.userName = user.name;
        res.render("jobs",{jobList, showSearchBar: true, userEmail: req.session.userEmail, role:req.session.role});
      }
    } else {
        res.render('login', { error: 'User not found.',oldInput: req.body, userEmail: req.session.userEmail, role:req.session.role });
    }
  }
  static validate() {
   
    return [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .trim()
        .normalizeEmail(),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .trim()
      ,
      body('confirm')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
    ];
  }
  
  static logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}