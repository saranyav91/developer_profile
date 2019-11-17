const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

var bio;
var name;
var location;
var githublink;
var portfolio_link;
var public_repos;
var followers;
var following;
var github_stars;
var profile_pic_url;

inquirer
  .prompt([{
    message: "Enter your GitHub username",
    name: "username",

  },
  {
    message: "Enter any color",
    name: "color"
  }
  ])
  .then(answers => {
     
    var username = answers.username;
    var color = answers.color;
    const queryUrl = "https://api.github.com/users/" + username + "";
     
    axios
      .get(queryUrl)
      .then(function (res) {
         
        const repos = res.data;         
        bio = repos.bio;
        name = repos.name;         
        location = repos.location;
        githublink = repos.html_url
        portfolio_link = repos.blog;
        public_repos = repos.public_repos;
        followers = repos.followers;
        following = repos.following;
        github_stars = repos.public_gists;
        profile_pic_url = repos.avatar_url;


        var html = generateHTML(color);        
        const puppeteer = require('puppeteer');
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html);
            await page.pdf({path: 'profile.pdf', format: 'A4'});
            await browser.close();
        })()        
      });    
  });

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(color) {
  
  return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>`+ name + ` Profile</title>
        <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[color].headerBackground};
         color: ${colors[color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         align:center;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2, .photo-header h3{
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[color].headerBackground};
           color: ${colors[color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
      </head>
  
      <body>
        <div class="wrapper">
            <div class="photo-header">
                <img src="`+profile_pic_url+`">
                <h1>Hi!</h1>
                <h2>My name is `+name+`</h2>
                <h6>Currently @ Trilogy Education Services</h6>
                <ul class="links-nav">
                    <li class="nav-link"><a href="https://www.google.com/maps/search/?api=1&query=`+location+`" target="_blank"><i class="fas fa-location-arrow"></i>&nbsp;`+location+`</a></li>
                    <li class="nav-link"><a href="`+githublink+`" target="_blank"><i class="fab fa-github-alt"></i>&nbsp;Github</a></li>
                    <li class="nav-link"><a href="`+portfolio_link+`" target="_blank"><i class="fas fa-rss"></i>&nbsp;Blog</a></li>
                </ul>
            </div>
  
            <main>
                <div class="container">
                    <div class="row">
                        <h3 class="col">`+bio+`</h3>
                        <!--bio-->
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <h3>Public Repositories</h3>
                                <h4>`+public_repos+`</h4>
                            </div>
                            <div class="card">
                                <h3>Followers</h3>
                                <h4>`+followers+`</h4>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <h3>Github Stars</h3>
                                <h4>`+github_stars+`</h4>
                            </div>
                            <div class="card">
                                <h3>Following</h3>
                                <h4>`+following+`</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div class="wrapper"></div>
        </div>
      </body>
  </html>`
}






