class Unit {
    constructor(unit, currLesson = 0) {
        this.name = unit.name
        this.lessons = unit.lessons
        this.currLessonNum = currLesson
        this.currLesson = this.lessons[this.currLessonNum]
        this.lessonListMaker = this.lessonListMaker.bind(this)
        this.hintMaker = this.hintMaker.bind(this)
    }
    lessonListMaker = () => {
        const unit = this
        const detail = document.createElement('details')
        const summary = document.createElement('summary')
        const lessonList = document.createElement('ul')

        lessonList.id = 'lesson-list'
        summary.innerText = unit.name
        detail.appendChild(summary)
        detail.open = true

        unit.lessons.forEach(lesson => {
            let lessonLi = document.createElement('li')
            let lessonLink = document.createElement('a')
            lessonLink.href = '#'
            lessonLink.id = lesson.id
            lessonLink.target = '_self'
            lessonLink.innerText = lesson.name
            lessonLi.appendChild(lessonLink)
            lessonList.appendChild(lessonLi)
        })
        detail.appendChild(lessonList)
        return detail
    }
    hintMaker(lesson = this.currLesson) {
        const hintDiv = document.createElement('div')
        const title = document.createElement('h4')
        const text = document.createElement('p')
        const additional = document.createElement('details')
        const additionalSummary = document.createElement('summary')
        const additionalText = document.createElement('p')
        const resources = document.createElement('details')
        const resourcesSummary = document.createElement('summary')
        const resourcesText = document.createElement('p')

        title.innerText = lesson.hints.title

        text.innerHTML = lesson.hints.text

        additionalSummary.innerText = 'Additional Info'
        additionalText.innerHTML = lesson.hints.additional[0]
        additional.appendChild(additionalSummary)
        additional.appendChild(additionalText)

        resourcesSummary.innerText = 'Additional Resources'
        resourcesText.innerHTML = lesson.hints.resources[0]
        resources.appendChild(resourcesSummary)
        resources.appendChild(resourcesText)

        hintDiv.appendChild(title)
        hintDiv.appendChild(text)
        hintDiv.appendChild(additional)
        hintDiv.appendChild(resources)

        return hintDiv
    }
}

export default Unit