import { generateStreamToken, upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

export async function getStreamToken(req, res) {
  try {
    // Upsert the current user to Stream
    await upsertStreamUser({
      id: req.user._id.toString(),
      name: req.user.fullName,
      image: req.user.profilePic || "",
    });

    // Also sync all friends to Stream so they exist before channel creation
    const currentUser = await User.findById(req.user._id).populate("friends");
    if (currentUser?.friends?.length > 0) {
      for (const friend of currentUser.friends) {
        await upsertStreamUser({
          id: friend._id.toString(),
          name: friend.fullName,
          image: friend.profilePic || "",
        });
      }
    }

    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}