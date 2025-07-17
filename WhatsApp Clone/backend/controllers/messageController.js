import { 
  // storage, upload,
  cloudinary } from "../utils/media.js";
import { Message } from "../models/MessageModel.js";
import { Chat } from "../models/chatModel.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path'


function sanitizeFilename(name) {
  return name
    .replace(/\s+/g, '_')           
    .replace(/[()]/g, '')           
    .replace(/[^a-zA-Z0-9._-]/g, '')
}

    const getFormatFromMimetype = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    return 'document';
    };

// Send Message 

export const sendMessage = async (req, res) => {

  try {
    const { content, receiverId, clientMessageId, chatType } = req.body;
    const senderId = req.user._id;

    console.log('receiver: ', receiverId)
    let chat;
    let isNewChat = false;

    // Handle Group Chat
    if (chatType === 'group') {
      chat = await Chat.findOne({ _id: receiverId, type: 'group' });

      if (!chat) {
        console.log(receiverId)
        console.log('GROUP CHAT NOT FOUND')
        return res.status(404).json({
          success: false,
          message: 'Group chat not found'
        });
      }
    } 
    
    // Handle Individual Chat
    else {
      chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId] },
        type: 'individual'
      });
      console.log('chat exis: ', chat)
      
      // Check if user soft-deleted the chat
      if(chat){
        const receiverSoftDeleted = chat.softDeletedBy.includes(receiverId)

        if(receiverSoftDeleted){
          chat.softDeletedBy = chat.softDeletedBy.filter(id=> id.toString() !== receiverId.toString());
          await chat.save();
        }
      }
       else {
          // No existing chat found — create one
          chat = await Chat.create({
            type: 'individual',
            participants: [senderId, receiverId],
          });
          console.log('new chat: ', chat)
          isNewChat = true;
        }
      }
    // 3️⃣ Handle Media Uploads (optional)
    let media = [];
    if (req.files) {
      media = await Promise.all(req.files.map(async (file) => {
          const extension = '.' + (file.originalname.split('.').pop() || '').toLowerCase();
          const sanitizedName = sanitizeFilename(file.originalname.replace(extension, ''));
          const fileType = file.mimetype.split('/')[0];

    // const fileType = file.mimetype.split('/')[0];
    // const originalFilename = path.parse(file.originalname).name;
    // const extension = path.parse(file.originalname).ext.toLowerCase();
    // const sanitizedName = sanitizeFilename(originalFilename);

    // const uploadOptions = {
    //   folder: 'whatsapp-clone',
    //   use_filename: false,
    //   unique_filename: false,
    //   overwrite: false,
    // };


    // // Set resource_type based on content
    // if (fileType === 'image') {
    //   uploadOptions.resource_type = 'image';
    //   uploadOptions.public_id = sanitizedName.replace(/\.[^/.]+$/, '');
    // } else if (fileType === 'video' || fileType === 'audio') {
    //   uploadOptions.public_id = sanitizedName.replace(/\.[^/.]+$/, '');
    //   uploadOptions.resource_type = 'video'; // ✅ audio treated as video
    // } else {
    //   uploadOptions.resource_type = 'raw';
    //   uploadOptions.public_id = sanitizedName + extension; 
    // }


    // if (fileType === 'image') {
    //   uploadOptions.responsive_breakpoints = {
    //     create_derived: true,
    //     bytes_step: 20000,
    //     min_width: 200,
    //     max_width: 1000,
    //   };
    // } else if (fileType === 'video' || fileType === 'audio') {
    //   uploadOptions.quality = 'auto';
    // }

    // const uploadResult = await cloudinary.uploader.upload(file.path, uploadOptions);
    
    // console.log('upllll: ', uploadResult)

  //   const downloadUrl =  cloudinary.url(uploadResult.public_id, {
  //   secure: true,
  //   resource_type: uploadResult.resource_type,
  //   flags: 'attachment',
  //   attachment: `${sanitizedName}${extension}`
  // });

  // const displayUrl = cloudinary.url(uploadResult.public_id, {
  // secure: true,
  // resource_type: uploadResult.resource_type,
  // });


      const downloadUrl = cloudinary.url(file.filename, {
      secure: true,
      resource_type: file.resource_type,
      flags: 'attachment',
      attachment: `${sanitizedName}${extension}`,
    });

    const displayUrl = cloudinary.url(file.filename, {
      secure: true,
      resource_type: file.resource_type,
    });


    // const mediaItem = {
    //   url: downloadUrl,
    //   displayUrl,
    //   format: fileType === 'application' ? 'document' : uploadResult.resource_type,
    //   filename: file.originalname,
    //   type: file.mimetype,
    //   size: file.size,
    //   originalExtension: file.originalname.split('.').pop().toLowerCase()
    // };


    console.log('resource_type: ', getFormatFromMimetype(file.mimetype))
    const mediaItem = {
      url: downloadUrl,
      displayUrl,
      format: getFormatFromMimetype(file.mimetype),
      filename: file.originalname,
      type: file.mimetype,
      size: file.size,
      originalExtension: extension.replace('.', ''),
    };

    // console.log('MEDIAAAA: ', mediaItem)
    // Add dimension data for visual media
    // if (['image', 'video'].includes(fileType)) {
    //   mediaItem.width = uploadResult.width;
    //   mediaItem.height = uploadResult.height;
      
    //   if (fileType === 'image' && uploadResult.responsive_breakpoints) {
    //     mediaItem.breakpoints = uploadResult.responsive_breakpoints[0]?.breakpoints || [];
    //   }
    // }

    // // Add duration for audio/video
    // if (['video', 'audio'].includes(fileType) && uploadResult.duration) {
    //   mediaItem.duration = uploadResult.duration;
    // }

        if (['image', 'video'].includes(file.resource_type)) {
      if (file.width) mediaItem.width = file.width;
      if (file.height) mediaItem.height = file.height;
    }

    if (['video', 'audio'].includes(file.resource_type)) {
      if (file.duration) mediaItem.duration = file.duration;
    }

    // console.log('mediaItem: ', mediaItem)
    return mediaItem;
  }));
}

