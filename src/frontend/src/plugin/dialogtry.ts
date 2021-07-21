import Phaser from "phaser"

export default class DialogTry {


    private gameObject : Phaser.GameObjects.GameObject

    private readonly borderThickness : number
    private readonly borderColor : number
    private readonly borderAlpha : number
    private readonly windowAlpha: number
    private readonly windowColor: number
    private readonly windowHeight : number
    private readonly padding : number
    private readonly dialogSpeed : number
    
    // Used for animating the text

    private eventCounter : number
    private visible : boolean
    private text! : Phaser.GameObjects.Text
    private dialog! : string[]
    private closeBtn : any   
    graphic! : Phaser.GameObjects.Graphics
    private timedEvent! : Phaser.Time.TimerEvent

    constructor (go : Phaser.GameObjects.GameObject) {
        this.gameObject = go 
        

        this.borderThickness = 3;
        this.borderColor = 0x907748;
        this.borderAlpha = 1;
        this.windowAlpha =  0.8;
        this.windowColor =  0x303030;
        this.windowHeight =  150;
        this.padding =  32;
        this.dialogSpeed =  3;

        this.eventCounter = 0

        this.visible = true
    }

    _getGameWidth = () => {
        const {scene} = this.gameObject
        return (scene.sys.game.config.width)
    }

    _getGameHeight = () => {
        const {scene} = this.gameObject
        return (scene.sys.game.config.height)
    }

    _calculateWindowDimension = (height: number, width : number) => {
        var x = this.padding
        var y = height - this.windowHeight - this.padding

        var rectWidth = width - (this.padding * 2)
        var rectHeight = this.windowHeight
        return {x,y,rectWidth,rectHeight}
    }

    _createInnerWindows = (x : number,y : number,rectWidth : number,rectHeight : number) => {
       

        this.graphic.fillStyle(this.windowColor, this.windowAlpha)
        this.graphic.fillRect( x + 1 , y + 1, rectWidth - 1 , rectHeight -1 )
    }
    
    _createOuterWindows = ( x : number , y : number , rectWidth : number , rectHeight : number) => {
        this.graphic.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha)
        this.graphic.strokeRect( x , y , rectWidth  , rectHeight  )
    }

    _createWindow = () => {
        var gameHeight  = this._getGameHeight() as number
        var gameWidth = this._getGameWidth() as number

        var dimensions = this._calculateWindowDimension(gameWidth , gameHeight)

        const {scene} = this.gameObject
        this.graphic = scene.add.graphics();


        this._createOuterWindows(dimensions.x,dimensions.y, dimensions.rectWidth, dimensions.rectHeight )
        this._createInnerWindows(dimensions.x,dimensions.y, dimensions.rectWidth, dimensions.rectHeight )
        this._createCloseModalButtonBorder()
        this._createCloseModalButton()
    }

    _toggleWindow = () => {
        this.visible = !this.visible
        console.log("ok")

        if (this.text) this.text.visible = this.visible;
        if (this.graphic) this.graphic.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
    }
    _createCloseModalButtonBorder = () => {
        var x = this._getGameWidth() as number - this.padding - 20 
        var y = this._getGameHeight() as number - this.windowHeight - this.padding;
        this.graphic.strokeRect(x,y,20,20)
    }

    _createCloseModalButton = () => {
        var self = this
        const {scene} = this.gameObject
        this.closeBtn = scene.make.text({
            x : this._getGameWidth() as number - this.padding - 14,
            y : this._getGameHeight() as number - this.windowHeight - this.padding + 3,
            text : 'X', 
            style : {
                font : 'bold 12px Arial'
            }
        })
        this.closeBtn.setInteractive();

        this.closeBtn.on('pointerover', () => {
            this.closeBtn.setTint(0xff0000)
        })

        this.closeBtn.on('pointerout', () => {
            this.closeBtn.clearTint()
        })

        this.closeBtn.on('pointerdown', () => {
            if (this.timedEvent) this.timedEvent.remove()
            if (this.text) this.text.destroy()
            self._toggleWindow()
        })
    }


    _setText = (text : string) => {
        if(this.text) this.text.destroy();

        var x = this.padding +10
        var y = this._getGameHeight() as number - this.windowHeight - this.padding + 10 

        const {scene} = this.gameObject
        this.text = scene.make.text({
            x,
            y,
            text,
            style : {
                wordWrap : {width : this._getGameWidth() as number - (this.padding * 2) - 25}
            }
        })
    }



    createWindow = () => {
        this._createWindow();
    }

    setText = (text:string, animate: boolean) => {
        // Reset the dialog
        const {scene} = this.gameObject

        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove()
        var tempText = animate ? '' : text;


        this._setText(tempText);

        if (animate) {
            this.timedEvent = scene.time.addEvent({
            
            delay: 150 - (this.dialogSpeed * 30),
            callback: this._animateText,
            callbackScope: this,
            loop: true
            });
        }
    
    }

    _animateText = () => {
        this.eventCounter ++ 
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1])
        if (this.eventCounter === this.dialog.length) {
            this.timedEvent.remove()
        }
    }
}