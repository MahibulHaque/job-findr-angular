const { v4 } = require('uuid');

interface SignUpUserInterface {
  username: string;
  email: string;
  dob: Date | string;
  country: string;
  password: string;
}

interface SignInUserInterface {
  email: string;
  password: string;
}

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config.js');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', async (req, res, next) => {
  try {
    const user: SignInUserInterface = req.body;

    const findUser = db.users.filter((u) => u.email === user.email)[0];
    if (!findUser) {
      return res.status(400).send({ error: '404', message: 'User not found' });
    } else {
      const passwordMatch = await bcrypt.compare(
        user.password,
        findUser.password
      );
      if (passwordMatch) {
        const accessToken = jwt.sign({ id: findUser.id }, JWT_SECRET, {
          expiresIn: '2 days',
        });
        return res.status(200).send({ accessToken });
      } else {
        return res.status(403).send({ error: '403', message: 'Wrong Password' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Something went wrong' });
    next();
  }
});

server.post('/register', async (req, res, next) => {
  const user: SignUpUserInterface = req.body;

  try {
    if (!user) {
      throw new Error('No user data provided');
    }
    const findUser = db.users.filter((u) => u.email === user.email);
    console.log(findUser);
    if (findUser.length > 0) {
      res
        .status(409)
        .send({ error: '409', message: 'An user exists with email' });
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      const newUserId = v4();

      const newUser = { ...user, id: newUserId };

      db.users.push(newUser);
      fs.writeFileSync('./server/db.json', JSON.stringify(db, null, 2));

      const accessToken = jwt.sign({ id: newUserId }, JWT_SECRET, {
        expiresIn: '2 days',
      });
      res.status(201).send({ accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error, message: 'Could not create user' });
    next();
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user) {
  delete user.password;
  user.role = user.username === 'admin' ? 'admin' : 'user';
  return user;
}

function checkIfAdmin(user, bypassToken = false) {
  return user.username === 'admin' || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

function isAuthorized(req) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users;
  return users;
}
