function showMessage (message : string)  {   

    const yesNo = window.document.querySelector('.yesNo') as HTMLDivElement
    const defaultZone = window.document.querySelector('.default') as HTMLDivElement
    const inputText = window.document.querySelector('.inputText') as HTMLDivElement

    yesNo.style.display = 'none'
    defaultZone.style.display = 'none'
    inputText.style.display = 'none'
    
    const title = window.document.querySelector("#titleZone") as HTMLElement
    title.innerText = message
    return;

}

export default showMessage