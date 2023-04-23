import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const {Schema} = mongoose;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    userPassword:{
        type: String,
        required: true
    },
    userRole:{
        type: String,
        required: false
    }
});

// Vérification de la connexion de l'utilisateur
userSchema.statics.findUser = async(userEmail, userPassword) => {
    const user = await User.findOne({ userEmail });
    if (!user) {
        throw new Error('Erreur, impossible de se connecter !');
    }
    // On compare le passeword saisie par l'utilisateur et le password hasher dans la bdd
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
        throw new Error('Erreur, impossible de se connecter !');
    }
    return user;
}

// Pour crypter le password dans la bdd
userSchema.pre("save", async function() {
    if (this.isModified("userPassword")) {
        this.userPassword = await bcrypt.hash(this.userPassword, 8);
    }
});

const User = mongoose.model("user", userSchema);

export default User;