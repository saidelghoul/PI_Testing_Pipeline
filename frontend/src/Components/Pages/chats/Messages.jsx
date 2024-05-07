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
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import io from "socket.io-client"; // Importer socket.io-client
import { UserContext } from "../../../../context/userContext.jsx";

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedConversationDetails, setSelectedConversationDetails] =
    useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { user } = useContext(UserContext); // Utilisez le contexte utilisateur
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userId = user ? user.id : null; // Supposant que user contient l'objet utilisateur avec l'ID
  const [selectedConversation, setSelectedConversation] = useState(null);
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

    // Écoutez les nouveaux messages émis par le serveur
    socket.on("message", (newMessage) => {
      setConversations((prevConversations) => {
        // Trouvez la conversation à laquelle le nouveau message appartient
        const conversationIndex = prevConversations.findIndex(
          (conversation) => conversation._id === newMessage.conversation
        );

        if (conversationIndex !== -1) {
          // Ajoutez le nouveau message à la conversation correspondante
          const updatedConversations = [...prevConversations];
          updatedConversations[conversationIndex].messages.push(newMessage);
          return updatedConversations;
        } else {
          // Si la conversation n'existe pas encore, ajoutez-la
          return [
            ...prevConversations,
            { _id: newMessage.conversation, messages: [newMessage] },
          ];
        }
      });
    });

    fetchConversations();

    // Nettoyez l'écouteur d'événements lorsque le composant est démonté
    return () => {
      socket.off("message");
    };
  }, []);

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
  useEffect(() => {
    // Écoutez les mises à jour de la liste des utilisateurs en ligne
    socket.on("userListUpdate", (users) => {
      setOnlineUsers(users);
    });

    // N'oubliez pas de nettoyer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      socket.off("userListUpdate");
    };
  }, []);
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
        repondeur: selectedConversationDetails?.members.find(
          (member) => member !== user.id
        ),
        conversationId: selectedConversationId,
      });
      setMessageInput("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

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

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`/messages/removeMessage/${messageId}`);
      setMessages(messages.filter((message) => message._id !== messageId));
      alert("Le message a été supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
      alert("Une erreur s'est produite lors de la suppression du message.");
    }
  };
  const handleClick = (id) => {
    handleConversationClick(id);
    setSelectedConversation(id);
  };
  const handleDeleteConversation = async (conversationId) => {
    try {
      await axios.delete(`/messages/remove/${conversationId}`);
      setConversations(
        conversations.filter(
          (conversation) => conversation._id !== conversationId
        )
      );
      alert("La conversation a été supprimée avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la conversation :",
        error
      );
      alert(
        "Une erreur s'est produite lors de la suppression de la  conversation."
      );
    }
  };
  return (
    <section className="messages-page">
      <div className="container">
        <div className="messages-sec">
          <div className="row">
            <div className="col-lg-4 col-md-12 no-pdd">
              <div className="msgs-list">
                <div className="msg-title">
                  <h3>
                    <b>Discussions</b>
                  </h3>
                  <ul>
                    <li>
                      <a href="#" title="">
                        <i className="fa fa-cog"></i>
                      </a>
                    </li>
                    <li>
                      <Link to="/addConversation" title="">
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
                    </li>
                  </ul>
                </div>

                <div className="messages-list">
                  <ul>
                    {conversations.map(
                      (conversation) =>
                        conversation.members.includes(user.id) && (
                          <li
                            key={conversation._id}
                            onClick={() => handleClick(conversation._id)}
                            style={
                              conversation._id === selectedConversation
                                ? { backgroundColor: "gainsboro" }
                                : {}
                            }
                          >
                            <div className="usr-msg-details">
                              <div className="usr-ms-img">
                                <img
                                  src="/assets/images/resources/m-img1.png"
                                  alt=""
                                />
                              </div>
                              <div className="usr-mg-info">
                                <h3>{conversation.name}</h3>
                                <br />
                                <h6>
                                  {conversation.messages.length > 0
                                    ? conversation.messages[
                                        conversation.messages.length - 1
                                      ].content
                                    : "No messages"}
                                </h6>
                                <span className="posted_time">
                                  {conversation.messages.length > 0
                                    ? moment(
                                        conversation.messages[
                                          conversation.messages.length - 1
                                        ].createdAt
                                      ).fromNow()
                                    : moment(conversation.createdAt).fromNow()}
                                </span>
                              </div>
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
              <div className="main-conversation-box">
                <div className="message-bar-head">
                  <div className="usr-msg-details">
                    <div className="usr-ms-img">
                      <img src="/assets/images/resources/m-img1.png" alt="" />
                    </div>
                    <div className="usr-mg-info">
                      <h3>{selectedConversationDetails?.name}</h3>
                      <p>
                        {onlineUsers.includes(selectedConversationDetails?.name)
                          ? "En ligne"
                          : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/modifierConversation/${selectedConversationDetails?._id}`}
                    title=""
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
                  <a onClick={() => handleDeleteConversation(conversation._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>{" "}
                  </a>
                </div>
                <div
                  className="messages-line"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`main-message-box ${
                        message.sender === user.id ? "ta-right" : "ta-left"
                      }`}
                      style={
                        message.sender === user.id
                          ? { textAlign: "right" }
                          : { textAlign: "left" }
                      }
                    >
                      <div className="message-dt st3">
                        {message.repondeur !== user.id && (
                          <div className="message-inner-dt">
                            <a onClick={() => handleDelete(message._id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-x-octagon-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                              </svg>
                            </a>
                          </div>
                        )}

                        <div
                          className="message-inner-dt img-bx"
                          style={
                            message.sender !== user.id ? { color: "red" } : {}
                          }
                        >
                          <b>
                            {message.sender !== user.id ? "De : " : "Vous :"}{" "}
                            {message.content}
                          </b>
                        </div>

                        <span>{moment(message.createdAt).format("lll")}</span>
                      </div>
                      <div className="messg-usr-img">
                        <img
                          src={"/assets/images/resources/m-img1.png"}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="message-send-area">
                  <form onSubmit={handleMessageSend}>
                    <div className="mf-field">
                      <input
                        type="text"
                        name="message"
                        placeholder="Type a message here"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                      <button type="submit">Send</button>
                    </div>
                    {/* Boutons supplémentaires pour les pièces jointes, emojis, etc. */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
