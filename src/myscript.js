import "./style.css";


class Page {


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
    this.navItemToday.textContent = "Heute";
    
    
    this.navItemWeek = document.createElement("li");
    this.navItemWeek.className = "navItem";
    this.navItemWeek.textContent = "Woche";
    
    this.navItemMonth = document.createElement("li");
    this.navItemMonth.className = "navItem";
    this.navItemMonth.textContent = "Monat";
    this.navList.append(this.navItemToday, this.navItemWeek, this.navItemMonth);
    
    
    this.containerNav.append(this.navList);

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
    this.containerCards.textContent = "Deine Cards erscheinen hier";
    // Füge hier deine Card-Elemente hinzu
    return this.containerCards;
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



