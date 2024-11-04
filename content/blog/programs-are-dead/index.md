---
title: Programs are dead
date: "2022-12-13T11:00:00.882Z"
description: "And JavaScript has killed them."
hackernewsId: 33965914
---

### Once upon a time.

Bored with everything you have done or seen on your screen, suddenly a spark of an idea pops up in your head. You think to yourself “I can create this program! It’s gonna solve an interesting problem and make life a bit easier for a few, and who knows, if I get lucky people might like it too and this would put a smile on their face. It’s gonna be fun!”.

You sit down and kick-start your JavaScript project. With only a handful of commands you install and get everything you want. You have your server framework and front-end interface all in the same place. You add a few libraries, you bring up TypeScript, and they all work nicely together. Within a short time you have already wrote a working program. It’s incredible how quickly you got from the initial idea to the final result.

It’s time. Proud with what you have built you decide to share it with the world. And indeed, it appears that it is the case that people like it too. Your project has now gained tons of stars on GitHub and has quite a number of daily users.

Six months passes and while you had almost forgotten about your little project, you now have got some new ideas that could make it even better. The project also has a few open issues and feature requests that you can take care of. So you come back to it.

“Let’s start”, you whispered to yourself with excitement. You run `npm install` in your terminal like an innocent man and switch to your browser to scroll on Twitter while you are waiting for the dependencies to be installed. Moments later you return to your terminal and see… an error! How strange. You run `npm install` again but watch it closely this time hoping you wouldn’t get any red messages again, but nope, here goes the error again. You hadn’t even touched it for the past six months so what happened?

<figure>
    <img src="cat-installing-npm.gif" alt="cat installs from npm">
    <figcaption>installing from npm</figcaption>
</figure>

Inspecting the error, you notice there’s an issue with the *node-gyp* package that is trying to build some sort of binary addon and it’s not compatible with your new operation system. You had encountered a similar issue and have managed to fixed it before, but the error message now is a bit different. You do your research but can’t exactly find the solution you’re looking for.

An hour or two has passed and you give up. You never needed to compress images that much anyway, so you just remove the image modifier library that was dependent on the binary addon to do its thing. It could be temporary since you can add it again later when you’re done. `npm install` again. No errors this time thankfully. (I mean no errors aside from the 50 severe vulnerabilities that I guess can be dealt with later but at least you can start the app now.)

Your app is running at last and now you want to add that little extra nice thing you had in your mind. For that, you need the latest version of *Next.js* which itself depends on the latest version of *React*. You notice *Next.js* has gone up two major versions. Now you have to upgrade. I mean the current version must be old, slow, and inefficient, right? Also, give it a couple of years and you’re gonna be 4 to 6 major versions behind so you better hurry up.

Anyway, you update both and try to run the app again and… of course, you get a new error. Now the CSS-in-JS solution you used is not compatible with either of the two, the state manager library you used is not working properly and it is also abandoned by its maintainer so good luck with that, you have new *TypeScript* issues and you can’t also fix the vulnerabilities because it would break the app even further.

After longs hours of struggling, you finally managed to fix all the issues and add your thing to the app and get done with it. You let out a huge sigh of relief and wonder to yourself if it was worth the effort. You ask yourself if another few months passes would you want to come back to your project again? Do you trust that everything would work? Do you trust JavaScript and its ecosystem?

### JavaScript is evolving too rapidly.

During the past 5–6 years of my JavaScript experience, every time I wanted to go back to any of my projects—from tiny to big, server-side or front-end—there was always a challenge, a problem to tackle or an obstacle to overcome before I can update or sometimes even just run my program.

It could be the case that it’s just a “me” problem, that I’m naive and inexperienced and I don’t know how to use a programming language and its tooling. But even that, why would a programming language allow this? Why would it make it so easy for mistakes to happen? I thought that the languages are there to help us and give us confidence and power, to reduce the errors and to guide us in the right direction instead of constantly making us feel like we’re stupid because of missing things and not finding the right way—whatever that is.

I know the issues that I named above are part of the ecosystem rather than the language itself  solely and maybe some say it’s unfair to put them on JavaScript alone but I don’t think they are that easily separable. The set of problems are too wide and not that straightforward to be narrowed down to something like the dependency system only. The language is responsible for providing the context and the environment in which things happen and get shaped. When we talk about a programming language we mean it as a whole and how it gets used by the user, not just the language specifications alone.

JavaScript has been evolving and growing so fast it’s unlike any other tech I’ve seen. One reason is, well, it’s being adopted by more and more various kinds of apps and devices every day and therefore is being used by an ever-increasing number of programmers and users. This means that there are always fresh problems to be solved in all of those areas by a single language and by the community behind it where they ought to ship new features and tools continuously just to be able to keep up if they ever can.

And all of them are going in their own direction in parallel. Consider *TypeScript*, build tools like *Vite* or *esbuild*, runtimes like *Node.js*, *Deno* or *Bun*, frameworks and libraries like *Next.js* or *Electron*, linters like *eslint* or *tslint,* test runners like *Jest* and so on, they all are advancing and being developed on their own to push the boundaries while simultaneously lean on each other’s work and try to keep up with the newest versions of JavaScript. 

Another reason could be that JavaScript was simply flawed at the beginning. It wasn’t designed and meant to do all of these. Compare today’s JavaScript with what it was around ten years ago. You didn’t even have basic immutable array methods like `.map()` before 2009. JavaScript has gone a long way to become what it is today, but yet with the help of all those patches, tools and even languages that are built on top of it, it’s still not quite there since the demands are too high. Too high that it’s more than what it can currently handle. There are still holes to be filled, core issues to be addressed and lacking features to be implemented.

Does this high demand for JavaScript justify the speed and the frequency of the changes in the frameworks and the tools which we create? Maybe, or maybe not. But considering the structure of the JavaScript ecosystem and its entanglements and also how it is practically used everywhere, perhaps we should take a few steps back before making decisions to reflect on our long-term vision and to recognize that how every change, even the tiny ones, could affect a whole group of users. It’s our responsibility to make sure that our app, library or framework is, and will be, working fine with other commonly used libraries or frameworks. 

### In a perfect world.

I’m not an expert to design a programming language or to write a runtime for it, and I’m fully aware of the complexities of solving even the smallest problems, especially at this scale. However, as a user I can have wishes and sometimes I just can’t stop dreaming about a perfect world where I could go back to any of my old JavaScript projects with an ease of mind and knowing that everything just works. A perfect world where my program is going to stand the test of time. 

A perfect world where there is a unified module system and I wouldn’t need to worry about file name extensions, build tools and compatibility. A world where I wouldn’t need dozens of third-party linters, type checkers and configurations just to make sure that my code is correct. A world in which I wouldn’t feel like my app is inadequate because I’m not using the [insert name] technology.

A perfect world where I can just use a library without it depending on hundreds of other libraries which they themselves might already be unmaintained and dead, or probably would be at some point. A world in which the frameworks I’m using are not being rewritten from scratch every few months—they don’t need to anymore.

A perfect world where I would look back at this blog post and smile, because either I was wrong or programs are no longer dying since JavaScript has finally got it together.