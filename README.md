# Frontend Mentor - GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences. _Hint_: Research `prefers-color-scheme` in CSS.

### Screenshot

![Mobile view](/public/screenshots/GitHubUserSearch-mobile.png)
![Tablet view](/public/screenshots/GitHubUserSearch-tablet.png)
![Desktop view](/public/screenshots/GitHubUserSearch-desktop.png)

### Links

- Solution URL: [GitHub](https://github.com/ania221B/github-user-search)
- Live Site URL: [GitHub Pages](https://ania221b.github.io/github-user-search/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Sass
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Intersection Observer API

### What I learned

There are many ways of adding classes in React conditionally. A great resource detailing them is provided in [Useful resources](#useful-resources) section. One of the said methods is using an array and `join()` method:

```jsx
function myComponent() {
  const classes = []
  if (isError) {
    classes.push('error')
  } else if (isWarining) {
    classes.push('warning')
  } else if (isInfo) {
    classes.push('info')
  } else {
    const indexOfError = searchBarClasses.indexOf('error')
    const indexOfWarning = searchBarClasses.indexOf('warning')
    const indexOfInfo = searchBarClasses.indexOf('info')
    searchBarClasses.splice(indexOfError - 1, 1)
    searchBarClasses.splice(indexOfWarning - 1, 1)
    searchBarClasses.splice(indexOfInfo - 1, 1)
  }

  return (
    <article className={`base-style` + ' ' + classes.join(' ')}>
      <h2>This is my component</h2>
      <p>
        Here is some info aobut it. This component was created using React. The
        classes it uses are added conditionally with an array and join() method
      </p>
    </article>
  )
}
```

I decided to use an empty array and have some classes for my component by default. This is because the ones I was using were for basic styling, so whole thing looked really ugly for a split second while loading when the said classes were missing. Yet you can have some items in the array if appropriate.
While the article I've learnt this from doesn't really show that, you also need to make sure to remove the classes, when they're no longer needed.

### Continued development

- React
- Intersection Observer
- Sass

### Useful resources

- [Mastering React Add Class Conditionally: A Comprehensive Guide](https://www.dhiwise.com/post/mastering-react-add-class-conditionally-a-comprehensive-guide) - amazing article about conditionally adding classes in React
- [Intersection Observer using React](https://dev.to/producthackers/intersection-observer-using-react-49ko) - This helped me correctly use Intersection Observer API in React.
- [Building Skeleton Screens with CSS Custom Properties ](https://css-tricks.com/building-skeleton-screens-css-custom-properties/) - This article explains how to build a skeleton screen using gradients and custom properties.

## Author

- Frontend Mentor - [@ania221b](https://www.frontendmentor.io/profile/ania221b)
