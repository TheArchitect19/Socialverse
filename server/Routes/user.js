const router = require("express").Router();
const User = require("../Models/User.js");
const auth = require("../Middlewares/auth.js");
const { findByIdAndUpdate, findById } = require("../Models/User.js");

//get profile
router.get("/:ID/profile", auth, async (req, res) => {
  try {
    const ID = req.params.ID;
    const isEmail = ID.includes("@");
    const userId = req?.userId;

    if (isEmail) var user = await User.findOne({ email: ID }, { password: 0 });
    else var user = await User.findById(ID, { password: 0 });

    const isFollowing = user?.followers.includes(userId);
    const isMe = userId == user?._id;
    let result;
    if (isFollowing)
      result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        desc: user.desc,
        following: user.following,
        followers: user.followers,
        personalInfo: user?.personalInfo,
        follow: "yes",
      };
    else if (isMe)
      result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        desc: user.desc,
        following: user.following,
        followers: user.followers,
        personalInfo: user?.personalInfo,
        requests: user?.followRequests,
        requestedToFollow: user?.requestedToFollow,
        follow: "yes",
        chat: user?.chat,
        messages: user?.messages,
      };
    else
      result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        desc: user.desc,
        followers: user.followers.length,
        following: user.following.length,
        follow: "no",
      };

    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
});

//follow user
router.get("/:id/follow", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id, {
      followers: 1,
      following: 1,
      followRequests: 1,
      requestedToFollow: 1,
    });

    if (!user) return res.status(404).json({ message: "User doesn't exists!" });
    if (user.followers.includes(userId))
      return res.status(200).json({ message: "You already follow this user!" });
    if (user.followRequests.includes(userId))
      return res.status(200).json({
        message:
          "Requested to follow the user, wait until they accept your request!",
      });

    const thisUser = await User.findById(userId, {
      followers: 1,
      following: 1,
      followRequests: 1,
      requestedToFollow: 1,
    });

    user.followRequests.unshift(userId);
    await user.save();

    thisUser.requestedToFollow.push(id);
    const result = await thisUser.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

//unfollow user
router.get("/:id/unfollow", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id, {
      followers: 1,
      following: 1,
      followRequests: 1,
      requestedToFollow: 1,
    });

    if (!user) return res.status(200).json({ message: "User doesn't exists!" });
    if (
      !(user.followers.includes(userId) || user.followRequests.includes(userId))
    )
      return res.status(200).json({ message: "You don't follow this user!" });
    // if(!user.followRequests.includes(userId)) return res.status(200).json({message:"You don't follow this user!"});

    const thisUser = await User.findById(userId, {
      followers: 1,
      following: 1,
      followRequests: 1,
      requestedToFollow: 1,
    });

    user.followRequests = user.followRequests.filter((u) => u !== userId);
    user.followers = user.followers.filter((u) => u !== userId);
    await user.save();

    thisUser.requestedToFollow = thisUser.requestedToFollow.filter(
      (u) => u !== id
    );
    thisUser.following = thisUser.following.filter((u) => u !== id);
    const result = await thisUser.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

//accept follow request
router.get("/:id/acceptfollow", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id, {
      following: 1,
      requestedToFollow: 1,
    });

    if (!user) return res.status(200).json({ message: "User doesn't exists!" });

    if (!user.requestedToFollow.includes(userId))
      return res
        .status(200)
        .json({ message: "User has not requested to follow you!" });

    const thisUser = await User.findById(userId, {
      followers: 1,
      followRequests: 1,
    });

    user.following.push(userId);
    user.requestedToFollow = user.requestedToFollow.filter((u) => u != userId);

    thisUser.followers.push(id);
    thisUser.followRequests = thisUser.followRequests.filter((u) => u != id);

    await user.save();
    const result = await thisUser.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete follow request
