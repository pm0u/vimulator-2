~~## 1. Minesweeper~~

~~This would be a webpage that is similar to/a clone of the classic minesweeper game. There are other HTML/CSS minesweeper clones around, most of them employ tables or images to accomplish the board. I would like to create a minesweeper clone written in pure CSS grid, without using tables or images (so that it is light). The logic would be handled in javascript and layout in CSS/CSS grid/HTML. An additional challenge could be a different style game, where minesweeper is merged with a tile sliding style game and you are able to move 3x3 squares of tiles around the board. These would respond to their new location and display numbers of bordering mines as they are moved. Local storage will be used to record name and high scores.~~

## 2. Vim tutor

This would be a vim shortcut tutor similar to CSS diner that would help to teach vim shortcuts/commands. It would offer text content (single or multi line) and ask the user to accomplish a task on the content. It could start with simple things (exiting vim!!) and move to more advanced uses such as registers, search and replace, etc. There are other vim tutors around, but I don't believe they offer enough repetition. Also, asking the user to save/quit their changes at the end of every level will help reinforce some of the most important shortcuts. It will be open source and if i make it simple to script lessons, long term it would be great if people contributed additional lessons to expand the game (through pull requests on github). Local storage will be employed to record username and completed levels so that the game can be picked back up when the page is revisited. An endurance mode would be great, that would throw random levels at the user to reinforce what has been learned. Logic in javascript, layout and content in CSS grid and HTML.

### Project Planning

I have chosen to go with creating a VIM tutor website. I will be utilizing Trello for project planning. The project can be viewed [here](https://trello.com/b/fip80Dmf/q1-proj-vimdicator).

### Style Guide

I would like the website to mimic the look of vim in the terminal as much as possible. This will help new users become comfortable with real vim more readily and is something other vim tutors lack. With this in mind, styling will be minimal. In vim, any lines or divisions are provided by text characters. The font used will be Fira Mono -- I chose this font because it is a free font that new users could implement in their own terminals and because in code editing it is important to use a monospace font. This font will contribute to the terminal feel/aesthetic. Colors will be minimal, as it is meant to look like a terminal. I would like to use the palette provided by [solarized light by Ethan Schoonover](https://ethanschoonover.com/solarized/). I have found this to be a very approachable color scheme that is easy to read and is well accepted among experienced coders. This will help introduce new users to customizing their own terminal experience.

![Wireframe of webpage](https://image.ibb.co/jRO8L0/vim-wireframe.png)

![style guide](https://vectr.com/tmp/b75ezVFRh/c49lkfH0h.png?width=640&height=640&select=c49lkfH0hpage0)


### MVP / proof of concept

The current proof of concept is live at http://vimulator.surge.sh/html/index.html

there is admittedly still a lot to be done to make it efficient and viable.
