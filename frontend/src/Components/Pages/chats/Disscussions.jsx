import "../../../../public/assets/css/Chats.css";
import "../../../../public/assets/css/animate.css";
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/line-awesome.css";
import "../../../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../../../public/assets/css/font-awesome.min.css";
import "../../../../public/assets/css/jquery.mCustomScrollbar.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/responsive.css";
import "../../../../public/assets/lib/slick/slick.css";
import "../../../../public/assets/lib/slick/slick-theme.css";
import "../../../../public/assets/js/jquery.min.js";
import "../../../../public/assets/js/bootstrap.min.js";
import "../../../../public/assets/js/jquery.mCustomScrollbar.js";
import "../../../../public/assets/lib/slick/slick.min.js";
import "../../../../public/assets/js/scrollbar.js";
import "../../../../public/assets/js/script.js";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/userContext.jsx";
import moment from "moment";
import io from "socket.io-client"; // Importer socket.io-client
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Picker from "emoji-picker-react";

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

export default function Discussions() {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(UserContext); // Utilisez le contexte utilisateur
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedConversationDetails, setSelectedConversationDetails] =
    useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const userId = user ? user.id : null;
  const [searchQuery, setSearchQuery] = useState("");

  const imageUrl =
    userId && user && user.profileImage
      ? `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/profile`
      : "/assets/images/resources/user-pro-img.png";
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/messages/getall");
        setConversations(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des conversations : ",
          error
        );
      }
    };
    fetchConversations();
  }, []);
  const filteredConversations = conversations.filter((conversation) => {
    const searchLower = searchQuery.toLowerCase();
    const conversationName = conversation.name?.toLowerCase();

    return (
      conversationName.includes(searchLower) ||
      (conversation.rang &&
        conversation.rang.toString().toLowerCase().includes(searchLower))
    );
  });

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversationId) {
        try {
          const response = await axios.get(
            `/messages/getMessageById/${selectedConversationId}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des messages : ",
            error
          );
        }
      }
    };

    fetchMessages();
  }, [selectedConversationId]);
  const handleClick = (id) => {
    handleConversationClick(id);
    setSelectedConversation(id);
  };

  conversations.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];

    const dateA = lastMessageA
      ? new Date(lastMessageA.createdAt)
      : new Date(a.createdAt);
    const dateB = lastMessageB
      ? new Date(lastMessageB.createdAt)
      : new Date(b.createdAt);

    return dateB - dateA;
  });
  const handleConversationClick = async (conversationId) => {
    setSelectedConversationId(conversationId);
    try {
      const response = await axios.get(`/messages/getbyid/${conversationId}`);
      setSelectedConversationDetails(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la conversation : ",
        error
      );
    }
  };

  useEffect(() => {
    socket.on("message", (newMessage) => {
      // Vérifiez si le nouveau message appartient à la conversation sélectionnée
      if (newMessage.conversation === selectedConversationId) {
        // Mettre à jour l'état des messages avec le nouveau message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [selectedConversationId]);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      socket.emit("message", {
        content: messageInput,
        sender: user.id,
        repondeur: selectedConversationDetails?.members.filter(
          (member) => member._id !== user.id
        ),
        conversationId: selectedConversationId,
      });
      console.log(selectedConversationDetails);

      setMessageInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };
  const [showEmojis, setShowEmojis] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setMessageInput((prevMessageInput) => prevMessageInput + emojiObject.emoji);
  };

  return (
    <>
      <section className="messages-page">
        <div className="container1">
          <section className="discussions">
            <div className="discussion search">
              <div className="searchbar">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>{" "}
              <Link
                to="/addConversation"
                title=""
                style={{ marginLeft: "62px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  <path
                    fillRule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                  />
                </svg>{" "}
              </Link>
            </div>
            {filteredConversations.map(
              (conversation) =>
                conversation.members.includes(user.id) && (
                  <div
                    className="discussion"
                    key={conversation._id}
                    onClick={() => handleClick(conversation._id)}
                    style={
                      conversation._id === selectedConversation
                        ? { backgroundColor: "gainsboro" }
                        : {}
                    }
                  >
                    <div className="photo">
                      {/* <img src={imageUrl} alt="Image de profil" width="40px" height="40px" /> */}
                      <div className="online"></div>
                    </div>
                    <div className="desc-contact">
                      <p className="name">{conversation.name}</p>
                    </div>
                    <div className="timer">
                      {conversation.messages.length > 0
                        ? moment(
                            conversation.messages[
                              conversation.messages.length - 1
                            ].createdAt
                          ).fromNow()
                        : moment(conversation.createdAt).fromNow()}
                    </div>
                  </div>
                )
            )}
          </section>
          <section className="chat">
            <div className="header-chat">
              <i className="icon fa fa-user-o" aria-hidden="true"></i>
              <p className="name">{selectedConversationDetails?.name}</p>
              <Link
                to={`/getUsers/${selectedConversationDetails?._id}`}
                title=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  <path
                    fillRule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </Link>
              <Link
                to={`/modifierConversation/${selectedConversationDetails?._id}`}
                title=""
                className=" right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </Link>
            </div>
            <div className="messages-chat">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === user.id
                      ? "message"
                      : message.repondeur === user.id
                      ? "response"
                      : "test"
                  }
                >
                  <div className="photo">
                    <img
                      src={imageUrl}
                      alt="Image de profil"
                      width="40px"
                      height="40px"
                    />

                    <div className="online"></div>
                  </div>
                  <p className="text">{message.content}</p>
                </div>
              ))}
            </div>
            <div className="footer-chat">
              <form onSubmit={handleMessageSend}>
                <i
                  className="icon fa fa-smile-o clickable"
                  style={{ fontSize: "25pt" }}
                  aria-hidden="true"
                  onClick={() => setShowEmojis(!showEmojis)}
                ></i>
                {showEmojis && <Picker onEmojiClick={onEmojiClick} />}
                <input
                  type="text"
                  className="write-message"
                  name="message"
                  placeholder="Type your message here"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit">
                  {" "}
                  <i
                    className="icon send fa fa-paper-plane-o clickable"
                    aria-hidden="true"
                    type="submit"
                  ></i>
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
