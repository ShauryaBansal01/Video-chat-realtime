import FriendRequest from '../models/FriendRequest.js';
import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';
export async function getRecommendedUsers(req, res) {
    try {
        const currectUserId = req.user.id;
        const currectUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currectUserId } }, // Exclude current user
                { $id: { $nin: currectUser.friends } }, // Exclude friends of current user
                { isOnBoarded: true } // Only include users who are onboarded
            ]
        })

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error fetching recommended users controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select('friends')
        .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Erro fetching getMyFriends controller:");
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function sendFriendRequest(req , res) {
     try  {
        const myId = req.user.id;
        const { id: recipientId } = req.params;
        if(myId === recipientId) {
            return res.status(400).json({message: "You cannot send a friend request to yourself"});
        }
        // Check if recipient exists
        const recipient = await User.findById(recipientId);
        if(!recipient) {
            return res.status(404).json({message: "Recipient not found"});
        }
        // Check if recipient is already a friend
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already friends with this user"});
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });
        // Check if a friend request already exists between the two users
        if(existingRequest) {
            return res.status(400).json({message: "Friend request already exists"});
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });
        // Optionally, you can also send a notification to the recipient here
        res.status(201).json(friendRequest);
     } catch (error) {

        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
        
     }
}