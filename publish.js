const axios = require("axios");
const fs = require("fs")
const fm = require('front-matter')
const API_KEY = process.env.API_KEY

// TODO Check for APIKEY
// TODO check existing posts
// TODO Only grab .md files
let dir = 'content/blog/'
let blogs = fs.readdirSync(dir);
blogs.sort(function (a, b) {
    return fs.statSync(dir + b).mtime.getTime() - fs.statSync(dir + a).mtime.getTime();

});

// Read file in
let latestPost = fs.readFileSync(dir + blogs[0], 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
})

let content = fm(latestPost)

const options = {
    headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
    }
};

const data = {
    article: {
        title: content.attributes['title'],
        description: content.attributes['description'],
        published: false,
        tags: content['tags'],
        canonical_url: content['canonical_url'],
        body_markdown: content['body'],
    },
}
// Post to dev.to
axios.post('https://dev.to/api/articles', data, options)
    .then((response) => {
        console.log(response.status);
    }, (error) => {
        console.log(error);
    });
