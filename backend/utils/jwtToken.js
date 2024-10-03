
import dotenv from "dotenv";
dotenv.config(); 

export const sendToken = (user, statusCode, message, res) => { 
 
  console.log("sendToken function called"); // Check if the function is executed
  // console.log("User object: ", user);

  const token = user.getJWTToken();
  // console.log("Generated JWT: ", token); // Check if token is generated successfully

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
