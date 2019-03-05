## Vimulator 2: Judgement Day
Vimulator was my Q1 project and I think it could be adapted to be a useful teaching tool that is supported by the community using it.

Vim is a console based text editor that uses advanced keyboard shortcuts to increase efficiency. Most people within software development will encounter Vim at some point, usually inadvertently, and be stuck not knowing how it works. Additionally, these shortcuts help promote good typing habits and are available across a wide range of applications and text editors to keep key functionality consistent across multiple applications. Vimulator will help to educate and train users in Vim's keyboard shortcuts and functionality, thereby removing the large wall that exists when being overwhelmed by the extreme possibilities.

This update to Vimulator would maintain the same structure and functionality as the original prototype. I would like to use minimal frameworks to keep the app usable and accessible on many different browsers, OSs, and aging computers. I think that developing Vimulator in this way can present a unique opportunity to explore object oriented programming. The structure I see now includes a Vim engine that will internally manage the state of the vim application, a self written "front end framework" that will update the HTML from user input, and an input manager that will handle what happens when a user presses a specific key. There may be a need for a state management system such as redux that would take over storing the state of the Vim engine and user interface among other things.

To include a back end, lessons could be stored on an external database and be accessed as needed. A stretch feature would be the ability to import lessons from something like a github repo so that community members could write tutorials and lessons side by side.

As an open source project, Vimulator can also serve as a teaching tool to help people break into contributing to open source software as well as an example of well written code to reference.

### Project Planning

I have chosen to go with creating a VIM tutor website. I will be utilizing Trello for project planning. The project can be viewed [here](https://trello.com/b/fip80Dmf/q1-proj-vimdicator).

### Style Guide

I would like the website to mimic the look of vim in the terminal as much as possible. This will help new users become comfortable with real vim more readily and is something other vim tutors lack. With this in mind, styling will be minimal. In vim, any lines or divisions are provided by text characters. The font used will be Fira Mono -- I chose this font because it is a free font that new users could implement in their own terminals and because in code editing it is important to use a monospace font. This font will contribute to the terminal feel/aesthetic. Colors will be minimal, as it is meant to look like a terminal. I would like to use the palette provided by [solarized light by Ethan Schoonover](https://ethanschoonover.com/solarized/). I have found this to be a very approachable color scheme that is easy to read and is well accepted among experienced coders. This will help introduce new users to customizing their own terminal experience.

![Wireframe of webpage](https://image.ibb.co/jRO8L0/vim-wireframe.png)

![style guide](https://vectr.com/tmp/b75ezVFRh/c49lkfH0h.png?width=640&height=640&select=c49lkfH0hpage0)


### MVP / proof of concept

The current proof of concept is live at http://vimulator.surge.sh/html/index.html

For my Q4 project, I will be completely refactoring and re-writing the original codebase to be more performant, testable, and include more functionality.
