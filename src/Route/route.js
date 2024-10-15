import express from 'express';
import AuthController from '../controlelayer/AuthController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/signup', (req, res, next) => authController.signup(req, res, next));;
router.post('/login', (req, res, next) => authController.login(req, res, next));;
export default router;