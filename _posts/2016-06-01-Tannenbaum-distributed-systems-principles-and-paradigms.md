---
layout: default
title:  "[DISTRIBUTED SYSTEMS - Principles and Paradigms] Reading Notes"
date:   2016-06-01 03:00:00
categories: blog
tags: 
  - Distributed Systems
  - Reading Notes
---

# Chapter 1 - Introduction
------

## 1. Goals

### 1.1 Accessible

### 1.2 Transparency

### 1.3 Openness

### 1.4 Scalability

### 1.5 Pitfalls

## 2. Types of distributed systems

### 2.1 Distributed Computing Systems

- **Cluster Computing Systems**  
	Consists of a collection of similar workstations or PCs, connected by means of a high-speed local-area network.

- **Grid Computing Systems**  
	Constructed as a federation of computer systems. Each system may fall under a different administrative domain, and may be very different when it comes to hardware, software and network.

### 2.2 Distributed Information Systems

- **Transaction Processing Systems**  
	1) Transaction's properties: ACID(Atomic, Consistent, Isolated and Durable).  
	2) Nested transactions(constructed from a number of subtransactions) are important in distributed systems, naturally distributing a transaction across multiple machines.
	
- **Enterprise Application Integration**  
	1) Existing applications could directly exchange information with remote procedure calls(RPC).  
	2) Remote method invocations(RMI) operates on objects while RPC operates on applications(essentially the same).

### 2.3 Distributed Pervasive Systems

Three requirements for pervasive applications:  

1. Embrace contextual changes (Its environment may change all the time).  
2. Encourage ad hoc composition (Devices will be used in different ways by different users).  
3. Recognize sharing as the default (Devices generally join the system in order to access or provide information).  

Some concrete examples:  

- **Home Systems**  
	1) Completely self-configuring and self-managing.  
	2) System should be subject to sharing restrictions (known as *`"personal space"`*).  
	3) Storing relevant data and could find it later (recommender).  

- **Electronic Health Care Systems**  
	1) `body-area network (BAN)`  
	2) Two modes: `local hub` or `continuous wireless connection` (Page 28 Fig 1-12).  

- **Sensor Networks**  
	1) Two extremes:  
	--- (a) Sensor data is sent directly to operator (only at operator's site).  
	--- (b) Sensor send only answer (each sensor can process and store data, only at sensors).  
	2) In-network data processing: forward a query to all sensor nodes and aggregate the results subsequently.  

# Chapter 2 - Architectures
------
> Mainly focus on traditional `centralized` architectures and `decentralized` architectures

## 1. Architectural Systems  
- The important issue about a component for distributed systems is that it can be **replace** (interfaces).  
- **Architecture Styles**  
	1. Layered Architectures  
	requests go down whereas the results flow upward.  
	2. Object-based Architectures  
	More looser, and components are connected through a (R)PC mechanism.
	3. Data-centered Architectures  
	Processes communicate through a common repository (Date-centric).  
	4. Event-based Architectures  
	Communicate through the propagation. Known as `Publish/Subscribe systems`.  

## 2. System Architectures  

### 2.1 Centralized Architectures  

In basic client-server model :  

Communication					|Advantage	|Problem
--------------------------------|-----------|-------
Connectionless Protocal			|Efficient	|Client can not detect whether the original request message was lost, or that transmission of the reply failed (Resending a request may result in performing the operation twice)
Connection-Oriented Protocal	|Reliable	|Setting up and tearing down a connection is costly (Especially when request and reply messages are small)

- **Application Layering** (Logical level)  
	Distinguish a client-server application between the following three levels:  
	1. the `User-Interface` level  
	2. the `Processing` level  
	3. the `Data` level  
	(three examples in Page 39-40)  

- **Multi-tiered Architectures** (Physical level)  
	Introduces two-tiered architecture and three-tiered architecture:  
	1. the simplest organization could have only two types of machines: A `client` machine containing only the programs implementing (part of) the UI level, and a `server` machine containing the rest (processing and data level).  
	2. Three-tiered architecture examples:  
		a) Transaction processing:  
		`a separate process => transaction processing monitor => different data server`  
		b) Web sites  

	*Noted that :* ---------

	> - Having more functionality on the client machine makes client-side software more prone to errors and more dependent on the client's underlying platform.  
	> - Server-side solution is becoming more distributed as a single server is being replaced by multiple servers running on different machines.  
	> - A server may sometimes act as a client.  

### 2.2 Decentralized Architectures  

> Relevant: [Overlay network][Overlay network] \| [Peer-to-peer][Peer-to-peer] \| [Analysis of Chord - zh_cn][Analysis of Chord]

- **Structured Peer-to-Peer Architectures**  
	1. [DHT (Distributed Hash Table)][DHT]  
	2. In DHT-based systems, notes that:  
		**`1)`** Look up a key  
		**`2)`** Nodes joining the system  
		**`3)`** Nodes failure  
		**`4)`** Nodes leaving  
	3. Examples: [Chord][Chord] \| [CAN (Content Addressable Network)][CAN]  

- **Unstructured Peer-to-Peer Architectures**  
	1. Each entry identifies another node in the network, and has an associated age (how old the reference to the node).  
	2. Two threads (Fig. 2-9 Page 48)  
	3. Node's joining and leaving.  
	4. A popular node may easily become overload.  

- **Topology Management of Overlay Networks**  
	1. Two-layered topology management  

			               Structured overlay
					              /| | a set of ordered
					               | | nodes (Ranking function)
			-----------------------------------------
			randomly selected live | |
			  nodes (periodically) | |/
				              Random overlay

	2. Different *ranking functions* (such as `semantic proximity of data items`)

- **Superpeers**  
	

### 2.3 Hybrid Architectures  

- **Edge-Server Systems**  

- **Collaborative Distributed Systems**  

## 3. Architectures VS. Middleware  

### 3.1 Interceptors  

### 3.2 General Approaches to Adaptive Software  

### 3.3 Discussion  

## 4. Self-Management in Distributed Systems  

### 4.1 The Feedback Control Model  

### 4.2 Examples

- ****  

- ****  

<!-- Reference -->
[Overlay network]: https://en.wikipedia.org/wiki/Overlay_network
[Peer-to-peer]: https://en.wikipedia.org/wiki/Peer-to-peer
[Analysis of Chord]: http://www.yeolar.com/note/2010/04/06/p2p-chord/
[DHT]: https://en.wikipedia.org/wiki/Distributed_hash_table
[Chord]: https://en.wikipedia.org/wiki/Chord_(peer-to-peer)
[CAN]: https://en.wikipedia.org/wiki/Content_addressable_network