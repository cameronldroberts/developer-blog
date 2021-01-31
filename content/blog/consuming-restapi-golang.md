---
path: GolangRestAPI
date: 2021-01-30
title: Consuming a REST API using Golang
description: Consuming a REST API using Golang 
tags: ["Golang", "REST", "API", "Go"]
canonical_url: "www.cameronroberts.dev/blog/consuming-restapi-golang"
---

This post will talk about how to consume a REST API using Go. We will go through steps to setup the Go project, Go Modules used and how we run the code.

### Prerequisites
- Valid Golang installation
If you need instructions on how to install it this is a good place to [start](https://golang.org/doc/install)

### Introduction
This is a popular task to complete as developer so I figured it would be a good one to start with. The API that will be used in this post is [icanhazdadjoke](https://medium.com/r/?url=https%3A%2F%2Ficanhazdadjoke.com%2F) as you can probably guess from the URL it will return a joke when called. To get started let's create a new directory that will hold the project.

### Project setup

```bash
mkdir golang-api
cd golang-api
go mod init github.com/cameronldroberts/golang-api
touch main.go
```

We are now ready to get started with the coding! Open the `golang-api` project in your favourite editor (VSCode for me) and open `main.go` which is where the code will live.

### Imports
To start with we will cover the imports which is how we pull in other Go modules. In Go a module is a collection of one or more packages which contain related code. In order to call the API we will be using the following four. Depending on the editor (and settings) you use the imports will be handled automatically and therefore you may not need to do the following step of manually adding the imports.

```Go
package main
import (
 "encoding/json"
 "fmt"
 "io/ioutil"
 "net/http"
)
```
### Example response
This in an example response that we get from the API when calling it. As we know the structure of the JSON response that we will receive we can map this into a struct.

```
{
"id": "XgVnOK6USnb",
"joke": "What did the calculator say to the student? You can count on me",
"status": 200
}
```

### Struct 
The struct is fairly basic so in this instance it wouldn't be too much work to map from JSON to the struct below.

In the event that we have a much larger JSON response this can become quite a time consuming process. Not to worry as there's a useful tool called 
[JSON-to-Go](https://medium.com/r/?url=https%3A%2F%2Fmholt.github.io%2Fjson-to-go%2F) which handles the conversion.

### Code 

Finally for the function that calls the API and handles the response. When developing with Go it would not be advised to have function logic inside `main()` as this is meant to be the entry point for your program. For the purpose of this article we will be placing the code in main but it's not advised when developing in the real world. More on that [here](https://medium.com/r/?url=https%3A%2F%2Fgolang.org%2Fdoc%2Fcode.html)

```Go
func main() {
 fmt.Println("Calling API...")
client := &http.Client{}
 req, err := http.NewRequest("GET", "https://icanhazdadjoke.com/", nil)
 if err != nil {
  fmt.Print(err.Error())
 }
 req.Header.Add("Accept", "application/json")
 req.Header.Add("Content-Type", "application/json")
 resp, err := client.Do(req)
defer resp.Body.Close()
 bodyBytes, err := ioutil.ReadAll(resp.Body)
 if err != nil {
  fmt.Print(err.Error())
 }
var responseObject Response
 json.Unmarshal(bodyBytes, &responseObject)
 fmt.Printf("API Response as struct %+v\n", responseObject)
}
```

- Firstly we create a http client and create our http request
- We then add a couple of http headers to our request before sending the http request with `resp, err := client.Do(req)`
- We read in the response and then we unmarshal it into our response struct
- Finally we print out the response

### Running the project
To run the project use the following command

```bash
go run main.go
```

This will compile and run the `main.go` file. If all has gone well you should have a joke printed into your terminal. The output should look something like


```bash
go run main.go
Calling API...
API Response as struct {ID:5h399pWLmyd Joke:What did the beaver say to the tree? It's been nice gnawing you. Status:200}
```

### TLDR

Completed code snippet for consuming the canihazdadjoke REST API using Go!

```Go
package main
import (
 "encoding/json"
 "fmt"
 "io/ioutil"
 "net/http"
)
type Response struct {
 ID     string `json:"id"`
 Joke   string `json:"joke"`
 Status int    `json:"status"`
}
func main() {
 fmt.Println("Calling API...")
client := &http.Client{}
 req, err := http.NewRequest("GET", "https://icanhazdadjoke.com/", nil)
 if err != nil {
  fmt.Print(err.Error())
 }
 req.Header.Add("Accept", "application/json")
 req.Header.Add("Content-Type", "application/json")
 resp, err := client.Do(req)
defer resp.Body.Close()
 bodyBytes, err := ioutil.ReadAll(resp.Body)
 if err != nil {
  fmt.Print(err.Error())
 }
var responseObject Response
 json.Unmarshal(bodyBytes, &responseObject)
 fmt.Printf("API Response as struct %+v\n", responseObject)
}
```

and thats it for the first post! Hopefully you found it helpful.
https://www.cameronroberts.dev/