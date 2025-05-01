
// Handles the scroll into various
// sections of the pages 

const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({
        behavior: 'smooth'
    })
}

export default scrollToSection