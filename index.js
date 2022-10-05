const titlePlaceHolder = document.getElementById('note-title');
const formBtn = document.getElementById('form-buttons');
const submitNoteBtn = document.getElementById('submit-button')
const takeNotePlaceHolder = document.getElementById('note-text')
const noteDiv = document.getElementById('notes')
const closeBtn = document.getElementById('form-close-button')
let modalTitle = document.getElementById('title')
let modalBody = document.getElementById('text')

let titleModalValue ="" 
let bodyModalValue ="" 
/*get value from modal input */
modalTitle.addEventListener("keyup",()=>{
  titleModalValue = modalTitle.value
})
modalBody.addEventListener('keyup',()=>{
  bodyModalValue = modalBody.value
})


function ShowForm() {
  titlePlaceHolder.classList.remove("hide")
  titlePlaceHolder.classList.add("show")
  formBtn.classList.remove('hide')
  formBtn.classList.add('show')
}

function clearForm() {
  titlePlaceHolder.value = ""
  takeNotePlaceHolder.value = ""
}

// let titre = ""
// let content = ""
// let newObject = window.localStorage.getItem("myObject");
// console.log(JSON.parse(newObject));

const newObject1 = window.localStorage.getItem("myObject");
const localStrValue = JSON.parse(newObject1)

// window.localStorage.clear()

let testArray = []

/* fill array with LocalStorage value to show After */
if (!localStrValue) {
  console.log('empty');
  testArray = []
}
else {
  testArray = localStrValue
}

/*Fill Object  */
function fillObject() {
  const note = {
    titre: titlePlaceHolder.value,
    content: takeNotePlaceHolder.value
  }
  return note
}



// Push Color to 
function testValue(x, valu,Parent) {
  testArray[x] = { ...testArray[x], color: valu }
  // console.log(testArray[x]);
  // console.log('testArray',testArray);
  // console.log('localStrValue',localStrValue);
  const parentInput = Parent.parentElement.parentElement.parentElement;
  parentInput.style.backgroundColor = valu
  window.localStorage.setItem("myObject", JSON.stringify(testArray));
  console.log(testArray);
  // console.log('localStrValue',localStrValue);
  // const noteClassDiv = document.getElementsByClassName('note') 
  


  // console.log('get color',testArray[x].color);
}

let updateGetIndice = []
//Show Modal
function showModal(x) {
  /*get array value for updating */
  updateGetIndice = [x]
  // testArray[x] = { ...testArray[x], color: '' }
  modalTitle.placeholder = testArray[x].title
  modalBody.placeholder = testArray[x].body
  
  titleModalValue = testArray[x].title
  bodyModalValue = testArray[x].body

  document.getElementById('modal').classList.remove('hide')
  document.getElementById('modal').classList.add('show')
  // testArray[x].title = modalTitle.value
  
  console.log(testArray);
  // console.log('updateGetIndice',updateGetIndice);
}

// Close Modal
document.getElementById('close-modal-btn').addEventListener("click", () => {
  document.getElementById('modal').classList.remove('show')
  document.getElementById('modal').classList.add('hide') 
  if (titleModalValue === "" || bodyModalValue==="") {
    console.log('rrt');
  }
  else{
    testArray[updateGetIndice].title = titleModalValue;
    testArray[updateGetIndice].body = bodyModalValue;
    window.localStorage.setItem("myObject", JSON.stringify(testArray));
    showMemoLocalStorage()  
  }

  console.log('test',testArray[updateGetIndice] );

  console.log('ya rbi salama',testArray);
})



function gt(x) {
  testArray[x]
  modalTitle.placeholder = testArray[x].title
  modalBody.placeholder = testArray[x].body
  console.log('testArray[x]', testArray[x]);
  // console.log('index',testArray.indexOf(testArray[x]));
  console.log('testArray', testArray);
  /*To modify */
  let index = testArray.indexOf(testArray[x]);
  if (index !== -1) {
    // window.localStorage.clear()
    testArray.splice(index, 1);
  }
  testArray[x].title = modalTitle.value
  testArray[x].body = modalBody.value
  testArray[x].color = testArray[x].color

  console.log('test beging', testArray);
  /*To modify */

}


