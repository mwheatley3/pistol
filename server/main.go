package main

import (
	r "gopkg.in/dancannon/gorethink.v2"
	"log"
	"net/http"
)

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "rtsupport",
	})
	if err != nil {
		log.Panic(err.Error())
	}
	router := NewRouter(session)

	router.Handle("channel add", addChannel)
	router.Handle("channel subscribe", subscribeChannel)
	router.Handle("channel unsubscribe", unsubscribeChannel)

	router.Handle("user add", addUser)
	router.Handle("user edit", editUser)
	router.Handle("user remove", removeUser)
	router.Handle("user subscribe", subscribeUser)
	router.Handle("user unsubscribe", unsubscribeUser)

	router.Handle("message add", addMessage)
	router.Handle("message subscribe", subscribeMessage)

	router.Handle("log", logThis)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
