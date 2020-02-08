const fs = require("fs")
const util = require("util")
const axios = require("axios")
const inquirer = require("inquirer")
const HTML5ToPDF = require("html5-to-pdf")
const generateHTML = require("./generateHtml.js");
const path = require("path")

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

    console.log(userInfo)
}

function userGithub(githubUsername) {
    queryURL = `https://api.github.com/users/${githubUsername}`
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

            console.log(userInfo);
        })
}


async function RenderPDF() {
    try {

        await promptUser();
        await userGithub(userInfo.githubUsername);
        await userStars(userInfo.githubUsername);

        var HTML = generateHTML(userInfo);

        await writeFileAsync("resume.html", HTML);
        await run();
    } catch (err) {
        throw err;
    }
}

RenderPDF()


function userStars(githubUsername) {
    queryURL = `https://api.github.com/users/${githubUsername}/repos`
    axios
        .get(queryURL)
        .then((response) => {
            const repoArray = response.data
            repoArray.forEach(function (response, i) {
                userInfo.stargazersCount = userInfo.stargazersCount += response.stargazers_count
            })
            console.log(userInfo.stargazersCount)
        })
}

const run = async () => {
    const html5ToPDF = new HTML5ToPDF({
        inputPath: path.join(__dirname, ".", "resume.html"),
        outputPath: path.join(__dirname, ".", "resume.pdf"),
    })

    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
}



