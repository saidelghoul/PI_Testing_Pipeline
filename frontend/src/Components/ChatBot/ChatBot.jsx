import React, { useState } from 'react';
import '../ChatBot/ChatBot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." };

export default function ChatBot() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            sender: "user"
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role, content: messageObject.message };
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        };

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error:', error);
            setIsTyping(false);
        }
    }

    return (
        <div className="App">
            <div style={{ position: "relative", height: "800px", width: "1512px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}
