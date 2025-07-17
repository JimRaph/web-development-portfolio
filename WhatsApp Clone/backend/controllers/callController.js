import { json } from 'express';
import { Call } from '../models/callModel.js';
import { Chat } from '../models/chatModel.js';
import { User } from '../models/userModel.js';



const populateCallWithPhoneNumbers = async (call) => {
  return await Call.populate(call, [
    { 
      path: 'caller',
      select: 'Phone countryCode avatar isOnline'
    },
    {
      path: 'participants',
      select: 'Phone countryCode avatar isOnline'
    }
  ]);
};


const initiateCall = async (req, res) => {
  try {
    console.log('INITIATING CALL');
    const { type, participants, chatId } = req.body;
    const callerId = req.user._id;

    if (!type || !['audio', 'video'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid call type. Must be either audio or video'
      });
    }

    let chat = null;
    let avatar = null;

    if (chatId) {
      chat = await Chat.findById(chatId).lean();
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }

      if(chat.type !== 'group'){
        participants.push(req.user._id.toString())
      }


      if (chat.type === 'group') {
        avatar = chat.avatar || null;
      } else {
        const otherId = chat.participants.find(
          (id) => id.toString() !== callerId.toString()
        );
        const otherUser = await User.findById(otherId).select('avatar').lean();
        avatar = otherUser?.avatar || null;
      }
    } 
    // else if (participantsList.length === 2) {
    //   const otherId = participantsList.find(
    //     (id) => id.toString() !== callerId.toString()
    //   );
    //   const otherUser = await User.findById(otherId).select('avatar').lean();
    //   avatar = otherUser?.avatar || null;
    // }

    const participantsList = participants || [];
        const participantsWithPhone = await User.find({
          _id: { $in: participantsList }
      }).select('Phone countryCode avatar');


    const call = new Call({
      type,
      participants: participantsWithPhone.map((p) => p._id),
      caller: callerId,
      isGroupCall: chat ? chat.type === 'group' : false,
      chatId: chat?._id || null,
      avatar,
      status: 'initiating'
    });

    await call.save();
    const populatedCall = await populateCallWithPhoneNumbers(call);
    console.log('PARTI: ', participants)
    console.log('CALL INIII: ', call)
    res.status(201).json({
      ...populatedCall.toObject(),
      callerPhone: req.user.Phone
    });
  } catch (error) {
    console.error('Call initiation error:', error);
    res.status(500).json({
      error: 'Failed to initiate call',
      details: error.message
    });
  }
};



// export const endCall = async (req, res) => {
//     try {
//         const { callId } = req.params;
//         const userId = req.user._id;

//         const call = await Call.findOne({
//             _id: callId,
//             participants: userId
//         });

//         if (!call) {
//             return res.status(404).json({ 
//                 error: 'Call not found or unauthorized' 
//             });
//         }

//         // Update call status
//         call.endTime = new Date();
//         call.status = 'ended';
//         await call.save();

//         // Get participants' phone numbers for socket emission
//         const participants = await User.find({
//             _id: { $in: call.participants }
//         }).select('Phone countryCode');


        
//         // Notify participants via socket
//         req.io.to(call.participants.map(p => p.toString())).emit('call_ended', {
//             callId: call._id,
//             duration: call.duration,
//             endedBy: req.user.Phone,
//             endedByCountryCode: req.user.countryCode
//         });

//         res.json({
//             ...call.toObject(),
//             participants: participants.map(p => ({
//                 phone: p.Phone,
//                 countryCode: p.countryCode
//             }))
//         });
//     } catch (error) {
//         console.log('Error Initiating call:', error);
//         res.status(500).json({ 
//             error: 'Failed initiating call',
//             details: error.message 
//         });
//     }
// };

// Get call details

// export const getCallDetails = async (req, res) => {
//     try {
//         const { callId } = req.params;
//         const userId = req.user._id;

//         const call = await Call.findOne({
//             _id: callId,
//             participants: userId
//         }).populate('caller participants', 'Phone countryCode avatar isOnline');

//         if (!call) {
//             return res.status(404).json({ 
//                 error: 'Call not found or unauthorized' 
//             });
//         }

//         res.json(call);
//     } catch (error) {
//         console.error('Error fetching call details:', error);
//         res.status(500).json({ 
//             error: 'Failed to get call details',
//             details: error.message 
//         });
//     }
// };

// Get call history

const getCallHistory = async (req, res) => {
  try {
    console.log('GETTING CALL HISTORY');
    const userId = req.user._id;

    if (!userId) {
      console.log('User not authorized')
      return res.status(401).json({ message: 'User not authorized' });
    }

    const calls = await Call.find({
      $or: [
        {participants: { $in: [userId]}},
        {caller: userId }
      ],
      status: { $in: ['ended', 'active', 'ringing', 'initiating'] }
    })
      .select('-connectionData')
      .sort('-startTime')
      .populate('caller', 'Phone countryCode avatar')
      .populate('participants', 'Phone countryCode avatar')
      .populate('chatId', 'name')

    if(!calls){
      console.log('No calls availablr')
      return res.status(404).json({message: 'No calls available'})
    }

    console.log('CALLS FOUND:', calls);
    res.json({
      calls,
      message: 'Call history retrieved'
    });
  } catch (error) {
    console.error('Error fetching call history:', error);
    res.status(500).json({
      error: 'Failed to get call history',
      details: error.message
    });
  }
};


// // Reject a call
// export const rejectCall = async (req, res) => {
//     try {
//         const { callId } = req.params;
//         const userId = req.user._id;

//         const call = await Call.findOneAndUpdate(
//             {
//                 _id: callId,
//                 participants: userId,
//                 status: 'ringing'
//             },
//             { status: 'rejected' },
//             { new: true }
//         ).populate('caller', 'Phone countryCode');

//         if (!call) {
//             return res.status(404).json({ 
//                 error: 'Call not found, already ended, or unauthorized' 
//             });
//         }

//         // Notify caller
//         req.io.to(call.caller._id.toString()).emit('call_rejected', {
//             callId: call._id,
//             rejectedBy: req.user.Phone,
//             rejectedByCountryCode: req.user.countryCode
//         });

//         res.json({
//             message: 'Call rejected successfully',
//             callId: call._id
//         });
//     } catch (error) {
//         console.error('Error rejecting call:', error);
//         res.status(500).json({ 
//             error: 'Failed to reject call',
//             details: error.message 
//         });
//     }
// };

export {initiateCall, getCallHistory}