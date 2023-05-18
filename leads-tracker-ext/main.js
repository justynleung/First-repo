//Variables
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
//Get the leads from local storage and store the value
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//Set myLeads to leadsFromLocalStorage if the value is truthy
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}' >
          ${leads[i]}
        </a>
      </li>
    `
   // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</li></a>"
   // const li = document.createElement("li")
   // li.textContent = myLeads[i]
   // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})
//Delete button clear storage on double-click
deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
});

//Save button which save input value to local storage, the value has to be convert to string before storage
inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  
  console.log(localStorage.getItem("myLeads"))
});
