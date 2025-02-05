const mongoose = require('mongoose');
const valid = require("validator");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const config = require("config");
// 1. إنشاء schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (val) => {
                    return valid.isEmail(val);  // التحقق من أن البريد الإلكتروني صالح
                },
                message: '{VALUE} is not a valid email'
            }
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true,
            minLength: 5
        }
    }
    // { timestamps: true }  
);

userSchema.method("genAuthToken",function(){
    const token = jwt.sign({
        userid:this._id,
        adminRole:this.isAdmin
    },config.get("jwtsec"));

    return token;
});
// 2. إنشاء موديل للـ User مع تحديد اسم الكولكشن
const User = mongoose.model("User", userSchema, "User");  // التأكد من اسم الكولكشن "Users"

// 3. تصدير الـ User
module.exports = User;

