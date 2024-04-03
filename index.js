const port = 4000;
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(cors());

// connection in db

mongoose.connect('mongodb+srv://uttamjagani126:7122003uttam@cluster0.t0yb9rx.mongodb.net/ags');

app.get('/', (req, res) => {
    res.send('App is Running.');
})

const SlotBook = mongoose.model('Slot_Book', {
    state: String,
    city: String,
    company: String,
    model: String,
    services: Array,
    date: Date,
    time: String,
});

// Endpoint to receive form data and store in MongoDB
app.post('/bookSlot', async (req, res) => {
    const { state, city, company, model, services, dateTime } = req.body;

    try {
        const newSlot = new SlotBook({
            state,
            city,
            company,
            model,
            services,
            date: new Date(dateTime),
            time: new Date(dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        });

        await newSlot.save();
        res.json({ success: true, message: 'Slot booked successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error booking slot' });
    }
});



// LoginPage Data Schema for user model

const Users = mongoose.model('Users', {
    username: {
        type: String,
    },
    email: {
        type: String,
        Unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});


// creating User for Registration End Point .....

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, erroes: "Existing User Found with same email id." })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ags')
    res.json({ success: true, token })
});


//cretaing end point of userLogin....

app.post('/login', async (req,res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {

        const passComapre = req.body.password === user.password;
        if (passComapre) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ags');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "wrong Password" })
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

// Endpoint to fetch user data
app.post('/user', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'secret_ags');
  
      const user = await Users.findById(decoded.user.id);
      if (!user) {
        throw new Error('User not found');
      }
  
      res.json({ success: true, name: user.username });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
  });
  
  

app.listen(port, (err) => {
    if (!err) {
        console.log(`server runing in port : ${port}`);
    } else {
        console.log('Error' + err);
    }
})

