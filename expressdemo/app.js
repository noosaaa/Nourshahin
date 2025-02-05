// Importing necessary libraries
const express = require("express");
const cors = require("cors"); // For handling Cross-Origin Resource Sharing (CORS)
const path = require("path");
const mongoose = require("mongoose");
const Ajv = require("ajv").default;
const cookieParser = require("cookie-parser");
// Setting up the application
const app = express();
const port = process.env.PORT || 4000;
//third party
const helmet = require("helmet");
const ejs =require("ejs");
const logging = require("./middlewares/logging");
const studentRoutes = require("./Routes/Student");// Middleware to parse incoming POST requests as JSON or URL Encoded
const { type } = require("os");
const userRouter = require("../routes/User");
const authRouter=require("../routes/auth")
const config=require("config");
const adminRouter = require("./Routes/admin");
// const errorMw =  require("./middlewares/errorMW")
// process.on("uncaughtException",(exception)=>{
//     console.log("uncaught exception")
//     process.exit(1);
// });

// process.on("unhandledRejection",(exception)=>{
//     console.log("Promise rejected")
//     process.exit(1);
// });
// //const url = "mongodb+srv://nadasamirsadek:icFbg2WekKbGK_C@learn-mongo-db.a9kvu.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
// رابط الاتصال بـ MongoDB (تأكد من أنه يبدأ بـ mongodb+srv://)
const url = "mongodb+srv://nour:Nos2292002***@node.f5zgw.mongodb.net/Atmradar?retryWrites=true&w=majority&appName=node";

// الاتصال بـ MongoDB باستخدام Mongoose بدون خيارات deprecated
mongoose.connect(url)
.then(() => {
    console.log("MongoDB server started successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err); // عرض رسالة خطأ واضحة في حالة الفشل
});



//throw Error("Couldn't connect to Mongo");//handleld by process


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors()); // Allow requests from different origins
app.use(express.static(path.join(__dirname, "public"))); // Serve static files like HTML, CSS, and JS
app.use(cookieParser());
app.use(helmet());
app.use("/api/Students", studentRoutes);
app.use(logging);
app.use("/api/Users", userRouter);
app.use("/api/login",authRouter);
app.use("/api/admin",adminRouter);

// let p = Promise.reject(new Error("Something went wrong"));

// p.then(()=>{
//     console.log("success")
// })

app.listen(port, () => {
    console.log(`Listening to ${port}`); // Log that the server is running
});


// app.use(errorMw);

    // mongoose
    // .connect("mongodb://localhost:27017/University", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // })
    // .then(() => {
    // console.log("Connected to MongoDB successfully!");
    // })
    // .catch((err) => {
    // console.error("Error connecting to MongoDB:", err.message);
    // });


// const schema = {
//     type: "object",
//     properties: {
//         name: { 
//             type: "string",
//             pattern: "^[A-Z][a-z]*$" // يجب أن يبدأ الاسم بحرف كبير
//         },
//         department: { 
//             type: "string",
//             //enum: ["SD", "SA", "MD"], // يجب أن يكون القسم أحد هذه القيم
//             // maxLength: 2,
//             // minLength: 2
//         },
//     },
//     required: ["name", "department"],
    
// };


// const ajv = new Ajv();
// let validator = ajv.compile(schema);



// JSON Schema validation
// const schema = {
//         name: { 
//             type: "string",
//             pattern: "^[A-Z][a-z]*$" // يجب أن يبدأ الاسم بحرف كبير
//         },
//         department: { 
//             type: "string",
//         },
//         id:
//         {
//             type: Number,
//             required: true
//         }
//     };

// const Students = [
//     { name: 'Ali', dept: 'PD', id: 1 },
//     { name: 'Nour', dept: 'SA', id: 2 },
//     { name: 'Mona', dept: 'MD', id: 3 },
//     { name: 'Sara', dept: 'SAP', id: 4 },
//     { name: 'Mostafa', dept: 'EB', id: 5 },
//     { name: 'Ahmed', dept: 'GD', id: 6 },
//     { name: 'Noha', dept: 'GA', id: 7 },
// ];


// Array of students data


// **GET: Serve the main HTML page**
// **GET: Serve the main HTML page**
// app.get("/", (req, res) => {
//     console.log("Request Received...");
//     res.sendFile(path.join(__dirname, "main.html")); // Sending the main HTML file from expressdemo
// });

// // app.set("template engine","ejs");

// // // **GET: Retrieve all students**
// app.get("/api/Students", (req, res) => {
//     // Return the list of students as JSON
//     //res.json(Students);
//     res.set("Access-control-Allow-Origin","*");
//     res.render("Students.ejs",{std:students});
// });
// app.param("id",(req,res,nxt,val)=>
// {
//     //validation of parameter
//     if(Number(val)){
//             req.id=val;
    
//     nxt();
//     }
//     else{
//         res.send("invalid id");
//     }
//     //add param as prop for req

// });

// // **GET: Retrieve a specific student by ID**
// app.get("/api/Students/:id", (req, res) => {
    
//     let id=req.id;//let id = req.params.id; // Extract the ID from the request parameters
//     const std = Students.find((val) => val.id == id); // Find the student by ID

//     if (std) res.json(std); // If found, return the student data
//     else res.status(404).send("Student not found"); // Return 404 if not found
// });


// // **POST: Add a new student**
// app.post("/api/Students", (req, res) => {
//     let valid = validator(req.body);
//     if (valid) {
//         req.body.id = Students.length + 1;
//         Students.push(req.body);
//         res.json(req.body);
//     } else {
//         res.status(403).send("Forbidden command");
//     }
// });

// // **PUT: Update an existing student's details**
// app.put("/api/Students/:id", (req, res) => {
//     let idx = Students.findIndex((val) => val.id == req.params.id); // Find the student by ID
//     if (idx != -1) {
//         for (let i in req.body) {
//             Students[idx][i] = req.body[i]; // Update student fields with new data
//         }
//         res.json(Students[idx]); // Return the updated student data
//     } else {
//         res.status(404).send("Student not found..update is not allowed"); // Return 404 if student doesn't exist
//     }
// });

// // **DELETE: Remove a student by ID**
// app.delete("/api/Students/:id", (req, res) => {
//     let idx = Students.findIndex((val) => val.id == req.params.id); // Find the student by ID
//     if (idx != -1) {
//         Students.splice(idx, 1); // Remove the student from the array
//         res.send("One element affected"); // Send a success message
//     } else {
//         res.status(404).send("Student not found"); // Return 404 if student doesn't exist
//     }
// });

// // **POST: Handle form submission from an HTML page**
// app.post("/welcome.html", (req, res) => {
//     console.log(req.body); // Log the submitted form data to the server console
//     //to encryption but not safe completely 
//     // سهل اننا نعمل ديكودينج عشان عارفين انه استخدم bas64 ف دا مش سيف اوي
//     // atob()
//     res.cookie("usernm", Buffer.from(req.body.fnm).toString('base64'));
//     res.cookie("userage", 25, { httpOnly: true });

//     res.send(`THANKS ${req.body.fnm} ${req.body.lnm} FOR SENDING DATA`); // Respond with a thank you message
// });

// app.get("/abc",(req,res)=>{
//     //decoding
//     console.log(Buffer.from(req.cookies.usernm,'base64').toString());
//     console.log(req.cookies.age);
//     res.sendStatus(200);
// })

// **Start the server**