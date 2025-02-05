const validator = require("../util/StudentValidator");

module.exports = (req, res, next) => {
    const valid = validator(req.body); // نتحقق من البيانات باستخدام ajv
    if (valid) {
        req.valid = 1;
        next(); // البيانات صحيحة، ننتقل إلى الخطوة التالية
    } else {
        console.log(validator.errors); // سجل الأخطاء لتسهيل تشخيص المشكلة
        res.status(403).send("Forbidden command"); // البيانات غير صحيحة، نعيد رسالة الخطأ
    }
};
