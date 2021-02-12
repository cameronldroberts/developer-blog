---
path: golang-1_16-beta
date: 2021-02-11
title: Testing out some features from the Golang 1.16 Beta (Embedded files)
description: Testing out some features from the Golang 1.16 Beta (Embedded files)
tags: ["Golang", "beta", "Embed", "Go"]
canonical_url: "www.cameronroberts.dev/blog/golang-116-beta"
---

So with Go 1.16 coming out soon I figured it would be good to talk about a feature that is coming which I thought was pretty cool. This feature is included in the new [embed package](https://tip.golang.org/pkg/embed/). 

### Installing Go 1.16

As of the time of writing Go 1.16 is still in beta so the steps to install it are as follows

```bash
go get golang.org/dl/go1.16rc1 
go1.16rc1 download 
```

When it's out of beta you will just need to make sure you have upgraded using your usual upgrade mechanism `brew upgrade go` or download it.

### //go:embed

The embed package coming in 1.16 allows you the ability to embed files as part of the Go binary. This is a pretty cool feature and with so many tools existing to provide this kind of functionality it is clear that we need it :D. 
Some examples are 

- [gobindata](https://pkg.go.dev/github.com/jteeuwen/go-bindata)
- [packr](https://pkg.go.dev/github.com/gobuffalo/packr)
- [stuffbin](https://pkg.go.dev/github.com/knadh/stuffbin)

### In action 

Now lets see embed in action..
Create a file called `main.go` and add the following code.. 
```go
package main

import (
_ "embed"
"fmt"
)

//go:embed hello.txt
var message string

func main() {
	fmt.Println(message)
}
```

Before we run this code we need to make sure we have a `hello.txt` that contains our message. This message can be whatever you like but I'm going for the trusty "Hello, World!".

Run the code with the following (if we're still in beta)

```bash
go1.16rc1 run main.go
```

which should output something along the lines of 
```bash
Message : "Hello, World!"
Hello, World!
```

Now a more practical example may be embedding a `version.txt` or some other kind of configuration files. Another use case may be to embed assets for a webapp. 
The code to do that would look something like this.
```go
package main

import (
	"embed"
	"net/http"
)

//go:embed assets/*
var assets embed.FS

func main() {
	fs := http.FileServer(http.FS(assets))
	http.ListenAndServe(":8080", fs)
}

```

That is all for today and hopefully you enjoyed the post!