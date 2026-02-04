let myLeads = []
const inputBtn = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const delBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target="_blank" href="${leads[i]}">${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

delBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", () => {
    const inputValue = inputEl.value.trim()
    if (inputValue.length > 0) {
        myLeads.push(inputValue)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})