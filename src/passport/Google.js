import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as dotenv from 'dotenv'
import UserModel from '../Model/User.js';
dotenv.config()

function passportStragety(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3500/api/v1/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            console.log(profile)
            const email = profile.emails[0].value
            await UserModel.findOne({})
            return cb(null, profile);
        }
    ));
}

export default passportStragety