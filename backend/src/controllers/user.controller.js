import FriendRequest from '../models/FriendRequest.js';
import User from '../models/User.js';
import FriendRequests from '../models/FriendRequest.js';
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

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        // Check if the current user is the recipient of the friend request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }
        // Add the sender to the recipient's friends list
        friendRequest.status = "accepted";
        await friendRequest.save();

        //add each user to the other's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted"});

    } catch (error) {
        console.error("Error accepting friend request:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }

}


export async function getFriendRequest(req, res) {
    const incomingRequests = await FriendRequest.find({
        recipient: req.user.id,
        status: "pending"
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await FriendRequest.find({
        sender: req.user.id,
        status: "accepted"
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingRequests, acceptedRequests });
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}