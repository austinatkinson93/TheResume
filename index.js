const fs = require("fs")
const axios = require("axios")
const inquirer = require("inquirer")

const userInfo = {}
let stargazersCount = 0


async function promptUser() {
    return await inquirer.prompt([{
        type: "list",
        message: "What would you like your resume background color to be?",
        choices: ["blue", "green", "pink", "red"],
        name: "backgroundColor"
    },
    {
        type: "input",
        message: "What is your Github Username?",
        name: "userUsername"
    }]).then((response) => {
        userInfo.githubUsername = response.userUsername
        userInfo.resumeBGC = response.backgroundColor
    }
    )
}

function userGithub(githubUsername) {
    queryURL = `https://api.github.com/users/${githubUsername}`
    return axios
        .get(queryURL)
        .then((response) => {
            userInfo.profileIMG = response.data.avatar_url;
            userInfo.repoNum = response.data.public_repos;
            userInfo.followersNum = response.data.followers;
            userInfo.followingNum = response.data.following;
            userInfo.bio = response.data.bio;
        })
}


async function test() {
    await promptUser(); 
    await userGithub(userInfo.githubUsername);
    await console.log(userInfo);
    
}

test()
// promptUser()
//     .then(console.log())
//     .catch(function(err) {
//         console.log(err);
//       })

function userStars() {
    queryURL = `https://api.github.com/users/arcanis/repos`
    axios
        .get(queryURL)
        .then((response) => {
            const repoArray = response.data
            repoArray.forEach(function (response, i) {
                userinfo.stargazersCount = stargazersCount += response.stargazers_count
            })
            console.log(stargazersCount)
        })
}


// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() { }

// init()
