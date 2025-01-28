import { useContext, useEffect, useState, createContext, useMemo } from "react";
import {
  query,
  orderBy,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Get } from "api/admin.services";
import dataContext from "views/admin/ContextFolder/Createcontext";
export const PendingMsgContext = createContext();

//context provider
export const PendingMsgProvider = ({ children }) => {
  let [pendingChats, setPendingChats] = useState(null);
  const [fireStoreChat, setFireStoreChat] = useState(null);
  const [pendingNotifications, setPendingNotifications] = useState(null);
  const [updateChatNotification, setUpdateChatNotification] = useState(false);


  const { profile } = useContext(dataContext);
  // getting chat list from fireStore
  const getChat = async () => {
    const chatRef = collection(getFirestore(), "Chat"); // Assuming "Chat" is the collection name
    const q = query(chatRef, orderBy("date", "desc"));
    try {
      const querySnapshot = await getDocs(q);
      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setFireStoreChat(chats);

      // return chats;
    } catch (error) {
      console.error("Error getting chats:", error);
      throw error; // Rethrow the error for handling in the calling code
    }
  };

  //getting list for extracting pending unseen msg
  const getNotificationOTHERS = async () => {

    try {
      await Get(`admin/getnotification?type=received&limit=5`).then(
        (res) => {
          setPendingNotifications(res?.data?.unreadCount);
        }
      );
    } catch (error) {
      //  console.log(error)
    }
  };

  useEffect(() => {
    getChat();
    getNotificationOTHERS();
  }, [updateChatNotification]);

  useEffect(() => {
    if (fireStoreChat) {
      let pendingmsg = 0;
      fireStoreChat
        .map((obj) => obj.data)
        .forEach((obj) => {
          if (obj?.readStatus === "unread" && obj?.receiverId === profile?._id) {
            pendingmsg++;
          }
        });
      setPendingChats(pendingmsg);
    }
  }, [fireStoreChat, updateChatNotification]);

  return (
    <PendingMsgContext.Provider
      value={useMemo(
        () => ({
          pendingChats,
          setPendingChats,
          pendingNotifications,
          setPendingNotifications,
          setUpdateChatNotification,
        }),
        [pendingChats, setPendingChats, pendingNotifications, setPendingNotifications, setUpdateChatNotification]
      )}
    >
      {children}
    </PendingMsgContext.Provider>
  );
};

export const useMsgContext = () => useContext(PendingMsgContext);
