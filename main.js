// const username = "SalumMax";
const apiUser = "https://api.github.com/users/SalumMax";
const apiRepos = "https://api.github.com/users/SalumMax/repos";
const repoList = document.querySelector(".repoList");
// const repoToggle = document.querySelector(".repositories");
const button = document.querySelector(".toggle-btn");
// let langChart = document.querySelector("#myChart");
// let pieChart = new Chart(langChart, {
//   type: "pie",
//   data: {
//     labels: "Language used",
//     datasets: [
//       { label: ["JavaScript", "HTML", "CSS"], data: [5373, 2532, 968] },
//     ],
//   },
// });

// console.log(apiRepoLangs);
// fetch overview page for the profile

fetch(apiUser, {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
})
  .then(turnIntoJSObject)
  .then(displayData);
function turnIntoJSObject(res) {
  return res.json();
}

function displayData(profile) {
  const userInfo = document.querySelector(".user-info");
  userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <h2><a href=${profile.blog}><strong>${profile.name}</strong></a></h2>
            <p style="color:gold"><i>${profile.bio}</i></p>
            <p>
                <strong>Location:</strong> ${profile.location}
            </p>
            <p>
                Profile name: <strong>@${profile.login} </strong><br /><br />
                Repos: ${profile.public_repos}
                Twitter: ${profile.twitter_username}<br /><br />
            </p>
        </div>
    `;
}

// fetch repositories

fetch(apiRepos, {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
})
  .then(toJSON)
  .then(displayRepos);

function toJSON(result) {
  return result.json();
}

function displayRepos(data) {
  data.forEach((repo) => {
    let repoName = `${repo.name}`;
    const apiRepoLangs = `https://api.github.com/repos/SalumMax/${repoName}/languages`;

    // fetching languages for each repo

    fetch(apiRepoLangs).then(turnToJSON).then(show);
    function turnToJSON(res) {
      return res.json();
    }
    function show(langs) {
      console.log(langs);
    }

    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `
            <h2>${repo.name}</h2>
            <span>${repo.description}</span> <br/><br/>
            <span> Main language used: ${devicons[repo.language]}</span> <br />
            <canvas id="myChart" width="200" height="100"></canvas>
            `;
    repoList.append(listItem);
  });
}

// toggle showing and hiding my humble list of repos

button.addEventListener("click", function myFunc() {
  document.querySelector(".repoList").classList.toggle("hide");
});

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["JAVASCRIPT", "CSS", "HTML"],
    datasets: [
      {
        label: "Languages used",
        data: [5373, 2532, 968],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
