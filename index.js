const fs = require("fs")
const util = require("util")
const axios = require("axios")
const inquirer = require("inquirer")
const HTML5ToPDF = require("html5-to-pdf")
const generateHTML = require("./generateHtml.js");
const path = require("path")
require('dotenv').config()

const writeFileAsync = util.promisify(fs.writeFile);

const userInfo = {}

async function promptUser() {
    try {
        let response = await inquirer.prompt([{
            type: "list",
            message: "What would you like your resume background color to be?",
            choices: ["blue", "green", "pink", "red"],
            name: "backgroundColor"
        },
        {
            type: "input",
            message: "What is your Github Username?",
            name: "userUsername"
        }])

        userInfo.githubUsername = response.userUsername
        userInfo.color = response.backgroundColor

    } catch (err) {
        throw err;
    }


}

function userGithub(githubUsername) {
    queryURL = `https://austinatkinson93:${process.env.TOKEN}@api.github.com/users/${githubUsername}`
    return axios
        .get(queryURL)
        .then((response) => {
            userInfo.name = response.data.name
            userInfo.profileIMG = response.data.avatar_url;
            userInfo.repoNum = response.data.public_repos;
            userInfo.followersNum = response.data.followers;
            userInfo.followingNum = response.data.following;
            userInfo.bio = response.data.bio;
            userInfo.location = response.data.location;
            userInfo.profileURL = response.data.url;
            userInfo.blog = response.data.blog;
            userInfo.company = response.data.company;

        })
}


async function RenderPDF() {
    await promptUser();
    await userGithub(userInfo.githubUsername);
    await userStars(userInfo.githubUsername);
    var HTML = await generateHTML(userInfo);
    await writeFileAsync("resume.html", HTML);
    await run();


}



function userStars(githubUsername) {
    queryURL = `https://austinatkinson93:${process.env.TOKEN}@api.github.com/users/${githubUsername}/repos`
    return axios
        .get(queryURL)
        .then((response) => {
            const repoArray = response.data
            userInfo.stargazersCount = 0
            repoArray.forEach(function (response) {
                userInfo.stargazersCount += response.stargazers_count
            })
        }).catch(err => console.log(err))
}


const run = async () => {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: path.join(__dirname, 'resume.html'),
      outputPath: path.join(__dirname, "resume.pdf"),
      templatePath: path.join(__dirname, 'templates', 'basic')
    })

   
    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
  }
   


RenderPDF()

