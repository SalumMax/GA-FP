const username = "SalumMax";
const api = `https://api.github.com/users/${username}`;
const repositories = "/repos?page=1";
const repoList = document.querySelector(".repoList");
// const repoToggle = document.querySelector(".repositories");
const button = document.querySelector(".toggle-btn");

// fetch overview page for the profile

fetch(api).then(turnIntoJSObject).then(displayData);

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
            <p>${profile.bio}</p>
            <p>
                <strong>Location:</strong> ${profile.location}
            </p>
            <p>
                <strong>@${profile.login} </strong>
                Repos: ${profile.public_repos}
                Gists: ${profile.public_gists}
            </p>
        </div>
    `;
}

// fetch repositories

fetch(api + repositories)
  .then(toJSON)
  .then(displayRepos);

function toJSON(result) {
  return result.json();
}

function displayRepos(data) {
  data.forEach((repo) => {
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `
            <h3>${repo.name}</h3>
            <span>${repo.description}</span> <br/><br/>
            <br />
            <span> Language:${devicons[repo.language]}</span> <br />
            <br />
            <a href=${repo.html_url} target="blank">View Project</a>`;
    repoList.append(listItem);
  });
}

button.addEventListener("click", function myFunc() {
  document.querySelector(".repositories").classList.toggle("hide");
});