let resolvedType = 'text';

if (media.length) {
  const formats = [...new Set(media.map(m => m.format))];
  
  if (formats.length === 1) {
    resolvedType = formats[0] === 'raw' ? 'document' : formats[0];
  } else {
    resolvedType = 'media';
  }
}


  console.log('media obj: ', media)
    // 4️⃣ Create Message
    const message = await Message.create({
      chat: chat._id,
      sender: senderId,
      receiver: chat.participants.filter(id => id.toString() !== senderId.toString()),
      type: resolvedType,
      content: media.length ? null : content,
      media,
      status: 'sent',
      clientMessageId: clientMessageId || uuidv4(),
      isOptimistic: !!clientMessageId,
      deliveredAt: new Date()
    });

    // Ensure unreadCounts array includes recipient(s)
    const receivers = chat.participants.filter(id => id.toString() !== senderId.toString());


    // Update chat with unread count + latest message
    const updatedChat = await Chat.findByIdAndUpdate(
      chat._id,
      {
        $inc: {
          'unreadCounts.$[elem].count': 1
        },
        $set: {
          latestMessage: message._id
        }
      },
      {
        arrayFilters: [{ 'elem.user': { $in: receivers } }],
        new: true
      }
    ).populate([
      { path: 'participants', select: 'username avatar Phone isOnline status' },
      { path: 'unreadCounts.user', select: 'username avatar Phone isOnline status' },
      {
        path: 'latestMessage',
        populate: { path: 'sender receiver readBy deliveredTo' }
      }
    ]);

    console.log('ne mess: ', message)
    // 7️⃣ Populate the new message for UI response
    const populatedMessage = await Message.findById(message._id)
      .populate('sender')
      .populate('receiver')
      .populate('chat')
      .populate('readBy')
      .populate('deliveredTo');

      // console.log('UPDATED: ', updatedChat)
      // console.log('MESSAGE: ', populatedMessage)
    // 8️⃣ Emit socket events

    console.log('MEDIAAAA: ', populatedMessage)
    req.io.to(chat._id.toString()).emit('new_message', {
      message: populatedMessage,
      chat: updatedChat
    });

    if (isNewChat && chat.type === 'individual') {
      receivers.forEach(receiver =>
        req.io.to(receiver.toString()).emit('new_chat', updatedChat)
      );
    }

    return res.status(201).json({
      success: true,
      message: populatedMessage,
      chat: isNewChat ? updatedChat : undefined
    });
  } catch (error) {
    console.error('SendMessage error:', error);
    return res.status(500).json({
      success: false,
      message: 'Message sending failed',
      isRetryable: true
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    // console.log(chatId)
    // Check if chatId is provided
    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user.id)) {
      console.log("can't get messages getMessages")
      return res.status(403).json({ message: [] });
    }
    // Find all messages for the chat, sorted by creation time
    // const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 }).populate("sender receiver chat");
    // console.log("get messages for chat " + messages)
    const clearEntry = chat.clear.find(entry => entry.user.toString() === req.user.id);
    const filter = { chat: chatId };

    if (clearEntry) {
      filter.createdAt = { $gt: clearEntry.clearedAt }; 
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: 1 })
      .populate("sender receiver chat");
      
    // console.log('Messages: ', messages)
    res.status(200).json({ success: true, messages });
    
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};


