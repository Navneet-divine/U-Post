if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ejsMate = require('ejs-mate');
const User = require("./models/users");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo');


const userRoute = require("./routes/users");
const profileRoute = require("./routes/profile");
const multerRoute = require("./routes/multer");
const postRoute = require("./routes/post");
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/pinterest';

mongoose.connect(dbUrl)
.then(() => {
    console.log("CONNECTION OPEN!")
}).catch(() => {
    console.log("CONNECTION ERROR!")
})



app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


const secret = process.env.SECRET || "somesecret"


const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 *60 * 60,
});

store.on("error", function(e) {
    console.log("SESSION STORE ERROR",e)
});

const sessionConfig = {
    store,
    secret,
    resave:false,
    saveUninitialized:false,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.engine('ejs', ejsMate);


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/",userRoute);
app.use("/",profileRoute);
app.use("/",multerRoute);
app.use("/",postRoute);

app.get("/login",(req,res) => {
    res.render("/users/login")
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

  
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});










