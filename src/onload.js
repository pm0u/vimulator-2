document.addEventListener('DOMContentLoaded', (event) => {

  checkForColors()

  let vimText = document.getElementById('vim-text')

  let lesson1 = document.getElementById('u1l1')
  let lesson2 = document.getElementById('u1l2')
  let lesson3 = document.getElementById('u1l3')
  let lesson4 = document.getElementById('u1l4')

  let save = document.getElementById('save')
  let resetLesson = document.getElementById('reset')
  let load = document.getElementById('load')
  let hintToggle = document.getElementById('hint-toggle')
  let lessonToggle = document.getElementById('lesson-toggle')
  let darkMode = document.getElementById('change-colors')

  hintToggle.addEventListener('click', toggleDiv)
  lessonToggle.addEventListener('click', toggleDiv)
  lesson1.addEventListener('click', doLesson1)
  lesson2.addEventListener('click', doLesson2)
  lesson3.addEventListener('click', doLesson3)
  lesson4.addEventListener('click', doLesson4)
  save.addEventListener('click', saveEntry)
  load.addEventListener('click', loadEntry)
  resetLesson.addEventListener('click', reset)
  darkMode.addEventListener('click', changeColors)

  unit1.initLesson()

})

function doLesson2(event) {
  unit1.changeLesson(1)
  event.target.blur()

}

function doLesson1(event) {
  unit1.changeLesson(0)
  event.target.blur()
}

function doLesson3(event) {
  unit1.changeLesson(2)
  event.target.blur()
}

function doLesson4(event) {
  unit1.changeLesson(3)
  event.target.blur()
}

function saveEntry() {
  unit1.promptForSave()
}

function loadEntry() {
  unit1.promptForUpdate()
}

function reset() {
  unit1.resetLesson()
}

function toggleDiv(event) {
  event.target.blur()
  let divClicked = event.target
  let divClickedId = event.target.id
  let lessonDiv = document.getElementById('lessons')
  let hintDiv = document.getElementById('hints')
  let body = document.querySelector('body')
  let noneShowing = '"header header header" "vim vim vim" "footer footer footer"'
  let lessonsShowing = '"header header header" "lessons vim vim" "footer footer footer"'
  let hintsShowing = '"header header header" "vim vim hints" "footer footer footer"'
  let allShowing = '"header header header" "lessons vim hints" "footer footer footer"'
  if (divClickedId === 'lesson-toggle') {
    if (lessonDiv.style.visibility === 'visible' || lessonDiv.style.visibility === '') {
      lessonDiv.style.visibility = 'hidden'
      if (hintDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = noneShowing
      } else {
        body.style.gridTemplateAreas = hintsShowing
      }
    } else {
      lessonDiv.style.visibility = 'visible'
      if (hintDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = lessonsShowing
      } else {
        body.style.gridTemplateAreas = allShowing
      }
    }
  } else {
    if (hintDiv.style.visibility === 'visible' || hintDiv.style.visibility === '') {
      hintDiv.style.visibility = 'hidden'
      if (lessonDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = noneShowing
      } else {
        body.style.gridTemplateAreas = lessonsShowing
      }
    } else {
      hintDiv.style.visibility = 'visible'
      if (lessonDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = hintsShowing
      } else {
        body.style.gridTemplateAreas = allShowing
      }
    }
  }
}

  function changeColors(colors) {
    let colorsStylesheet = document.getElementById('colors-stylesheet')
    let darkMode = document.getElementById('change-colors')
    let localStorage = window.localStorage
    if (colorsStylesheet.href.includes('sol-light.css')) {
      darkMode.innerText = 'light mode'
      colorsStylesheet.href = 'sol-dark.css'
      localStorage.setItem('$colors', 'dark')
    } else {
      darkMode.innerText = 'dark mode'
      colorsStylesheet.href = 'sol-light.css'
      localStorage.setItem('$colors', 'light')
    }
  }

function checkForColors() {
  let localStorage = window.localStorage

  if (localStorage['$colors'] === 'dark') {
    changeColors()
  }

}