// toggles starred message
export const toggleStar = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      console.log('MESSAGE NOT FOUND: ', message)
      return res.status(404).json({ error: "Message not found" })};

    const isStarred = message.starredBy.includes(userId);
    
    if (isStarred) {
      message.starredBy.pull(userId);
    } else {
      message.starredBy.push(userId);
    }

    await message.save();
    
  req.io.to(message.chat.toString()).emit('message_starred', {
        messageId: message._id,
        starredBy: message.starredBy
      });

    res.json({ 
      success: true,
      isStarred: !isStarred,
      message: "Message star status updated"
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// get starred messages
export const getStarredMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      starredBy: req.user._id
    })
    .populate('sender', 'username avatar Phone')
    .populate('chat', 'name type')
    .sort({ createdAt: -1 });

    res.json({success: true, messages});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// // Mark Message as Delivered
// export const markMessagesDelivered = async (req, res) => {
//   try {
//     const { messageIds } = req.body;
//     const userId = req.user._id;

//     const messages = await Message.updateMany(
//       {
//         _id: { $in: messageIds },
//         sender: { $ne: userId },
//         deliveredTo: { $ne: userId }
//       },
//       {
//         $addToSet: { deliveredTo: userId },
//         $set: { status: 'delivered', deliveredAt: new Date() }
//       }
//     );

//     // Emit delivery receipts
//     const updatedMessages = await Message.find({ _id: { $in: messageIds } });
    
//     updatedMessages.forEach(message => {
//       req.io.to(message.chat.toString()).emit('message_status', {
//         messageId: message._id,
//         status: message.status,
//         deliveredTo: message.deliveredTo
//       });
      
//       req.io.to(message.sender.toString()).emit('message_delivered', {
//         messageId: message._id,
//         chatId: message.chat
//       });
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error marking messages as delivered:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Mark Message as Read
// export const markMessagesRead = async (req, res) => {
//   try {
//     const { messageIds, chatId } = req.body;
//     const userId = req.user._id;

//     // Update messages
//     const result = await Message.updateMany(
//       {
//         _id: { $in: messageIds },
//         sender: { $ne: userId },
//         readBy: { $ne: userId }
//       },
//       {
//         $addToSet: { readBy: userId },
//         $set: { status: 'read', readAt: new Date() }
//       }
//     );

//     // Update chat unread count
//     await Chat.findByIdAndUpdate(chatId, {
//       $pull: { read: { user: userId } },
//       $addToSet: { read: { user: userId, status: true } },
//       $inc: { 'unreadCounts.$[elem].count': -result.nModified }
//     }, {
//       arrayFilters: [{ 'elem.user': userId }]
//     });

//     // Get updated messages to emit
//     const updatedMessages = await Message.find({ _id: { $in: messageIds } })
//       .populate('sender receiver');

//     // Emit read receipts
//     updatedMessages.forEach(message => {
//       req.io.to(message.chat.toString()).emit('message_status', {
//         messageId: message._id,
//         status: message.status,
//         readBy: message.readBy
//       });

//     //   req.io.to(message.sender.toString()).emit('message_read', {
//     //     messageId: message._id,
//     //     chatId: message.chat,
//     //     readBy: message.readBy
//     //   });
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error marking messages as read:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Get Message Read Status
// export const getUnreadCounts = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const chats = await Chat.find({ participants: userId })
//       .select('_id unreadCounts');

//     const counts = {};
//     chats.forEach(chat => {
//       const userCount = chat.unreadCounts.find(uc => uc.user.equals(userId));
//       counts[chat._id] = userCount ? userCount.count : 0;
//     });

//     res.status(200).json(counts);
//   } catch (error) {
//     console.error("Error getting unread counts:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id; 

    // Find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Check if the user is the sender
    if (message.sender.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own messages" });
    }

    // Delete media from Cloudinary if any
    if (message.media.length > 0) {
      // console.log('MEDIA: ',message.media)
      for (const mediaUrl of message.media) {
        const publicId = mediaUrl.url.split("/").pop().split(".")[0]; 
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete the message from the database
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res
      .status(500)
      .json({ message: "Error deleting message", error: error.message });
  }
};

// // for testing purpose
// export const deletemessages = async(req,res) => {
//   try {
//     await Message.deleteMany({})
//   } catch (error) {
//     console.log('ERROR DELETING ALL MESSAGES')
//   }
// };