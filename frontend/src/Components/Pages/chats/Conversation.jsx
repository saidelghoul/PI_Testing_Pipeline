import React from 'react'

export default function Conversation() {
  return (
    <>
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
    </>
  )
}
