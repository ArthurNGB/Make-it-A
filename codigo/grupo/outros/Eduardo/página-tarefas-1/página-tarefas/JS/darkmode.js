const inputcontainer = document.querySelector("input");
const rootElement = document.documentElement;
console.log(rootElement)
const darkTheme = {
    '--background-color': '#343434',
    '--text-color': '#ffffff',
    '--card-color': '#242424',
    '--form-buttons': '#868686',
    '--button-hover': '#1f1e1e',
}
window.onload = getThemeFromLocalStorage



const lightTheme = {
    '--background-color':' #ffff',
    '--text-color':'#000',
    '--card-color': '#ccc',
    '--form-buttons': '#000',
    '--button-hover': '#1f1e1e',
}
inputcontainer.addEventListener('change', function() {
    const isChecked = inputcontainer.checked
    if (isChecked){
        changeTheme(lightTheme)
    } else {
        changeTheme(darkTheme)
    }
    isChecked ? changeTheme(lightTheme) : changeTheme(darkTheme)
})

function changeTheme(theme) {
    for (let prop in theme) {
        changeProperty(prop, theme[prop])
    }
    saveThemeToLocalStorage(theme)
}
function changeProperty(property, value){
    rootElement.style.setProperty(property, value)
}
function saveThemeToLocalStorage(theme){
    localStorage.setItem('theme', JSON.stringify(theme))

}

function getThemeFromLocalStorage(){
    const theme = JSON.parse(localStorage.getItem('theme'))
    if(isThemeEqual(theme, lightTheme)) inputcontainer.checked = true
    changeTheme(theme)
}
function isThemeEqual(firstTheme, secondTheme){
    for(let prop in firstTheme){
        if (firstTheme[prop] != secondTheme[prop]) return false
    }
    return true
}