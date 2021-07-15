import Phaser from "phaser";

import Game from "./scenes/Game"
import Preloader from "./scenes/Preloader"

const config =  {
  type: Phaser.AUTO,
  width: 400,
  height : 400,
  physics: {
      default: 'arcade',
      arcade : {
          gravity : {y : 0}
      }
  },
  scene : [Preloader],
  scale : {
      zoom: 2,
      debug : true
  },
  pixelArt: true //Test later 
}

export default new Phaser.Game(config)