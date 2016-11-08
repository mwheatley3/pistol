package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	r "gopkg.in/dancannon/gorethink.v2"
	"net/http"
)

// Handler handles incoming requests
type Handler func(*Client, interface{})

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// Router maps requests to appropriate actions
type Router struct {
	rules   map[string]Handler
	session *r.Session
}

// NewRouter is in initializer for a router
func NewRouter(session *r.Session) *Router {
	return &Router{
		rules:   make(map[string]Handler),
		session: session,
	}
}

// Handle is used to handle incoming messages
func (r *Router) Handle(msgName string, handler Handler) {
	r.rules[msgName] = handler
}

// FindHandler looks up the correct method based on the msg name
func (r *Router) FindHandler(msgName string) (Handler, bool) {
	handler, ok := r.rules[msgName]
	return handler, ok
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	socket, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		return
	}
	println("here")
	client := NewClient(socket, r.FindHandler, r.session)
	defer client.Close()
	go client.Write()
	client.Read()
}
