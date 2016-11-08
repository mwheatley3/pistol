package main

import (
	"github.com/gorilla/websocket"
	r "gopkg.in/dancannon/gorethink.v2"
)

// FindHandler looks up the correct method based on the msg name
type FindHandler func(string) (Handler, bool)

// Message is the
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// Client lkj
type Client struct {
	send         chan Message
	socket       *websocket.Conn
	findHandler  FindHandler
	session      *r.Session
	stopChannels map[int]chan bool
}

// NewStopChannel kjh
func (c *Client) NewStopChannel(stopKey int) chan bool {
	c.StopForKey(stopKey)
	stop := make(chan bool)
	c.stopChannels[stopKey] = stop
	return stop
}

// StopForKey send the stop for a specific channel
func (c *Client) StopForKey(key int) {
	if ch, found := c.stopChannels[key]; found {
		ch <- true
		delete(c.stopChannels, key)
	}
}

func (c *Client) Read() {
	var message Message
	for {
		if err := c.socket.ReadJSON(&message); err != nil {
			break
		}
		if handler, ok := c.findHandler(message.Name); ok {
			handler(c, message.Data)
		}
	}
	c.socket.Close()
}

func (c *Client) Write() {
	for msg := range c.send {
		if err := c.socket.WriteJSON(msg); err != nil {
			break
		}
	}
	c.socket.Close()
}

// Close does cleanup and stops all the channel subscriptions
func (c *Client) Close() {
	for _, ch := range c.stopChannels {
		ch <- true
	}
	close(c.send)
}

// NewClient makes a new client for sending messages
func NewClient(socket *websocket.Conn, findHandler FindHandler, session *r.Session) *Client {
	return &Client{
		send:         make(chan Message),
		socket:       socket,
		findHandler:  findHandler,
		session:      session,
		stopChannels: make(map[int]chan bool),
	}
}