router.get("/:id/deletefollow", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const user = await User.findById(id, { requestedToFollow: 1 });

    if (!user) return res.status(200).json({ message: "User doesn't exists!" });

    if (!user.requestedToFollow.includes(userId))
      return res
        .status(200)
        .json({ message: "User has not requested to follow you!" });

    const thisUser = await User.findById(userId, { followRequests: 1 });

    user.requestedToFollow = user.requestedToFollow.filter((u) => u != userId);

    thisUser.followRequests = thisUser.followRequests.filter((u) => u != id);

    await user.save();
    const result = await thisUser.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//add user chat friend
router.post("/chats", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const newChat = req.body.data;

    const user = await User.findById(userId, { chat: 1 });
    if (!user) return res.status(200).json({ message: "User does not exists" });

    if (user.chat.includes(newChat))
      return res.status(200).json({ message: "chat already in list" });
    const otherUser = await User.findById(newChat, { chat: 1 });

    if (!otherUser.chat.includes(userId)) otherUser.chat.unshift(userId);

    await otherUser.save();

    user.chat.unshift(newChat);
    const result = await user.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get chat messages
router.get("/chats", auth, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId, { chat: 1, messages: 1 });
    if (!user) return res.status(200).json({ message: "User does not exists" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//post chat message
router.post("/chats/messages", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;
    const chatId = data.chatId;

    // const result = await User.findByIdAndUpdate(userId,{$push:{messages:data}});
    const user = await User.findById(userId, { messages: 1 });
    user?.messages?.push(data);

    const result = await user.save();

    data.chatId = userId;
    // await User.findByIdAndUpdate(chatId,{$push:{messages:data}});
    const otheruser = await User.findById(chatId, { messages: 1 });
    otheruser?.messages?.push(data);
    await otheruser.save();

    const newMess = result?.messages[result?.messages?.length - 1];

    res
      .status(200)
      .json({ res: newMess, message: "Message Posted Successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user
router.put("/update", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;

    const result = await User.findByIdAndUpdate(userId, { $set: data });
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete chatUser
router.delete("/chats/:chatId", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const chatId = req.params.chatId;
    const user = await User.findById(userId, { chat: 1, messages: 1 });
    if (!user) return res.status(200).json({ message: "User does not exists" });

    user.chat = user.chat.filter((c) => c != chatId);
    user.messages = user.messages.filter((m) => m.chatId != chatId);

    await user.save();
    const result = user.chat;
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
});

//delete message
router.delete("/chats/:chatId/messages/:messageId", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const chatId = req.params.chatId;
    const messageId = req.params.messageId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { messages: { _id: messageId } } },
      { messages: 1 }
    );
    const other = await User.findByIdAndUpdate(
      chatId,
      { $pull: { messages: { _id: messageId } } },
      { messages: 1 }
    );

    res.status(200).json({ message: "document updated successfully" });
  } catch (error) {
    res.status(501).json(error);
  }
});

router.get("/recommend", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId, { followers: 1, following: 1 });
    let temp = user.followers.concat(user.following);
    temp = [...new Set(temp)];

    const array = await Promise.all(
      temp.map((u) => {
        return User.findById(u, { followers: 1, following: 1 });
      })
    );

    let allUsers = [];
    array.map((u) => {
      allUsers = allUsers.concat(u.followers);
      allUsers = allUsers.concat(u.following);
    });

    // console.log(allUsers);
    let obj = {};
    allUsers.map((u) => {
      if (obj[u]) obj[u] += 1;
      else obj[u] = 1;
    });
    delete obj[userId];

    user.following.map((f) => delete obj[f]);

    let temp2 = Object.entries(obj);
    const finalArray = temp2.sort((a, b) => b[1] - a[1]).slice(0, 10);

    const result = await Promise.all(
      finalArray.map((u) => {
        return User.findById(u[0], { name: 1, profilePicture: 1 });
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post("/friendsprofile", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { list } = req.body;
    // console.log(list);
    const result = await Promise.all(
      list.map((id) => {
        return User.findById(id, { profilePicture: 1, name: 1, email: 1 });
      })
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(501).json(error);
  }
});

router.get("/searchuser/:username/:exact", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { username, exact } = req.params;
    if (exact == "0") {
      let users = await User.find(
        { email: new RegExp("^" + username + ".*") },
        { profilePicture: 1, name: 1, email: 1 }
      ).limit(20);
      res.status(200).json(users);
    } else {
      let users = await User.find(
        { email: username },
        { profilePicture: 1, name: 1, email: 1 }
      );
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(501).json(error);
  }
});

module.exports = router;
