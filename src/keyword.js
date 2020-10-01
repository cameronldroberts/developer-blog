const pd = require('paralleldots');
const fs = require('fs')

pd.apiKey = "14dqmvCmv16cgmYeVrjqEqJtXMgIS7p4SzcpchaRUQ8";
let keywordStringToProcess = ''
let testFolder = '/Users/cameronroberts/dev/developer-blog/cameron-blog/content/blog/'
let files = fs.readdirSync(testFolder)
let keywords = []

files.forEach(element => {
    keywordStringToProcess += fs.readFileSync('/Users/cameronroberts/dev/developer-blog/cameron-blog/content/blog/' + element, (err, data) => {
        if (err) throw err;
    })
})

async function test() {
    await pd.keywords(keywordStringToProcess)
        .then((response) => {
            let parsedResponse = JSON.parse(response)
            parsedResponse.keywords.forEach(element => {
                if (element.confidence_score > 0.60) {
                    keywords.push(element.keyword)
                }
            })

        })
        .catch((error) => {
            console.log(error);
        })
    return "cameron"
}
let cam = test()
console.log(cam)