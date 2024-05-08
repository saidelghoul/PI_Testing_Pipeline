
import axios from "axios";
import "../../../../public/assets/css/disscusion.css";
import react, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../../context/userContext";
import { Link } from "react-router-dom";
import moment from "moment";
import io from "socket.io-client"; // Importer socket.io-client

const socket = io("http://localhost:8000");

export  default function Teste(){
    const [conversations, setConversations] = useState([]);
    const [membres, setMembres] = useState([]);
    const [isTyping, setIsTyping] = useState(false); // Nouvel état pour le typing
    const imageName = conversations.image && conversations.image.split('/').pop()
    const [showMore, setShowMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const {user}=useContext(UserContext);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [selectedConversationDetails, setSelectedConversationDetails] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [searchQuerys, setSearchQuerys] = useState('');

    const imageUrls = conversations && conversations.image 
    ? `http://localhost:8000/${conversations.image}` 
    : "/assets/images/resources/cover-img.jpg";
 


    useEffect(() => {
        const fetchConversations = async () => {
          try {
            const response = await axios.get("/messages/getall");
            const sortedConversations = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Inverser l'ordre des conversations
            const reversedConversations = sortedConversations.reverse();
            setConversations(reversedConversations);
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des conversations : ",
              error
            );
          }
        };
        fetchConversations();
      }, []);

      useEffect(() => {
        const fetchMembres= async () => {
          try {
            if (selectedConversationId) { // Vérifiez si selectedConversationId est défini

            const response = await axios.get(`/messages/getMembres/${selectedConversationId}`);
            setMembres(response.data);
            }
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des conversations : ",
              error
            );
          }
        };
        fetchMembres();
      }, [selectedConversationId]);
      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
      };
      const filteredConversations = conversations.filter((conversation) => {
        const searchLower = searchQuery.toLowerCase();
        const conversationName = conversation.name?.toLowerCase();
        
        return (
          conversationName.includes(searchLower) ||
          (conversation.rang && conversation.rang.toString().toLowerCase().includes(searchLower))
        );
      });
      const visibleConversations = showMore ? filteredConversations : filteredConversations.slice(0, 5);
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
      const handleClick = (id) => {
        handleConversationClick(id);
        setSelectedConversation(id);
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
            repondeur: selectedConversationDetails?.members.filter(member => member._id !== user.id),
            conversationId: selectedConversationId,
          });
          console.log(selectedConversationDetails)
    
          setMessageInput("");
        } catch (error) {
          console.error("Erreur lors de l'envoi du message :", error);
        }
      };

      const filteredMessages = messages.filter((message) => {
        const searchLowers = searchQuerys.toLowerCase();
        const MessageName = message.content?.toLowerCase();
        
        return (
            MessageName.includes(searchLowers) ||
          (message.rang && message.rang.toString().toLowerCase().includes(searchLowers))
        );
      });

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
      const handleTyping = () => {
        // Envoyer un message de typing lorsque l'utilisateur commence à taper
        socket.emit("typing", { conversationId: selectedConversationId });
        // Définir un délai après lequel le typing sera désactivé
        setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Mettez la durée souhaitée en millisecondes
      };

      useEffect(() => {
        // Écouter l'événement "typing" du serveur
        socket.on("typing", (data) => {
          // Vérifier si le message de typing est pour la conversation actuellement sélectionnée
          if (data.conversationId === selectedConversationId) {
            setIsTyping(true); // Activer le typing
          }
        });
      }, [selectedConversationId]);
    return (
    <>
        <section className="messages-page">

<div className="container1">


    <div className="content-wrapper1">

        <div className="row gutters">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                <div className="card1 m-0">

                    <div className="row no-gutters">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3" style={{ overflowY: "scroll", maxHeight: "800px"}}>
                            <div className="users-container1">

                                <div className="chat-search-box">
                                    <div className="input-group">
                                        
                                    <span className="input-group-text">
                🔎</span>
                <input placeholder="Rechercher Par Nom du groupe" aria-label="Rechercher Par Nom " className="form-control" onChange={(e) => setSearchQuery(e.target.value)} />
                                            <Link to="/addConversation" title=""  style={{ paddingLeft:"5px" , paddingTop:"9px"}}>➕</Link>

                                        
                                    </div>
                                    
                                </div>
                                <ul className="users">
  {visibleConversations.map(conversation => (
    conversation.members && conversation.members.includes(user.id) && (
      <li key={conversation._id} className="person" data-chat={`person${conversation._id}`} onClick={() => handleClick(conversation._id)}>
        <div className="user">
          {conversation.messages.length > 0 && conversation.messages[0].repondeur.profileImage ? (
            <img src={`http://localhost:8000/user/${conversation.messages[0]._id}/profile`} alt={conversation.messages[0].repondeur.name} />
          ) : (
            <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Default" />
          )}
        </div>
        <p className="name-time">
          <span className="name" style={{marginLeft: "10px", marginRight: "40px"}}>{conversation.name}</span>
          <span className="right" style={{paddingLeft: "155px"}}>{formatDate(conversation.createdAt)}</span>{" "}
          <a onClick={() => handleDeleteConversation(conversation._id)}>(❌)</a>
        </p>
      </li>
    )
  ))}
</ul>

                                {conversations.length > 5 && !showMore && (
                                                    <button className="btn btn-primary" onClick={() => setShowMore(true)}>Voir plus</button>
                                                )}
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
  {selectedConversationDetails ? (
    <>
      <div className="selected-user">
        <span>
          To: <span className="name">{selectedConversationDetails?.name}</span>
          <Link to={`/getUsers/${selectedConversationDetails?._id}`} title="">➕</Link>
          <Link to={`/modifierConversation/${selectedConversationDetails?._id}`} title="">✍</Link>
          Les membres du discussions:
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedConversationDetails.members.map((membre, index) => (
              <span key={index} style={{ margin: "0 10px" }}>{membre.name}</span>
            ))}
          </div>
          <span className="input-group-text" style={{ marginRight: "-11px", marginTop: "-57px", marginLeft: "646px" }}>
            🔎<input placeholder="Rechercher Par Nom du groupe" aria-label="Rechercher Par Nom " className="form-control" onChange={(e) => setSearchQuerys(e.target.value)} />
          </span>
        </span>
      </div>

      <div className="chat-container1">
        <ul className="chat-box chatContainerScroll" style={{ overflowY: "scroll", maxHeight: "500px" }}>
          {filteredMessages.map((message, index) => (
            <li className={message.sender._id === user.id ? "chat-right" : "chat-left"} key={index}>
              <div className="chat-avatar">
              <img src={message.sender.profileImage ? `http://localhost:8000/user/${message.sender._id}/profile` : 'https://www.bootdey.com/img/Content/avatar/avatar3.png'} alt={message.sender.name} />                <div className="chat-name">{message.sender.name}</div>
              </div>
              <div className="chat-text">{message.content}</div>
              <div className="chat-hour">{moment(message.createdAt).fromNow()}<span className="fa fa-check-circle"></span></div>
            </li>
          ))}
        </ul>
      </div>

      <form className="form-group mt-3 mb-0" onSubmit={handleMessageSend}>
        <div className="input-group">
        <textarea className="form-control" placeholder="Input Your Message" type="text" name="message" value={messageInput} onChange={(e) => { setMessageInput(e.target.value); handleTyping(); }}></textarea>
          {isTyping && <div>Typing...</div>} {/* Affichage du typing */}

          <div className="input-group-btn">
            <button type="submit" className="btn btn-info" style={{ marginTop: '7px', width: '65px', height: '47px' }}>
              ➤
            </button>
          </div>
        </div>
      </form>
    </>
  ) : (
    <div className="no-conversation-selected-message">
      Veuillez sélectionner une conversation pour afficher le chat.
    </div>
  )}
</div>

                    </div>
                </div>

            </div>

        </div>

    </div>

</div>
</section>
</>
    );
}