const showDefault = () =>  {

    const yesNo = window.document.querySelector('.yesNo') as HTMLDivElement
    const defaultZone = window.document.querySelector('.default') as HTMLDivElement
    const inputText = document.querySelector('.inputText') as HTMLDivElement
    
    inputText.style.display = 'none'
    yesNo.style.display = 'none'
    defaultZone.style.display = 'block'


}

export {showDefault}