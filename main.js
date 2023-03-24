const projectsContainer = document.querySelector('.projects-list')
const projects = [
    {
        id: 1,
        title: 'Color Generator',
        description: 'Suggest a random color and convert it into different formats',
        image: '1-color-generator/Screenshot.png',
        path: '1-color-generator/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/1-color-flipper'
    },
    {
        id: 2,
        title: 'Stop Watch',
        description: 'Fully functional stop watch.record labs to decimal precision.',
        image: '2-stop-watch/Screenshot.png',
        path: '2-stop-watch/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/2-stop-watch'
    },
    {
        id: 3,
        title: 'Tic Tac Toe',
        description: 'Tow player tic tac toe game, best playable on mobile.',
        image: '3-tic-tac-toe/Screenshot.png',
        path: '3-tic-tac-toe/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/3-tic-tac-toe'
    },
    {
        id: 4,
        title: 'Calculator',
        description: 'A simple mathematical calculator with basic operations.',
        image: '4-calculator/Screenshot.png',
        path: '4-calculator/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/4-calculator'
    },
    {
        id: 5,
        title: 'Analog Clock',
        description: 'Analog clock which allows controlling time passing speed.',
        image: '5-analog-clock/Screenshot.png',
        path: '5-analog-clock/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/5-analog-clock'
    },
    {
        id: 6,
        title: 'Match-3 Game',
        description: 'A prototype of a classic Match-3 game. Can you clear all the tasks?',
        image: '6-match-three/Screenshot.png',
        path: '6-match-three/index.html',
        github: 'https://github.com/yassermuayed/fundamentals/tree/master/6-match-three'
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