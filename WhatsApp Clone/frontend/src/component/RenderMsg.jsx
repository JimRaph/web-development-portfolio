import { Chat } from "../models/chatModel.js";
import { Message } from "../models/MessageModel.js";
import {Call} from "../models/callModel.js"


export const socketHandlers = (io, socket) => {
  // Chat and messaging handlers


  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.userId} joined chat ${chatId}`);
    
    // Process any pending deliveries for this user
  });


  // Typing indicators
  const typingTimers = new Map(); // Track typing timeouts per chat

  // Typing indicators with debounce
  socket.on("typing", ({ chatId }) => {
    // Clear any existing timer for this user in this chat
    const timerKey = `${chatId}-${socket.userId}`;
    if (typingTimers.has(timerKey)) {
      clearTimeout(typingTimers.get(timerKey));
    }

    // Notify others this user is typing

    socket.to(chatId).emit("user_typing", {
      userId: socket.userId,
      chatId,
      isTyping: true
    });

    typingTimers.set(timerKey, setTimeout(() => {
      socket.to(chatId).emit("user_typing", {
        userId: socket.userId,
        chatId,
        isTyping: false
      });
      typingTimers.delete(timerKey);
    }, 2000));
  });

  socket.on("stop_typing", ({ chatId }) => {
    const timerKey = `${chatId}-${socket.userId}`;
    if (typingTimers.has(timerKey)) {
      clearTimeout(typingTimers.get(timerKey));
      typingTimers.delete(timerKey);
    }

    socket.to(chatId).emit("user_typing", {
      userId: socket.userId,
      chatId,
      isTyping: false
    });
  });


  // Message delivery handlers
  socket.on("mark_delivered", async ({ messageId, chatId }) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: messageId,
        deliveredTo: { $ne: socket.userId }
      },
      {
        $addToSet: { deliveredTo: socket.userId },
        $set: { status: 'delivered', deliveredAt: new Date() }
      },
      { new: true }
    ).populate('sender receiver');

    if (message) {
      // Emit to all chat participants
      io.to(chatId).emit('message_status', {
        messageId: message._id,
        status: 'delivered',
        deliveredTo: message.deliveredTo
      });
      
      // Also emit chat update
      const updatedChat = await Chat.findById(chatId).populate('participants latestMessage');
      io.to(chatId).emit('chat_updated', updatedChat);
    }
  } catch (error) {
    console.error('Delivery receipt error:', error);
  }
  });

  // Modified read receipt handler
  socket.on("mark_as_read", async ({ messageId, chatId }) => {
    try {
      const message = await Message.findOneAndUpdate(
        { _id: messageId, readBy: { $ne: socket.userId } },
        {
          $addToSet: { readBy: socket.userId },
          $set: { status: 'read', readAt: new Date() }
        },
        { new: true }
      ).populate('sender receiver');

      if (message) {
        // Update chat unread count
        await Chat.findByIdAndUpdate(
          chatId,
          { $set: { 'unreadCounts.$[elem].count': 0 } },
          { arrayFilters: [{ 'elem.user': socket.userId }] }
        );

        // Emit to all participants
        io.to(chatId).emit('message_status', {
          messageId: message._id,
          status: 'read',
          readBy: message.readBy
        });

        const updatedChat = await Chat.findById(chatId).populate([
          { path: 'participants', select: '-verificationCode -contacts' },
          { path: 'latestMessage', populate: { path: 'sender receiver' } }
        ]);
        io.to(chatId).emit('chat_updated', updatedChat);
      }
    } catch (error) {
      console.error('Read receipt error:', error);
    }
  });
  

  socket.on('mark_chat_read', async ({ chatId }) => {
    try {
      await Chat.findByIdAndUpdate(chatId, {
        $set: { 
          'unreadCounts.$[elem].count': 0 
        }
      }, {
        arrayFilters: [{ 
          'elem.user': socket.userId 
        }]
      });
      
      // Notify other participants
      io.to(chatId).emit('chat_read_update', { 
        chatId,
        userId: socket.userId
      });
    } catch (error) {
      console.error('Error marking chat as read:', error);
    }
  });


  socket.on("join", (userId) => {
    console.log(`User ${userId} is online.`);
  })

// ------------------------------------------------
// WEBRTC HANDLERS
// ------------------------------------------

    // Handle call initiation
socket.on('initiate_call', async ({ callId, offer }) => {
    
        socket.join(callId);
        await Call.findByIdAndUpdate(callId, {
            'connectionData.offer': offer,
            status: 'ringing'
        });
        console.log('ON INIT CALLID: ', callId)
        
        // Notify participants
        const call = await Call.findById(callId).populate('participants caller');
        console.log('CALL IN INIT CALL: ', call)
        call.participants.forEach(participant => {
            if (participant._id.toString() !== socket.userId) {
                io.to(participant._id.toString()).emit('incoming_call',
                {
                  ...call.toObject({ virtuals: true }),
                  _id: call._id,
                }
                );
            }
        });
    });

    socket.on('call_answer', async ({ callId, answer }) => {
      console.log('ON CALL_ANSWER ID: ', callId, answer)
      socket.join(callId);
        const call = await Call.findByIdAndUpdate(callId, {
            'connectionData.answer': answer,
            status: 'active',
            picked: 'true'
        });
        console.log('CALLi: ', call);
        // Send answer to caller
        io.to(call.caller.toString()).emit('call_accepted', { callId, answer });
    });

    socket.on('ice_candidate', ({ callId, candidate }) => {
        // Broadcast candidate to other participants
        console.log('ON ICE CAND: ', candidate)
        console.log('ID: ', callId)
        socket.to(callId).emit('new_ice_candidate', { callId, candidate });
        
    });

    socket.on('end_call', async ({ callId }) => {
        const call = await Call.findByIdAndUpdate(callId, {
            status: 'ended',
            endTime: new Date()
        });
        // Notify all participants
        io.to(callId).emit('call_ended', call)
    });

    socket.on('mute_state', ({ callId, isMuted, senderId }) => {
      if (!callId) {
        console.error('Rejected mute_state - missing callId from', senderId);
        return;
    }
          console.log(`Emitting mute=${isMuted} from ${senderId} to room ${callId}`);

    io.to(callId).emit('remote_mute_state', { isMuted, senderId });
    // socket.emit('remote_mute_state', { isMuted })
    });


};