async function fetchRepositories(username = 'UnicornChorizo') {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url);
  const repositories = await response.json();
  updateGallery(repositories);
}

function updateGallery(repositories) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear the gallery

  repositories.forEach(repo => {
    const repoElement = document.createElement('div');
    repoElement.className = 'repository';
    repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> ${repo.name}</a></h3>
            <p>${repo.description || 'No description'}</p>
            <p>Created: ${new Date(repo.created_at).toLocaleDateString()}</p>
            <p>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p>Commits: <span class="commits">Loading...</span></p>
            <div class="languages"></div>
            <p>Watchers: ${repo.watchers_count}</p>
        `;
    gallery.appendChild(repoElement);

    // Fetch and display commit count
    fetchCommits(repo.full_name, repoElement.querySelector('.commits'));

    // Fetch and display languages
    fetchLanguages(repo.languages_url, repoElement.querySelector('.languages'));
  });
}

async function fetchCommits(fullName, commitsElement) {
  const url = `https://api.github.com/repos/${fullName}/commits`;
  const response = await fetch(url);
  const commits = await response.json();
  commitsElement.textContent = commits.length;
}

async function fetchLanguages(languagesUrl, languagesElement) {
  const response = await fetch(languagesUrl);
  const languages = await response.json();
  Object.keys(languages).forEach(language => {
    const languageElement = document.createElement('span');
    languageElement.className = 'language';
    languageElement.textContent = language;
    languagesElement.appendChild(languageElement);
  });
}

// Load your own GitHub page when the index page is first loaded
fetchRepositories();
