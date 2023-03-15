const projectsContainer = document.querySelector('.projects-list')
const projects = [
    {
        id: 1,
        title: 'Color Generator',
        description: 'Suggest random color in different formats',
        image: '1-color-generator/Screenshot.png',
        path: '1-color-generator/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/1-color-flipper'
    },
    {
        id: 2,
        title: 'Stop Watch',
        description: 'Fully functional stop watch.',
        image: '2-stop-watch/Screenshot.png',
        path: '2-stop-watch/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/2-stop-watch'
    },
    {
        id: 3,
        title: 'Tic Tac Toe',
        description: 'Tow player tic tac toe game',
        image: '3-tic-tac-toe/Screenshot.png',
        path: '3-tic-tac-toe/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/3-tic-tac-toe'
    },
]

projects.forEach(el => createProject(el))

function createProject(project) {
    const projectContainer = document.createElement('div')
    projectContainer.classList.add('project')
    projectContainer.innerHTML = `
        <div class="project-image">
        <a href="${project.path}" target="_blank" class="btn">
            <img src="${project.image}" alt="${project.title}">
            </a>
        </div>
        <div class="project-info">
        
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <a href="${project.path}" target="_blank" class="btn">Demo</a>
            <a href="${project.github}" target="_blank" class="btn">Code</a>
        </div>
    `
    projectsContainer.appendChild(projectContainer)
}