function deleteNote(x) {
  /*Remove */
  let index = testArray.indexOf(testArray[x]);
  if (index !== -1) {
    window.localStorage.clear()
    testArray.splice(index, 1);
    window.localStorage.setItem("myObject", JSON.stringify(testArray));
    showMemoLocalStorage()
  }
  /*Remove */
}


/*Show Note from local storage */
function showMemoLocalStorage() {
  const newObject1 = window.localStorage.getItem("myObject");
  // let localStrValue = []
  const localStrValue = JSON.parse(newObject1)
  // console.log(localStrValue.indexOf(localStrValue[1]));
  let NoteHtml = ""
  // console.log(localStrValue);
  if (!localStrValue) {
    console.log('localStorage is empty');
  }
  else {
    localStrValue.map((value) => {
      // console.log(value);
      let indice = localStrValue.indexOf(value)
      // console.log(indice);
      // onclick="gt(${indice})"

      /* ---------------------- */
      NoteHtml += ` 
    <div style="background-color:${value.color}"  class="note">
      <div onclick="showModal(${indice})" class="note-title">${value.title}</div>
      <div  onclick="showModal(${indice})" class="note-text" >${value.body}</div>
        <div class="toolbar-container">
          <div class="toolbar">
              <button id="btn1" onclick="testValue(${indice},this.value,this)" class="btn-color" style="background-color:#d1d1d1;" value="#d1d1d1""></button>
              <button id="btn2" onclick="testValue(${indice},this.value,this)" class=" btn-color" style="background-color:#c2dfff;" value="#c2dfff"></button>
              <button id="btn3" onclick="testValue(${indice},this.value,this)" class="btn-color" style="background-color:#fff9b8;" value="#fff9b8"></button>
              <button id="btn4" onclick="testValue(${indice},this.value,this)" class="btn-color" style="background-color:#ffffff;" value="#ffffff"></button>
              <button  onclick="deleteNote(${indice})" class="delete-note"  >Delete</button>
          </div>
        </div>
    </div>
    
       `
      // onclick="gt(${indice})
      // document.getElementById('close-modal-btn').addEventListener("click",()=>{
      //   gt(indice)
      // })
    })

    noteDiv.innerHTML = NoteHtml
  }
}

// console.log(NoteBar);

/*show memo from locStrg in the begining */
showMemoLocalStorage()

/*check if placeholder clicked  */
takeNotePlaceHolder.addEventListener('click', ShowForm)

/* fill Object while Typing */
titlePlaceHolder.addEventListener('keyup', () => {
  fillObject()
})


/* fill Object while Typing */
takeNotePlaceHolder.addEventListener('keyup', () => {
  fillObject()
  // console.log(infObject);
})


submitNoteBtn.addEventListener('click', (e) => {

  e.preventDefault()
  const ObjectContent = fillObject()
  /*push to array new Object */
  testArray.push({ title: ObjectContent.titre, body: ObjectContent.content, color: '' })

  if (ObjectContent.titre === '' && ObjectContent.content === '') {
    console.log('3amer');
  }
  else {
    window.localStorage.setItem("myObject", JSON.stringify(testArray));
  }
  // window.localStorage.clear()

  /*Update Note Divs Html */
  showMemoLocalStorage()

  /*Clear Inputs */
  clearForm()

})

/*Close Button */
closeBtn.addEventListener('click', clearForm)


/*Change Input Color Background */
function changeColor() {
  const btnColor = document.getElementsByClassName('btn-color')
  let colorValue = ""
  for (const Color of btnColor) {
    Color.addEventListener('click', () => {
      colorValue = (Color.value);
      const parentInput = Color.parentElement.parentElement.parentElement;
      // console.log(parentInput)
      parentInput.style.backgroundColor = colorValue
    })
    // console.log(Color);
  }  
}
// const noteClassDiv = document.getElementsByClassName('note')


/*check if clicked Outside the placeholder  */
window.addEventListener('mouseup', (e) => {
  if (e.target != titlePlaceHolder && e.target.parentNode != titlePlaceHolder) {

    titlePlaceHolder.classList.remove("show")
    titlePlaceHolder.classList.add("hide")
    formBtn.classList.remove('show')
    formBtn.classList.add('hide')
    // formBtn.style.display = 'none'
  }
})

