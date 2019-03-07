import {
  unit1
} from './units.js'
import View from './View/View.js'
import Curriculum from './Curriculum/Curriculum.js'

const view = new View()

function reset() {
  unit1.resetLesson()
}

const curriculum = new Curriculum([unit1])

view.checkForColors()
view.setCurriculum(curriculum.curriculumListMaker())
view.setHints(curriculum.currLesson)



let save = document.getElementById('save')
let resetLesson = document.getElementById('reset')
let load = document.getElementById('load')
let hintToggle = document.getElementById('hint-toggle')
let lessonToggle = document.getElementById('lesson-toggle')
let darkMode = document.getElementById('change-colors')

hintToggle.addEventListener('click', view.toggleDiv)
lessonToggle.addEventListener('click', view.toggleDiv)
save.addEventListener('click', view.promptForSave)
load.addEventListener('click', view.promptForUpdate)
resetLesson.addEventListener('click', reset)
darkMode.addEventListener('click', view.changeColors)