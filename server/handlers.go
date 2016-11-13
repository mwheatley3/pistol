package main

import (
	"github.com/mitchellh/mapstructure"
	r "gopkg.in/dancannon/gorethink.v2"
	"time"
)

const (
	channelStop = iota
	userStop
	messageStop
)

func addMessage(client *Client, data interface{}) {
	var message ChannelMessage
	err := mapstructure.Decode(data, &message)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	message.CreatedAt = time.Now()
	go func() {
		err = r.Table("message").
			Insert(message).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeMessage(client *Client, data interface{}) {
	stop := client.NewStopChannel(messageStop)
	result := make(chan r.ChangeResponse)
	var messageSubscribe MessageSubscribe
	err := mapstructure.Decode(data, &messageSubscribe)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	a := make(map[string]interface{})
	a["channelID"] = messageSubscribe.ChannelID
	cursor, err := r.Table("message").
		OrderBy(r.OrderByOpts{Index: "createdAt"}).
		Limit(100).
		Filter(a).
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()
	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"message add", change.NewValue}
				}
			}
		}
	}()
}

func unsubscribeMessage(client *Client, data interface{}) {
	client.StopForKey(messageStop)
}

func addUser(client *Client, data interface{}) {
	var user User
	err := mapstructure.Decode(data, &user)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		err = r.Table("user").
			Insert(user).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func editUser(client *Client, data interface{}) {
	var user User
	err := mapstructure.Decode(data, &user)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		err := r.Table("user").
			Update(user).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func removeUser(client *Client, data interface{}) {
	var user User
	err := mapstructure.Decode(data, &user)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		err := r.Table("user").
			Get(user.ID).
			Delete().
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeUser(client *Client, data interface{}) {
	stop := client.NewStopChannel(userStop)
	result := make(chan r.ChangeResponse)
	cursor, err := r.Table("user").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()
	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"user add", change.NewValue}
				} else if change.OldValue != nil && change.NewValue != nil {
					client.send <- Message{"user edit", change.NewValue}
				}
			}
		}
	}()
}

func unsubscribeUser(client *Client, data interface{}) {
	client.StopForKey(userStop)
}

func addChannel(client *Client, data interface{}) {
	var channel Channel
	err := mapstructure.Decode(data, &channel)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		err = r.Table("channel").
			Insert(channel).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeChannel(client *Client, data interface{}) {
	stop := client.NewStopChannel(channelStop)
	result := make(chan r.ChangeResponse)
	cursor, err := r.Table("channel").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()
	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"channel add", change.NewValue}
				}
			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(channelStop)
}

func logThis(client *Client, data interface{}) {
	message, ok := data.(string)
	if !ok {
		client.send <- Message{"error", "error in logging handler"}
		return
	}
	println("handle logging...", message)
}
