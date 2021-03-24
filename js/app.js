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
    //This function adds class 'Active' to currently active section
    activeMenuItem = document.querySelector(`[data-related-section='${sectionId}']`);
    activeMenuItem.classList.add('menu__link__active');
    activeMenuItem.classList.remove('menu__link');
    activeSection.classList.add('your-active-class');
    
};

function removeClassActive(inactiveSection, sectionId) {
    //This function removes class Active from any section that isn't active
    inactiveMenuItem = document.querySelector(`[data-related-section='${sectionId}']`);
    inactiveMenuItem.classList.remove('menu__link__active');
    inactiveMenuItem.classList.add('menu__link');
    inactiveSection.classList.remove('your-active-class');
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//create a function to build all <li> elements
function buildNav() {
    /*This function will build li elements using Virtual DOM to avoid reflow while the iterations happen,
    Basically it loops over all content sections to create a corresponding li element and give 
    inner content to it (and some useful attributes). Then, the function appends all <li> elements 
    to the ul element and appends the fragment to the ul element on body od the document.
    */
    const fragment = document.createDocumentFragment();
    
    for(let section of sections){
        menuItem = document.createElement('li');
        menuItem.innerHTML = `<a href="#${section.id}" class="menu__link" data-related-section="${section.id}">${section.dataset.nav}</a>`;
        
        fragment.appendChild(menuItem);
    };
    
    navigationBar.appendChild(fragment);
};

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
                section's bottom has not entered the in the viewport yet), so it is assumed that the given section
                is the currently active section.
            */  
            if(rect.bottom <= (window.innerHeight + rect.height) && rect.bottom > window.innerHeight) {
                let sectionId = section.id;
                addClassActive(section, sectionId);
            }else{
                let inactiveSectionId = section.id;
                removeClassActive(section, inactiveSectionId);
            };
        };
};


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
};

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