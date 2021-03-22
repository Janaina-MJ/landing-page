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



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//create a function to build all <li> elements
function buildNav() {
    /*This function will build li elements using Virtual DOM to avoid reflow while the iterations happen
    loop over all content sections to create li elements and give them inner content
    append all <li> elements to the ul element
    append the fragment to the ul element
    */
    const fragment = document.createDocumentFragment();
    
    for(let section of sections){
        let navLink = document.createElement('li'); 
        navLink.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
        
        fragment.appendChild(navLink);
    }
    
    navigationBar.appendChild(fragment);
};

buildNav();


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


