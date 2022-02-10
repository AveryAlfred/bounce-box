import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { EVENTS } from '../../utils/events.types';
import { useSockets } from '../../utils/useSockets';

export const MessagesContainer = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: 'You',
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = '';
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <Wrapper>
      <MessageList>
        {messages.map(({ message, username, time }, index) => {
          return (
            <Message key={index}>
              <MessageInner key={index}>
                <MessageSender>
                  {username} - {time}
                </MessageSender>
                <MessageBody>{message}</MessageBody>
              </MessageInner>
            </Message>
          );
        })}
        <div ref={messageEndRef} />
      </MessageList>
      <MessageBox>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </MessageBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: red;
  height: 100vh;
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
`;
const MessageList = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
const MessageBox = styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(256, 256, 256, 0.8);
  padding: 1rem;

  textarea {
    flex: 1;
    padding: 1rem;
    font-size: 1.25rem;
  }
  button {
    margin-left: 0.5rem;
    background-color: blueviolet;
    font-size: 1.25rem;
  }
`;
const Message = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: solid 2px #333;
  font-size: 1.25rem;
  background-color: rgba(256, 256, 256, 0.8);
`;
const MessageSender = styled.span`
  color: #333;
  font-size: 0.75rem;
`;
const MessageInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const MessageBody = styled.span`
  word-wrap: break-word;
`;
