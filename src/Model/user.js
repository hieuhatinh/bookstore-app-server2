import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { imgSchema } from './Product.js'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: imgSchema,
    role: {
        required: false,
        type: String,
        default: 'user',
        enum: ['user', 'seller'],
    },
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(
        this.password,
        parseInt(process.env.SALT_ROUNDS),
    )
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model('users', userSchema)

export default UserModel
