import "./style.css";
import PlusIcon from "../img/Plus.svg";

class Page {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
        this.currentView = "today";
        this.loadFromStorage();
    }

    createPage() {
        this.header = this.createHeader();
        this.navigator = this.createNavigator();
        this.main = this.createMain();
        
        this.setActiveNav("today");
        
        this.updateCards();
    }
    saveToStorage() {
    try {
        const data = {
            tasks: this.tasks,
            nextId: this.nextId
        };
        localStorage.setItem('todoListData', JSON.stringify(data));
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
    }
}

loadFromStorage() {
    try {
        const savedData = localStorage.getItem('todoListData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.tasks = data.tasks || [];
            this.nextId = data.nextId || 1;
            
            
            this.tasks = this.tasks.map(task => ({
                ...task,
                dueDate: new Date(task.dueDate)
            }));
        }
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        this.tasks = [];
        this.nextId = 1;
    }
}
deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToStorage();  // ← HIER EINFÜGEN
    this.updateCards();
}

    createHeader() {
        this.containerHeader = document.createElement("div");
        this.containerHeader.className = "containerHeader";
        this.titleHeader = document.createElement("h1");
        this.titleHeader.className = "titleHeader";
        this.titleHeader.textContent = "My To-Do-List";

        this.containerHeader.append(this.titleHeader);

        return this.containerHeader;
    }

    createNavigator() {
        this.containerNav = document.createElement("nav");
        this.containerNav.className = "containerNav";
        this.navList = document.createElement("ul");
        this.navList.className = "navList";

        this.navItemToday = document.createElement("li");
        this.navItemToday.className = "navItem";
        this.navItemToday.textContent = "Today";
        this.navItemToday.dataset.view = "today";
        this.navItemToday.addEventListener("click", () => {
            this.switchView("today");
        });

        this.navItemWeek = document.createElement("li");
        this.navItemWeek.className = "navItem";
        this.navItemWeek.textContent = "Week";
        this.navItemWeek.dataset.view = "week";
        this.navItemWeek.addEventListener("click", () => {
            this.switchView("week");
        });

        this.navItemMonth = document.createElement("li");
        this.navItemMonth.className = "navItem";
        this.navItemMonth.textContent = "Month";
        this.navItemMonth.dataset.view = "month";
        this.navItemMonth.addEventListener("click", () => {
            this.switchView("month");
        });

        this.navList.append(this.navItemToday, this.navItemWeek, this.navItemMonth);
        this.containerNav.append(this.navList);

        this.addButton = document.createElement("button");
        this.addButton.className = "addButton";

        const plusImg = document.createElement("img");
        plusImg.src = PlusIcon;
        plusImg.alt = "Add Task";
        plusImg.className = "plusIcon";
        this.addButton.append(plusImg);

        const addText = document.createElement("span");
        addText.className = "addText";
        addText.textContent = "Add Task";
        this.addButton.append(addText);

        this.addButton.addEventListener("click", () => {
            this.showAddTaskDialog();
        });

        this.containerNav.append(this.addButton);

        return this.containerNav;
    }

    setActiveNav(view) {
        document.querySelectorAll('.navItem').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`.navItem[data-view="${view}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    switchView(view) {
        this.currentView = view;
        this.setActiveNav(view);
        this.updateCards();
    }

    createMain() {
        this.containerMain = document.createElement("main");
        this.containerMain.className = "containerMain";
        this.cards = this.createCards();
        this.containerMain.append(this.cards);
        return this.containerMain;
    }

    createCards() {
        this.containerCards = document.createElement("div");
        this.containerCards.className = "containerCards";
        return this.containerCards;
    }

    showAddTaskDialog() {
        const overlay = document.createElement("div");
        overlay.className = "dialog-overlay";

        const dialog = document.createElement("div");
        dialog.className = "dialog";

        const dialogTitle = document.createElement("h2");
        dialogTitle.className = "dialog-title";
        dialogTitle.textContent = "Add new Tasks";

        const form = document.createElement("form");
        form.className = "dialog-form";

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title *";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Put in Task ...";
        titleInput.className = "dialog-input";
        titleInput.required = true;

        const descLabel = document.createElement("label");
        descLabel.textContent = "Description";
        const descInput = document.createElement("textarea");
        descInput.placeholder = "Description of Task...";
        descInput.className = "dialog-textarea";
        descInput.rows = 3;

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Due Date *";
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.className = "dialog-input";
        dateInput.required = true;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${year}-${month}-${day}`;

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority";
        const prioritySelect = document.createElement("select");
        prioritySelect.className = "dialog-select";

        const priorities = ["Low", "Medium", "High"];
        priorities.forEach(p => {
            const option = document.createElement("option");
            option.value = p;
            option.textContent = p;
            prioritySelect.append(option);
        });
        prioritySelect.value = "Medium";

        const noteLabel = document.createElement("label");
        noteLabel.textContent = "Notes";
        const noteInput = document.createElement("textarea");
        noteInput.placeholder = "Additional Notes...";
        noteInput.className = "dialog-textarea";
        noteInput.rows = 3;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "dialog-buttons";

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "dialog-button dialog-cancel";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "dialog-button dialog-submit";
        submitButton.textContent = "Add";

        buttonContainer.append(cancelButton, submitButton);

        form.append(
            titleLabel, titleInput,
            descLabel, descInput,
            dateLabel, dateInput,
            priorityLabel, prioritySelect,
            noteLabel, noteInput,
            buttonContainer
        );

        dialog.append(dialogTitle, form);
        overlay.append(dialog);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = titleInput.value.trim();
            const description = descInput.value.trim();
            const dueDate = dateInput.value;
            const priority = prioritySelect.value;
            const note = noteInput.value.trim();

            if (!title) {
                alert("Bitte gib einen Titel ein!");
                return;
            }

            if (!dueDate) {
                alert("Bitte wähle ein Datum!");
                return;
            }

            const newTask = {
                id: this.nextId++,
                title: title,
                description: description || "Keine Beschreibung",
                dueDate: new Date(dueDate),
                priority: priority,
                note: note || ""
            };

            this.tasks.push(newTask);
            this.saveToStorage();
            this.updateCards();

            document.body.removeChild(overlay);
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });

        document.body.append(overlay);
        setTimeout(() => titleInput.focus(), 100);
    }

    updateCards() {
        this.containerCards.innerHTML = '';

        
        let filteredTasks = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (this.currentView) {
            case "today":
                filteredTasks = this.tasks.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate.getTime() === today.getTime();
                });
                this.renderCards(filteredTasks, "Today's Tasks");
                break;

            case "week":
              
                const weekStart = new Date(today);
                const dayOfWeek = today.getDay(); 
                const diffToMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
                weekStart.setDate(today.getDate() - diffToMonday);
                weekStart.setHours(0, 0, 0, 0);

                
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);

                filteredTasks = this.tasks.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate >= weekStart && taskDate <= weekEnd;
                });

               
                filteredTasks.sort((a, b) => {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });

                this.renderWeekCards(filteredTasks, weekStart, weekEnd);
                break;

            case "month":
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                monthEnd.setHours(23, 59, 59, 999);

                filteredTasks = this.tasks.filter(task => {
                    const taskDate = new Date(task.dueDate);
                    taskDate.setHours(0, 0, 0, 0);
                    return taskDate >= monthStart && taskDate <= monthEnd;
                });

                
                filteredTasks.sort((a, b) => {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });

                this.renderCards(filteredTasks, `Month: ${today.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}`);
                break;

            default:
                filteredTasks = this.tasks;
                this.renderCards(filteredTasks, "All Tasks");
        }
    }

    renderCards(tasks, title) {
        if (tasks.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "empty-message";
            emptyMessage.innerHTML = `
                <h3>No Tasks</h3>
                <p>No tasks for "${title}"</p>
                <p style="font-size: 0.9rem; margin-top: 10px; color: #a0aec0;">
                    Click "Add Task" to create a new one.
                </p>
            `;
            this.containerCards.append(emptyMessage);
            return;
        }

        const categoryTitle = document.createElement("div");
        categoryTitle.className = "category-title";
        categoryTitle.innerHTML = `<h2>${title}</h2><span>${tasks.length} Task(s)</span>`;
        this.containerCards.append(categoryTitle);

        tasks.forEach(task => {
            this.createCardElement(task);
        });
    }

    renderWeekCards(tasks, weekStart, weekEnd) {
        if (tasks.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "empty-message";
            emptyMessage.innerHTML = `
                <h3>No Tasks</h3>
                <p>No tasks for this week</p>
                <p style="font-size: 0.9rem; margin-top: 10px; color: #a0aec0;">
                    Click "Add Task" to create a new one.
                </p>
            `;
            this.containerCards.append(emptyMessage);
            return;
        }

        
        const weekTitle = document.createElement("div");
        weekTitle.className = "category-title";
        const weekDateStr = `${weekStart.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} - ${weekEnd.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
        weekTitle.innerHTML = `<h2>Week ${weekDateStr}</h2><span>${tasks.length} Task(s)</span>`;
        this.containerCards.append(weekTitle);

        
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const tasksByDay = {};

        weekdays.forEach(day => {
            tasksByDay[day] = [];
        });

        tasks.forEach(task => {
            const taskDate = new Date(task.dueDate);
            const dayIndex = taskDate.getDay(); 
            const dayName = weekdays[(dayIndex === 0) ? 6 : dayIndex - 1];
            tasksByDay[dayName].push(task);
        });

        
        weekdays.forEach((day, index) => {
            const dayTasks = tasksByDay[day];
            
           
            const currentDate = new Date(weekStart);
            currentDate.setDate(weekStart.getDate() + index);
            
            const dayContainer = document.createElement("div");
            dayContainer.className = "day-group";
            
            const dayHeader = document.createElement("div");
            dayHeader.className = "day-header";
            
            
            const dateStr = currentDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
            const isToday = currentDate.toDateString() === new Date().toDateString();
            dayHeader.innerHTML = `
                <span class="day-name">${day} ${isToday ? '⭐' : ''}</span>
                <span class="day-date">${dateStr}</span>
                <span class="day-count">${dayTasks.length} Task(s)</span>
            `;
            
            dayContainer.append(dayHeader);
            
            if (dayTasks.length === 0) {
                const noTask = document.createElement("div");
                noTask.className = "no-task";
                noTask.textContent = "No tasks for this day";
                dayContainer.append(noTask);
            } else {
                dayTasks.forEach(task => {
                    this.createCardElement(task, dayContainer);
                });
            }
            
            this.containerCards.append(dayContainer);
        });
    }

    createCardElement(task, container = this.containerCards) {
        const card = document.createElement("div");
        card.className = "card";

        const priorityColors = {
            "Low": "#48bb78",
            "Medium": "#ed8936",
            "High": "#fc8181"
        };
        card.style.borderColor = priorityColors[task.priority] || "#8a9a5a";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "card-delete";
        deleteBtn.textContent = "×";
        deleteBtn.title = "Aufgabe löschen";
        deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`Aufgabe "${task.title}" löschen?`)) {
            this.deleteTask(task.id);
    }
});

        const cardTitle = document.createElement("div");
        cardTitle.className = "card-title";
        cardTitle.textContent = task.title;

        const cardDescription = document.createElement("div");
        cardDescription.className = "card-description";
        cardDescription.textContent = task.description;

        const cardDate = document.createElement("div");
        cardDate.className = "card-date";
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        cardDate.textContent = `Due: ${task.dueDate.toLocaleDateString('de-DE', dateOptions)}`;

        const cardPriority = document.createElement("div");
        cardPriority.className = "card-priority";
        const priorityEmojis = {
            "Low": "🟢",
            "Medium": "🟡",
            "High": "🔴"
        };
        cardPriority.textContent = `Priority: ${priorityEmojis[task.priority] || ''} ${task.priority}`;

        const cardElements = [deleteBtn,cardTitle, cardDescription, cardDate, cardPriority];

        if (task.note) {
            const cardNote = document.createElement("div");
            cardNote.className = "card-note";
            cardNote.textContent = `${task.note}`;
            cardElements.push(cardNote);
        }

        card.append(...cardElements);
        container.append(card);
    }

    render() {
        this.containerPage = document.createElement("div");
        this.containerPage.className = "pageContent";

        document.body.append(this.header, this.navigator, this.main, this.containerPage);
    }
}

const page = new Page();
page.createPage();
page.render();