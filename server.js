const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('movies.json'); 
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login',(req,res)=>{
    const {username,password} = req.body;
    const users = router.db.get('users').value();
    const user = users.find(user=>user.username===username && user.password===password)

    if (user) {
        res.status(200).json({ success: true, message: 'Login successful', user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
})

server.post('/register',(req,res)=>{
    const {username,password} = req.body;
    const users = router.db.get('users').value();
    if(users.some(user => user.username === username)){
        res.status(400).json({ success: false, message: 'Username already exists' });
    }
    else{
        const newUser = { id: Date.now(), username, password, movies: [] };
        router.db.get('users').push(newUser).write();
        res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
    }
})

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});