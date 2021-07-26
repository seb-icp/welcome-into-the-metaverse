const btnGame = document.querySelector('.btnGame') as HTMLElement
const btnQuests = document.querySelector('.btnQuests') as HTMLElement
const btnAbout = document.querySelector('.btnAbout') as HTMLElement
const btnCredits = document.querySelector('.btnCredits') as HTMLElement

const zoneGame = document.querySelector('.zoneGame') as HTMLElement
const zoneQuests= document.querySelector('.zoneQuests') as HTMLElement
const zoneAbout = document.querySelector('.zoneAbout') as HTMLElement
const zoneCredits = document.querySelector('.zoneCredits') as HTMLElement
 

btnGame.addEventListener('click', (_e) => {

    zoneAbout.style.display = 'none'
    zoneQuests.style.display = 'none'
    zoneCredits.style.display = 'none'
    zoneGame.style.display = 'flex'

})
btnQuests.addEventListener('click', (_e) => {
    zoneAbout.style.display = 'none'
    zoneGame.style.display = 'none'
    zoneCredits.style.display = 'none'
    zoneQuests.style.display = 'flex'
})
btnAbout.addEventListener('click', (_e) => {
    zoneGame.style.display = 'none'
    zoneQuests.style.display = 'none'
    zoneCredits.style.display = 'none'
    zoneAbout.style.display = 'block'
})
btnCredits.addEventListener('click', (_e) => {
    zoneAbout.style.display = 'none'
    zoneQuests.style.display = 'none'
    zoneGame.style.display = 'none'
    zoneCredits.style.display = 'flex'
})