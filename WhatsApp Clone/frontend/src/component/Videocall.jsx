import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { MdCallEnd, MdMic, MdMicOff, MdVolumeUp, MdVolumeOff, MdSwitchCamera } from "react-icons/md";


const VideoCall = ({ callStatus, myVideoRef,remoteVideoRef, remoteStream,callType, acceptCall, rejectCall, endCall, callUser }) => {


  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [isVideo, setIsVideo] = useState(true)


  return (
    <div className="fixed inset-0 flex z-20 flex-col justify-center items-center bg-green-600">

          <div className=" flex flex-col sm:flex-row gap-5 items-center m-auto">
          {isVideo ? (
            <video ref={myVideoRef} autoPlay playsInline muted className=" w-[90%] h-[40%] object-cover bg-red border-2 border-amber-950" />
          ) : (
            <img src="/default-avatar.png" alt="Avatar" className="w-100 h-40 rounded-full animate-pulse bg-white" />
          )}

          {/* {remoteStream && (
            <video ref={remoteVideoRef} autoPlay className="absolute w-1/2 h-1/2 object-cover rounded-lg border-2 border-white" />
          )} */}
            <video ref={remoteVideoRef} autoPlay className=" w-[90%] h-[40%] object-cover rounded-lg border-2 border-amber-200" />
        </div>
  
        <div className="absolute bottom-10 flex gap-5">
          <button onClick={() => setMuted(!muted)} className="bg-gray-800 text-white p-3 rounded-full">
            {muted ? <MdMicOff size={24} /> : <MdMic size={24} />}
          </button>
  
          {!isVideo && (
            <button onClick={() => setSpeaker(!speaker)} className="bg-gray-800 text-white p-3 rounded-full">
              {speaker ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
            </button>
          )}
  
          <button onClick={endCall} className="bg-red-600 text-white p-3 rounded-full">
            <MdCallEnd size={24} />
          </button>
        </div>
   
    </div>
  );
};

export default VideoCall;
