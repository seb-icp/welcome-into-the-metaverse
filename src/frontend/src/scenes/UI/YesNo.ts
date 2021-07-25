const showYesNo = function () {
    const yesNo = window.document.querySelector('.yesNo') as HTMLDivElement
    const defaultZone = window.document.querySelector('.default') as HTMLDivElement
    const inputText = document.querySelector('.inputText') as HTMLDivElement


    //Test if the buttons are still listening to events before display none
    
    inputText.style.display = "none"
    defaultZone.style.display = "none"
    yesNo.style.display = "flex"
    
    return;
}

export {showYesNo}