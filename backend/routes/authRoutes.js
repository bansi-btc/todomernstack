const express=require('express');
const router=express.Router();

const {signup}=require('../controllers/signup');
const {login}=require('../controllers/login');
const {getUserDetails}=require('../controllers/getUserDetails');
const {auth}=require('../middlewares/auth');
const {createTodo}=require('../controllers/createTodo');
const {getTodos}=require('../controllers/getTodos');
const {deleteTodo}=require('../controllers/deleteTodo');
const {todoCompleted}=require('../controllers/todoCompleted');


router.post('/signup', signup);
router.post('/login', login);
router.get('/getDetails', auth, getUserDetails);
router.post('/createTodo', createTodo);
router.get('/getTodos', getTodos);
router.delete('/deleteTodo/:id', deleteTodo);
router.put('/todoCompleted/:id', todoCompleted);


module.exports=router;