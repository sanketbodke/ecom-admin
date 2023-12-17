import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const loginUser = asyncHandler(async (req, resp) => {
  // get details from frontend
  const { username, password } = req.body;

  // validation
  const registeredUser = await User.findOne({ username });

  if (!registeredUser || !registeredUser.isPasswordCorrect(password)) {
    throw new ApiError(401, "Invalid username or password");
  }

  return resp.status(200).json(
    new ApiResponse(200, { username: username }, "User Login Successful")
  );
});

export { loginUser };
