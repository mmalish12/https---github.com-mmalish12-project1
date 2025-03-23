const works = [
    { title: "Task 1", url: "works/task1/task1.html" },
    { title: "Task 2", url: "works/task2/task2.html" },
    { title: "Task 3", url: "works/task3/Task3.html" },
    { title: "Task 4", url: "works/task4/task4 .html" },
    { title: "Task 5", url: "works/task5/alert.html" },
    { title: "Mid1 ", url: "mid1.html" },
    { title: "Task 6", url: "works/task6/task10.html" },
    { title: "Task 7", url: "works/task7/task12.html" },
    { title: "Task 8", url: "works/task8/task13.html" },
    { title: "Task 9", url: "works/task9/web.html" },
    { title: "Task 10", url: "works/task10/t9.html" },
    { title: "Task 11", url: "works/task11/age15.html" },
    { title: "Task 12", url: "works/task12/boot15.html" },



];

function createProjects() {
    const projectGrid = document.getElementById('projectGrid');
    const projectFrame = document.getElementById('projectFrame');

    if (!projectGrid || !projectFrame) {
        console.error("Required elements not found in the DOM");
        return;
    }

    works.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.setAttribute('data-url', project.url);
        item.innerHTML = `
            <div class="project-item-header">
                <h5>${project.title}</h5>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="project-item-content">
                <p>Description of ${project.title}.</p>
            </div>
        `;
        projectGrid.appendChild(item);
    });

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const header = item.querySelector('.project-item-header');
        const content = item.querySelector('.project-item-content');

        header.addEventListener('click', () => {
            const isActive = content.classList.contains('active');
            projectItems.forEach(otherItem => {
                otherItem.querySelector('.project-item-content').classList.remove('active');
                otherItem.querySelector('.project-item-header').classList.remove('active');
            });

            if (!isActive) {
                content.classList.add('active');
                header.classList.add('active');
            }

            const url = item.getAttribute('data-url');
            if (url) {
                try {
                    projectFrame.src = ''; 
                    projectFrame.src = url; 
                    projectFrame.style.display = 'block';
                    projectFrame.onload = () => {
                        console.log(`Successfully loaded: ${url}`);
                    };
                    projectFrame.onerror = () => {
                        console.error(`Failed to load: ${url}`);
                        projectFrame.style.display = 'none';
                        alert('Failed to load project. Please check the file path or server configuration.');
                    };
                } catch (error) {
                    console.error('Error loading iframe:', error);
                }
            } else {
                console.warn('No URL found for this project');
            }
        });
    });
}

window.onload = () => {
    try {
        createProjects();
    } catch (error) {
        console.error('Error initializing projects:', error);
    }
};