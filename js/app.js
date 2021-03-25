/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
function addEvents() {
/*This function has the objective of wrapping the code and linking it to the DOMContentLoaded event
so that the code will only be executed after loading the DOM.
*/ 
    /**
     * Define Global Variables
     * 
    */
    //store the ul element
    const navigationBar = document.getElementById('navbar__list');
    //store all content sections
    const sections = document.querySelectorAll('section[data-nav]');


    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */
    function addClassActive(activeSection, sectionId) {
        //This function adds class 'Active' to currently active section and itscorresponding menu item 
        let activeMenuItem = document.querySelector(`[data-related-section='${sectionId}']`);
        activeMenuItem.classList.add('menu__link__active');
        activeMenuItem.classList.remove('menu__link');
        activeSection.classList.add('your-active-class');
    }

    function removeClassActive(inactiveSection, sectionId) {
        //This function removes class Active from any section and menu item that isn't active
        let inactiveMenuItem = document.querySelector(`[data-related-section='${sectionId}']`);
        inactiveMenuItem.classList.remove('menu__link__active');
        inactiveMenuItem.classList.add('menu__link');
        inactiveSection.classList.remove('your-active-class');
    }

    function backToTop() {
        //This function scrolls up the page until it reaches the beginning of the documentElement
        document.documentElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }


    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    // build the nav
    function buildNav() {
        /*This function will build li elements using Virtual DOM to avoid reflow while the iterations happen,
        Basically it loops over all content sections to create a corresponding li element and give 
        inner content to it (and some useful attributes). Then, the function appends all <li> elements 
        to the ul element and appends the fragment to the ul element on body od the document.
        */
        const fragment = document.createDocumentFragment();
        
        for(let section of sections){
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<a href="#${section.id}" class="menu__link" data-related-section="${section.id}">${section.dataset.nav}</a>`;
            
            fragment.appendChild(menuItem);
        };
        
        navigationBar.appendChild(fragment);        
    }


    // Add class 'active' to section when near top of viewport
    function activeSectionCheck() {
        /* This function checks which section is currently in viewport,
        and adds class 'Active' to it. It also removes the class 'Active' from any other 
        section that's not active.
        */
        for(section of sections) {
            const rect = section.getBoundingClientRect();
            /*Looping over all sections:
                if the value of the bottom property of the rect is less than or equal to the value resulting
                from the sum of 'the viewport height and the section's height'; And at the same time
                the value of this property is greater than the viewport height (which means that the
                section's bottom has not entered the viewport yet), so it is assumed that the given
                section is the currently active section.
            */  
            if(rect.bottom <= (window.innerHeight + rect.height) && rect.bottom > window.innerHeight) {
                let sectionId = section.id;
                addClassActive(section, sectionId);
            }else{
                let inactiveSectionId = section.id;
                removeClassActive(section, inactiveSectionId);
            };
        };
    }


    // Scroll to anchor ID using scrollTO event
    function scrollTo(e) {
        /* First this function checks whether the e.target is an anchor or not. If it's an anchor, 
        then the function prevents the anchor's default behavior of jump and sets it to a smooth scroll
        */
        const anchor = e.target;
        let sectionId = anchor.getAttribute('href');
        let selectedSection = document.querySelector(`${sectionId}`);
        if(anchor.nodeName != 'A') return;
        e.preventDefault();
        selectedSection.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    function createButtonToTop() {
        //This function creates a new button with some content inside, and appends it to the body. 
        newButton = document.createElement('button');
        newButton.setAttribute('type', 'button');
        newButton.classList.add('back__to__top__btn');
        newButton.innerHTML = 'Back\nto\ntop';
        document.body.appendChild(newButton);
        newButton.addEventListener('click', backToTop);
    }

    function enableButtonToTop() {
        /*This function makes the 'back to top' button visible when the page entered in the 
        scrollable area and then makes it invisible when it's not in the scrollable area
        */
        let scrolled = window.pageYOffset;

        if(scrolled < 25) {
            newButton.classList.add('button__display__none');
        }else{
            newButton.classList.remove('button__display__none');
        };
    }
    /**
     * End Main Functions
     * Begin Events
     * 
    */


    // Build menu 
    buildNav();
    // Scroll to section on link click
    navigationBar.addEventListener('click', scrollTo);
    // Set sections as active
    document.addEventListener('scroll', activeSectionCheck);

    //extra functionalities:
    // Create a 'back to top' button
    createButtonToTop();
    //set button 'back to top' visibility
    document.addEventListener('scroll', enableButtonToTop);
}

document.addEventListener('DOMContentLoaded', addEvents);