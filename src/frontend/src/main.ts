import Phaser from "phaser";

//Scenes
import City from "./scenes/City"
import Preloader from "./scenes/Preloader";
import School from "./scenes/School";

//Plugin

import {Plugin as NineSlicePlugin} from 'phaser3-nineslice'

const config =  {
  type: Phaser.AUTO,
  width: 400,
  height : 400,
  parent : 'game', //ID of the HTML container
  dom : {
      createContainer : true
  },
  physics: {
      default: 'arcade',
      arcade : {
          gravity : {y : 0},
          debug : false
      }
  },
  plugins : {
      global : [NineSlicePlugin.DefaultCfg],
  },
  scene : [Preloader,School,City],
  scale : {
      zoom: 2,
      
  },
  pixelArt: true,

 
}

// Grab DOM elements

const btnGame = document.querySelector('.btnGame') as HTMLButtonElement
const btnQuests = document.querySelector('.btnQuests') as HTMLButtonElement
const btnAbout = document.querySelector('.btnAbout') as HTMLButtonElement
const btnCredits = document.querySelector('.btnCredits') as HTMLButtonElement

const zoneGame = document.querySelector('.zoneGame') as HTMLDivElement
const zoneQuests= document.querySelector('.zoneQuests') as HTMLDivElement
const zoneAbout = document.querySelector('.zoneAbout') as HTMLDivElement
const zoneCredits = document.querySelector('.zoneCredits') as HTMLDivElement
 

btnGame.addEventListener('click', (_e) => {
    zoneAbout.style.display = 'none'
    zoneQuests.style.display = 'none'
    zoneCredits.style.display = 'none'
    zoneGame.style.display = 'block'
})
btnQuests.addEventListener('click', (_e) => {
    zoneAbout.style.display = 'none'
    zoneGame.style.display = 'none'
    zoneCredits.style.display = 'none'
    zoneQuests.style.display = 'block'
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
    zoneCredits.style.display = 'none'
    zoneCredits.style.display = 'block'
})

export default new Phaser.Game(config)