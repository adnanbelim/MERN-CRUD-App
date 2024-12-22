// userService.js
import User from '../model/user';

// Create a functional version of the user service
const UserServices = async (name, email, phone) => {
    try {
        const newUser = new User({ name, email, phone });
        return await newUser.save();
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error; // You can throw an error to handle it in the calling component
    }
};

export default { UserServices };
