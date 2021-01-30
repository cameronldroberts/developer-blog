---
path: golang-twitter-scraper
date: 2020-12-05
title: Using the Twitter API to scrape tweets
description: Using the Twitter API to scrape tweets
tags: [ "Golang", "twitter", "API", "Search"]
---

# Golang Twitter bot 
This post will talk through the steps on how to create your own Twitter bot in Go! We will be making use of [go-twitter](https://github.com/dghubble/go-twitter) which is a Go client library for the Twitter API. Big thanks to the developers over there for making an easy to use library.

## Prerequisites 
- Twitter developer account
- Valid Golang installation 
- Basic programming knowledge

## Creating a Twitter API key
If you haven't already got a developer account on Twitter you will need to sign up. The steps to do this are documented [here](https://developer.twitter.com/en/apply-for-access). 

Once you have an approved developer account head over to the [dashboard](https://developer.twitter.com/en/portal/dashboard) and create a new `Project`.

Take note of your API key, API key secret, access token, access token secret as we will need these in a few moments time.

## Project setup 

```bash
mkdir twitter-bot
cd twitter-bot
go mod init github.com/cameronldroberts/twitter-bot
```

## Go....code!

Open the `twitter-bot` directory in your favourite editor and create a file named `main.go`. 

Firstly we will focus on authenticating with twitter. We are going to store the keys in environment variables. It's not a good idea to have sensitive information stored in our code as when it reaches our source control (Github, Gitlab, etc) it may be visible to others. 

Head over to the developer dashboard [page](https://developer.twitter.com/en/portal/dashboard) where you should see the project you just created. On the left hand side click the name of your project under `Projects & Apps`. Navigate to the `Keys and tokens` page which is where we grab the API keys from. 

We need four values `CONSUMER_KEY`, `CONSUMER_SECRET`, `ACCESS_TOKEN` and `ACCESS_TOKEN_SECRET`. These can all be found on the `Keys and tokens` page. Once you have the values populate the export commands with the right values.
```bash
export CONSUMER_KEY=<API_KEY_VALUE>
export CONSUMER_SECRET=<API_KEY_SECRET_VALUE>
export ACCESS_TOKEN=<ACCESS_TOKEN_VALUE>
export ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET_VALUE>
```

Once we have exported the environment variables we need to read them in via our Go code. The following code will do that and it will be the method we use when the code is complete 

```go
package main
import (
	"fmt"
	"os"
)

type Credentials struct {
	ConsumerKey       string
	ConsumerSecret    string
	AccessToken       string
	AccessTokenSecret string
}

func main() {
	creds := Credentials{
		ConsumerKey:       os.Getenv("CONSUMER_KEY"),
		ConsumerSecret:    os.Getenv("CONSUMER_SECRET"),
		AccessToken:       os.Getenv("ACCESS_TOKEN"),
		AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),
	}

	 fmt.Printf("%+v\n",creds)
}
```

This bit of the code can be divided into three sections 
- Imports 
  This is where we import other packages that we make use of in our code. It's only a short list at the moment but we will be adding a few by the time we have completed the Twitter bot! 
- Struct 
  We define a struct to store the keys that we need to use for authenticating with Twitter. 
- `main` function 
    This function is slightly special in that it is the entrypoint and will be called automatically when we run our program. For now we are just going to prove that we can read in our environment variables.

Copy the code snippet into `main.go` and run it using the following command 

```bash
go run main.go
```
This should output something similar to this 
```bash
{randomvalue1 randomvalue2 randomvalue3 randomvalue4}
```
In your case each of the values should be referring to the keys from twitter.

## Authenticating with Twitter 

Now that we have exported our environment variables and are able to read them in we are ready to authenticate with Twitter.


```go
func getClient(creds *Credentials) (*twitter.Client, error) {

	// These values are the API key and API key secret
	config := oauth1.NewConfig(creds.ConsumerKey, creds.ConsumerSecret)
	// These values are the consumer access token and consumer access token secret
	token := oauth1.NewToken(creds.AccessToken, creds.AccessTokenSecret)
	httpClient := config.Client(oauth1.NoContext, token)
	client := twitter.NewClient(httpClient)

	verify := &twitter.AccountVerifyParams{
		SkipStatus:   twitter.Bool(true),
		IncludeEmail: twitter.Bool(true),
	}
	user, _, err := client.Accounts.VerifyCredentials(verify)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	// print out the Twitter handle of the account we have used to authenticate with 
	fmt.Println("Successfully authenticated using the following account : ", user.ScreenName)
	return client, nil
}
```

We can now call this function from within our main function. Replace this line(we don't need to log the credentials out anymore)
```go
fmt.Printf("%+v\n",creds)
```

with 

```go
client, err := getClient(&creds)
if err != nil {
    fmt.Println(err)
    os.Exit(1)
}
```

## Search tweets

As I have mentioned previously the [go-twitter](https://github.com/dghubble/go-twitter) client library makes it nice and easy to talk to the Twitter  API in Go! Let's create our next function where we make use of the search functionality


```go
func searchTweets(client *twitter.Client) error {

	search, _, err := client.Search.Tweets(&twitter.SearchTweetParams{
		Query: "bonjour",
	})

	if err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println("search : ", search)
	return nil
}
```

Add the following line to our `main()` function (at the bottom)
```go
searchTweets(client)
```

and then run the code with `go run main.go` 

Your terminal window will turn into what looks like a wall of text that doesn't make a lot of sense. This code works but there's definitely room for improvement! All of the tweets that were returned were in French (Not surprising given the search parameter) and the big wall of text is not very readable. Let's make some improvements to the `searchTweets()` function. 

## Improving our search function
I'm not sure about you but unfortunately I'm unable to speak French so the first change we'll make is to add a language to the search parameters. We do this by adding the following parameter for English `Lang:  "en",`. This will bring back tweets where Twitter has detected the language to be English. Let's change our search parameter to become the following 
```go
search, _, err := client.Search.Tweets(&twitter.SearchTweetParams{
    Query: "bonjour",
    Lang:  "en",
})
```

The second change is to parse the interesting bits of each tweet into a struct so we can ignore the bits we don't care about and more clearly see the bits we do care about! Let's try and keep things anonymous by only grabbing the tweet likes, retweets and the tweet itself. To do this let's create another struct but this time it will hold tweet data instead of credentials 

```go
type TweetData struct {
	Tweet         string
	LikeCount    int
	RetweetCount int
}
```

When we use the client to search tweets we get a `twitter.Search` object back which has an array of tweets and metadata. To grab out the values we want to keep we will loop over the array of tweets creating a struct to hold the data. We will print each struct so it makes it more readable than the previous wall of text! 

New and improved...
```go
func searchTweets(client *twitter.Client) error {
	search, _, err := client.Search.Tweets(&twitter.SearchTweetParams{
		Query: "bonjour",
		Lang:  "en",
	})

	if err != nil {
		fmt.Println(err)
		return err
	}

	for _, v := range search.Statuses {
		tweet := TweetData{
			Tweet:        v.Text,
			LikeCount:    v.FavoriteCount,
			RetweetCount: v.RetweetCount,
		}
		fmt.Printf("%+v\n", tweet)
	}
	return nil
}
```

Replace the existing `searchTweets()` with the above snippet of code. Feel free to add/remove/change the `SearchTweetParams` to something you find more interesting. You could change the query parameter to something else (maybe `"Formula 1"`). You could also add on some additional parameters to the query.

At the moment this is a pretty simple use case but hopefully it gives you a foundation to build on. We could go on and build up an array of tweets and do some kind of processing on them. We could send tweets via the client when a certain condition is true. 


## TLDR 

If you just want to skip ahead to the completed code snippet or want to use the completed snippet for reference, here it is. If you come straight here don't forget to make sure you have your API keys setup.

```go
package main

import (
	"fmt"
	"os"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

type Credentials struct {
	ConsumerKey       string
	ConsumerSecret    string
	AccessToken       string
	AccessTokenSecret string
}

type TweetData struct {
	Tweet        string
	LikeCount    int
	RetweetCount int
}

func main() {
	creds := Credentials{
		ConsumerKey:       os.Getenv("CONSUMER_KEY"),
		ConsumerSecret:    os.Getenv("CONSUMER_SECRET"),
		AccessToken:       os.Getenv("ACCESS_TOKEN"),
		AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),
	}

	client, err := getClient(&creds)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	searchTweets(client)
}

func getClient(creds *Credentials) (*twitter.Client, error) {

	// These values are the API key and API key secret
	config := oauth1.NewConfig(creds.ConsumerKey, creds.ConsumerSecret)
	// These values are the consumer access token and consumer access token secret
	token := oauth1.NewToken(creds.AccessToken, creds.AccessTokenSecret)
	httpClient := config.Client(oauth1.NoContext, token)
	client := twitter.NewClient(httpClient)

	verify := &twitter.AccountVerifyParams{
		SkipStatus:   twitter.Bool(true),
		IncludeEmail: twitter.Bool(true),
	}
	user, _, err := client.Accounts.VerifyCredentials(verify)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	// print out the Twitter handle of the account we have used to authenticate with
	fmt.Println("Successfully authenticated using the following account : ", user.ScreenName)
	return client, nil
}

func searchTweets(client *twitter.Client) error {
	search, _, err := client.Search.Tweets(&twitter.SearchTweetParams{
		Query: "Formula 1",
		Lang:  "en",
	})

	if err != nil {
		fmt.Println(err)
		return err
	}

	for _, v := range search.Statuses {
		tweet := TweetData{
			Tweet:        v.Text,
			LikeCount:    v.FavoriteCount,
			RetweetCount: v.RetweetCount,
		}
		fmt.Printf("%+v\n", tweet)
	}
	return nil
}
```