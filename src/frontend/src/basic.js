// Grab DOM elements

const btnGame = document.querySelector('.btnGame')
const btnQuests = document.querySelector('.btnQuests')
const btnAbout = document.querySelector('.btnAbout')
const btnCredits = document.querySelector('.btnCredits')

const zoneGame = document.querySelector('.zoneGame')
const zoneQuests= document.querySelector('.zoneQuests')
const zoneAbout = document.querySelector('.zoneAbout')
const zoneCredits = document.querySelector('.zoneCredits')


btnGame.addEventListener('click', (e) => {
    console.log("f")
    zoneAbout.style.display = 'none'
    zoneQuests.style.display = 'flex-col'
    zoneCredits.style.display = 'none'
    zoneGame.style.display = 'block'
})
btnQuests.addEventListener('click', (e) => {
    zoneAbout.style.display = 'none'
    zoneGame.style.display = 'flex-col'
    zoneCredits.style.display = 'none'
    zoneQuests.style.display = 'block'
})
btnAbout.addEventListener('click', (e) => {
    zoneGame.style.display = 'none'
    zoneQuests.style.display = 'flex-col'
    zoneCredits.style.display = 'none'
    zoneAbout.style.display = 'block'
})
btnCredits.addEventListener('click', (e) => {
    zoneAbout.style.display = 'none'
    zoneQuests.style.display = 'flex-col'
    zoneCredits.style.display = 'none'
    zoneCredits.style.display = 'block'
})