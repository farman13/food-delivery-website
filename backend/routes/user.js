const bcrypt = require("bcrypt");
const { z } = require("zod");
const { userModal } = require("../models/Schemas");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "qwerty4090";
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {

    const reqBody = z.object({
        name: z.string().min(3).max(30),
        email: z.string().min(3).max(50).email(),
        password: z
            .string()
            .min(6)
            .refine((password) => /[A-Z]/.test(password), {
                message: "Required atleast one uppercase character",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Required atleast one lowercase character",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Required atleast one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: "Required atleast one special character",
            }),
        location: z.string().min(3).max(30),

    });

    const parsedData = reqBody.safeParse(req.body);

    if (!parsedData.success) {
        console.log("Validation errors:", parsedData.error.issues);
        res.json({
            message: "Incorrect format",
            error: parsedData.error.issues[0].message,
        });
        return;
    }

    try {
        const { name, email, password, location } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);

        await userModal.create({
            name,
            email,
            password: hashedpassword,
            location
        })
        res.json({
            message: "User Signup"
        })
    }
    catch (e) {
        res.status(403).json({
            message: "Signup error "
        })
    }

})

userRouter.post("/login", async function (req, res) {

    const { email, password } = req.body;

    const user = await userModal.findOne({
        email: email,
    })

    const passwordMatch = bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.json({
            message: "User matched",
            token: token
        })
    }
    else {
        res.json({
            message: "Invalid credentials"
        })
    }
})

module.exports = {
    userRouter: userRouter
}