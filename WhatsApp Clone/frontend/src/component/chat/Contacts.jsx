import {useState} from "react";
import { ArrowLeft,Bell,PinIcon,Search} from "lucide-react";

import { context } from '../../context/context'
import Contextmenu from "./Contextmenu";
import { useTheme } from "../../context/ThemeContext";

const Contacts = ({setActiveIcon}) =>{

    const {theme, HoverableItem} = useTheme()
    const {chats, user, identifier, getUnreadCount,
      formatMessageTime, setSelectedChat
    } = context()
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  
    const handleRightClick = (e) => {
      e.preventDefault(); // Prevent the default browser menu
  
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const modalWidth = 180;
      const modalHeight = 230;
  
      let x = e.pageX;
      let y = e.pageY;
  
      // Prevent modal from overflowing the right edge
      if (x + modalWidth > screenWidth) x -= modalWidth;
  
      // Prevent modal from overflowing the bottom
      if (y + modalHeight > screenHeight) y -= modalHeight;
  
      setModalPosition({ x, y });
      setShowModal(true);
    };
  


    const contactChats = chats.filter(c => {
      if (c.type !== 'individual') return false;

      const me = c.participants.find(p => p._id.toString() === user._id.toString());
      if (!me) return false;

      // Find the other participant
      const otherParticipant = c.participants.find(p => p._id.toString() !== user._id.toString());
      if (!otherParticipant) return false;

      // Check if the other participant is a saved contact
      const isSaved = me.contacts.some(contactObj => 
        contactObj.contact.toString() === otherParticipant._id.toString()
      );

      return isSaved; // Keep chat only if other participant is saved in my contacts
    });

  
    return (
      
      <div className={`w-full h-full flex flex-col ${theme.secondary}  p-4 rounded-tl`}>
       
       {/* Header Section */}
        <div className="h-fit p-1 pb-2 mb-1  border-[#202c33] rounded-tl">
          <div className="flex space-x-6 items-center">
            <ArrowLeft size={20} onClick={() => setActiveIcon("message")} />
            <p className="font-semibold text-xl">Contacts</p>
          </div>
          
          {/* Search bar  */}
          <div className={`mt-5 mb-2 flex items-center ${theme.main} border-b ${theme.border} space-x-2 pl-2`}>
            <Search size={13} />
            <input
              type="text"
              placeholder="Search for chats"
              className="w-full px-2 py-1 outline-none border-0 rounded-md"
            />
          </div>
        </div>
  
  
        {contactChats.map((chat, index) => (
            <HoverableItem key={index}
            onContextMenu={handleRightClick}
            onClick={()=>{
              localStorage.setItem('whatapp-selectedchat', JSON.stringify(chat))
              setSelectedChat(chat)
            }}
            className="flex items-center space-x-2 p-2  rounded-md">
              <img
                src={identifier(chat)[1]}
                alt="user1"
                className={` ${theme.border} border rounded-full h-12 w-12`}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="font-semibold text-sm flex justify-between items-center">
                  {identifier(chat)[0]}
                  <span className=" ml-2 text-green-500 text-xs">
                    {formatMessageTime(chat.latestMessage?.updatedAt)}
                  </span>
                </p>
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span className="flex-1 min-w-0 whitespace-nowrap truncate overflow-hidden">
                    {chat.latestMessage?.content}
                  </span>
                  <div className="flex gap-1 ml-2 flex-shrink-0">
                    {Array.isArray(chat?.muted) && chat.muted.find(c => c.user === user._id)?.status && (
                      <span><Bell size={17} /></span>
                    )}
                    {Array.isArray(chat?.pinned) && chat.pinned.find(c => c.user === user._id)?.status && (
                      <span><PinIcon size={17} /></span>
                    )}
                    { getUnreadCount(chat) > 0 && ( 
                    <span className={`bg-green-500 rounded-full px-1 font-semibold text-gray-950`}> 
                      { getUnreadCount(chat) }
                    </span>
                    )}

                  </div>
                </div>
              </div>
            </HoverableItem>
          ))}
        
  
          {showModal && <Contextmenu modalPosition={modalPosition} setShowModal={setShowModal}/>}
  
      </div>
    );
  };

export default Contacts
