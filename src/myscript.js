import "./style.css";
import PlusIcon from "../img/Plus.svg";


class Page {


 constructor() {
        this.tasks = [];      
        this.nextId = 1;      
    }

createPage(){

this.header = this.createHeader();
this.navigator = this.createNavigator();
this.main = this.createMain();


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
    
    
    this.navItemWeek = document.createElement("li");
    this.navItemWeek.className = "navItem";
    this.navItemWeek.textContent = "Week";
    
    this.navItemMonth = document.createElement("li");
    this.navItemMonth.className = "navItem";
    this.navItemMonth.textContent = "Month";
    this.navList.append(this.navItemToday, this.navItemWeek, this.navItemMonth);
    
    
    this.containerNav.append(this.navList);

    this.addButton = document.createElement("button");
        this.addButton.className = "addButton";

        // Plus-Symbol als Bild
        const plusImg = document.createElement("img");
        plusImg.src = PlusIcon;
        plusImg.alt = "Add Task";
        plusImg.className = "plusIcon";
        this.addButton.append(plusImg);

        // Add Task Text
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

  createMain() {
    this.containerMain = document.createElement("main");
    this.containerMain.className = "containerMain";
    this.cards = this.createCards();
    this.containerMain.append(this.cards);
    // Füge hier deine Hauptinhalte hinzu
    return this.containerMain;
  }

  createCards() {
    this.containerCards = document.createElement("div");
    this.containerCards.className = "containerCards";
    this.containerCards.textContent = "Your cards will appear here";
    // Füge hier deine Card-Elemente hinzu
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

        // Beschreibung Eingabe
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

        // Buttons
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

        // Event-Listener für Formular-Submit
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

            // Erstelle neue Aufgabe
            const newTask = {
                id: this.nextId++,
                title: title,
                description: description || "Keine Beschreibung",
                dueDate: new Date(dueDate),
                priority: priority,
                note: note || ""
            };

            this.tasks.push(newTask);
            this.updateCards();

            // Schließe Dialog
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
        // Leere die Cards
        this.containerCards.innerHTML = '';

        if (this.tasks.length === 0) {
            this.containerCards.textContent = "Your cards will appear here";
            return;
        }

        
        this.tasks.forEach(task => {
            const card = document.createElement("div");
            card.className = "card";

            // Prioritäts-Farbe
            const priorityColors = {
                "Niedrig": "#48bb78",
                "Mittel": "#ed8936",
                "Hoch": "#f30707"
            };
            card.style.borderColor = priorityColors[task.priority] || "#8a9a5a";

            
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
            cardPriority.textContent = `Priority:${priorityEmojis[task.priority] || ''} ${task.priority}`;

            
            const cardElements = [cardTitle, cardDescription, cardDate, cardPriority];
            
            if (task.note) {
                const cardNote = document.createElement("div");
                cardNote.className = "card-note";
                cardNote.textContent = `📝 ${task.note}`;
                cardElements.push(cardNote);
            }

            card.append(...cardElements);
            this.containerCards.append(card);
        });
    }


render(){
    this.containerPage=document.createElement("div");
    this.containerPage.className= "pageContent";

  
    
    
    document.body.append(this.header, this.navigator, this.main, this.containerPage);

}

}
const page = new Page();
page.createPage();
page.render();



