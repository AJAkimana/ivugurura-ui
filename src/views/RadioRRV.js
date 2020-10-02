import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
  ListGroup
} from 'react-bootstrap';
import '../components/Chat/styles/chat.css';
import socketIo from 'socket.io-client';
import { Page, Radio } from '../components';
import { Communique } from '../components/common';
import { ChatInput, Messages } from '../components/Chat';
import { USER_LISTENER } from '../utils/constants';
import { getMessages } from '../redux/actions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

let socket = socketIo(process.env.REACT_APP_API_URL);
export const RadioRRV = () => {
  const localUser = localStorage.getItem(USER_LISTENER);
  const {
    chatGet: { loaded, messages: chats },
    user: { isAuthenticated, info }
  } = useSelector(({ chatGet, user }) => ({ chatGet, user }));
  const [user, setUser] = useState({});
  const [listener, setListener] = useState({ userId: '', name: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (localUser && !isAuthenticated) {
      setUser(JSON.parse(localUser));
    }
    if (isAuthenticated) {
      setUser({ userId: info.email, name: info.names });
    }
  }, [localUser, isAuthenticated, info]);
  useEffect(() => {
    if (user.userId) {
      const msgParams = isAuthenticated ? 'all' : user.userId;
      socket.emit('join', user, (error) => {});
      getMessages(msgParams);
    }
  }, [isAuthenticated, user]);
  useEffect(() => {
    if (loaded) {
      setMessages(chats);
    }
  }, [loaded, chats]);
  useEffect(() => {
    socket.on('join-message', (joinMessage) => {
      if (isAuthenticated) {
        toast(joinMessage.content);
      } else if (!isAuthenticated && joinMessage.senderId === user.userId) {
        toast(joinMessage.content);
      }
    });

    socket.on('users-list', ({ users: listeners }) => {
      if (isAuthenticated) {
        setUsers(listeners);
      }
    });
    socket.on('new-message', (newMessage) => {
      if (isAuthenticated) {
        setMessages((msgs) => [...msgs, newMessage]);
      } else if (
        !isAuthenticated &&
        (newMessage.senderId === user.userId ||
          newMessage.receiverId === user.userId)
      ) {
        setMessages((msgs) => [...msgs, newMessage]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const saveListener = () => {
    if (!isAuthenticated && listener.name) {
      listener.userId = v4();
      localStorage.setItem(USER_LISTENER, JSON.stringify(listener));
      setUser(listener);
      setListener({ userId: '', name: '' });
    }
  };
  const sendMessage = (event) => {
    event.preventDefault();
    const receiverId = isAuthenticated ? currentUser.userId : null;
    if (message) {
      socket.emit(
        'send-message',
        { senderId: user.userId, message, receiverId },
        () => setMessage('')
      );
    }
  };
  const activateUser = (thisUser) => {
    setCurrentUser(thisUser);
    getMessages(thisUser.userId);
  };
  const closeActiveUser = () => {
    setCurrentUser({});
    getMessages('all');
  };
  return (
    <Page title='Ijwi ry Ubugorozi'>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={3}>
            <Radio />
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <ListGroup as='ul'>
                  {users.map((usr, userIdx) => (
                    <ListGroup.Item
                      key={userIdx}
                      active={usr.userId === currentUser.userId}
                      disabled={usr.userId === user.userId}
                      onClick={() => activateUser(usr)}
                    >
                      {usr.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} md={12} lg={12}></Col>
            </Row>
          </Col>
          <Col xs={12} md={5} lg={5}>
            <Card>
              <Card.Header>
                {!isAuthenticated ? (
                  'Reformation voice'
                ) : currentUser.userId ? (
                  <div>
                    {`Message to ${currentUser.name.toUpperCase()}`}{' '}
                    <i
                      className='fa fa-window-close'
                      onClick={() => closeActiveUser()}
                    ></i>
                  </div>
                ) : (
                  'Reformation voice'
                )}
              </Card.Header>
              {user.name ? (
                <>
                  <Card.Body>
                    <div className='outerContainer'>
                      <div className='chatContainer'>
                        <Messages messages={messages} userId={user.userId} />
                      </div>
                    </div>
                  </Card.Body>
                  {!isAuthenticated || currentUser.userId ? (
                    <Card.Footer>
                      <ChatInput
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                      />
                    </Card.Footer>
                  ) : null}
                </>
              ) : (
                <InputGroup size='lg' className='mb-4 mt-4'>
                  <FormControl
                    placeholder='To give idea or concern, give your names'
                    aria-label='To give idea or concern, give your names'
                    aria-describedby='listener-info'
                    value={listener.name}
                    onChange={({ target }) =>
                      setListener({ ...listener, name: target.value })
                    }
                  />
                  <InputGroup.Append>
                    <Button variant='outline-secondary' onClick={saveListener}>
                      Save
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
