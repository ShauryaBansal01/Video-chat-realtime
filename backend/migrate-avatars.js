import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./src/models/User.js";

async function migrateAvatars() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users to update`);

    for (const user of users) {
      const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff&bold=true&format=png`;
      await User.findByIdAndUpdate(user._id, { profilePic: newAvatar });
      console.log(`✅ Updated avatar for ${user.fullName}`);
    }

    console.log("\n🎉 All avatars migrated to UI Avatars!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateAvatars();
