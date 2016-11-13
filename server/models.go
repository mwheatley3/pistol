package main

import (
	"time"
)

// DBRecord provides functionality for all types of records
type DBRecord interface {
	setTime()
}

// Channel us
type Channel struct {
	ID        string    `json:"id,omitempty" gorethink:"id,omitempty"`
	Name      string    `json:"name" gorethink:"name"`
	CreatedAt time.Time `json:"createdAt,omitempty" gorethink:"createdAt"`
}

func (c Channel) setTime() {
	c.CreatedAt = time.Now()
}

// User lkj
type User struct {
	ID        string    `json:"id" gorethink:"id,omitempty"`
	Name      string    `json:"name" gorethink:"name"`
	CreatedAt time.Time `json:"createdAt" gorethink:"createdAt"`
}

func (u User) setTime() {
	u.CreatedAt = time.Now()
}

// ChannelMessage lkj
type ChannelMessage struct {
	ID        string    `json:"id" gorethink:"id,omitempty"`
	Author    string    `json:"author" gorethink:"author"`
	ChannelID string    `json:"channelID" gorethink:"channelID"`
	Body      string    `json:"body" gorethink:"body"`
	CreatedAt time.Time `json:"createdAt" gorethink:"createdAt"`
}

func (cm ChannelMessage) setTime() {
	cm.CreatedAt = time.Now()
}

// MessageSubscribe lkj
type MessageSubscribe struct {
	ChannelID string `json:"channelID"`
}
