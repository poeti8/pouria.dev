---
title: Programs are dead
date: "2022-11-23T15:26:39.882Z"
description: "And JavaScript has killed them."
---
### Once upon a time.

Bored with everything you have done or seen on your screen, a spark of an idea suddenly pops up in your head. “I can create this program, people might gonna like it too!”, “It’s gonna solve this problem”, “It’s gonna make life a bit easier for a few”, or even “it’s gonna put a smile on someone’s face”, you think to yourself. 

You sit down, you kick off your JavaScript project. With only a handful of commands, you install everything you need, and you have your server framework and front-end interface all in the same app. You add a few libraries, you bring up TypeScript, and they all work nicely together. It’s incredible and in fact mind-blowing how quickly you got from the initial idea to the final app.

It’s time. You’re proud of what you have built and decide to share it with the world. And indeed, it appears that people like it too. Your project has now gained tons of stars on GitHub and has quite a number of daily users.

6 months later and while you had almost forgotten about your little project you have now got some new ideas that could make it even better or maybe the project has a few open issues or feature requests that you can take care of. So you come back to it.

“Let’s start” you whispered to yourself with excitement. You run `npm install`, switch to your browser to scroll on Twitter while the dependencies are being installed and moments later you return to your terminal and see… an error! Strange. `npm install` again, but this time watch it closely. Nope, here goes the error again. You hadn’t even touched it for the past 6 months so what happened?

~ insert image here

Inspecting the error, you notice there’s an issue with *node-gyp* trying to build some sort of binary addon but it’s not compatible with your new OS now. You had encountered a similar issue and fixed it before, but the error message is a bit different this time. You do your search but can’t exactly find the solution.

An hour or two passed, and you give up. You never needed to compress images that much anyway, so you just remove the *sharp* library, the one which depends on the binary addon to modify the images. It could be temporary since you can add it again later when you’re done. `npm install` again. No errors this time. Good! I mean no errors aside from the 50 severe vulnerabilities that I guess can be dealt with later but at least you can start the app now.

Your app is running at last and now you want to add that little extra nice thing you had in your mind. For that, you need the latest version *Next.js* which itself depends on the latest version of *React*. You notice *Next.js* has gone up TWO major versions. Now you HAVE to upgrade. I mean the current version must be too old, slow and inefficient, right? Also give it a couple years and you’re gonna be 4 or 6 major versions behind so you better catch up.

Anyway, you update both and run the app again and.. of course you get a new error. Now the CSS-in-JS solution you used is not compatible with neither of two, the state manager library you used is abandoned by the maintainer, you have new *TypeScript* issues and you can’t also fix the vulnerabilities because it would break app even further.

After some struggling long hours you finally managed to fix all the issues and add your thing to the app and get done with it. You let a huge sigh of relief and wonder to yourself if it was worth the effort. Another 6 month passes, would you want to come back to your project again? Would you trust that everything would work? Do you trust JavaScript and its ecosystem?

~ improvements here maybe ^

### JavaScript is evolving too rapidly.

For the past 7-8 years of my JavaScript experience, every time  I wanted to go back to any of my projects -from tiny to big, server-side or front-end- there was always a challenge, a problem to tackle or an obstacle to overcome before I can update or sometimes even just run my program.

It could be the case that it’s just a “me” problem, that I’m naive and inexperienced and I don’t know how to use JavaScript and its tooling. But why should a programming language allow this? Why should it make it so easy to do mistakes? Why mere using it would constantly make me feel like I’m stupid because of not doing things the right (whatever that is) way? 

I know the issues that I named above are part of the ecosystem rather than the language itself  solely and maybe some say it’s unfair to put them on JavaScript but I don’t think they are that easily separable, and moreover, I believe that its complications are not that straightforward to be narrowed down to let’s say the dependency system only. When we talk about a programming language we mean it as a whole and how it gets used by the user, not just the language specifications alone.

JavaScript has been evolving -and growing- so fast it’s unlike any other tech I’ve seen. One reason is, well, it’s being adopted by more and more various kinds of apps and devices each day and therefore being used by an ever increasing number of programmers and users. This means that there are always fresh problems to be solved in all those places by a single language and by the huge community behind it where they are ought to ship new features and tools continuously just to be able to keep up, if they ever can.

And all of them are going on their own direction in parallel. Consider *TypeScript*, build tools like *Vite* or *esbuild*, runtimes like *Node.js*, *Deno* or *Bun*, frameworks and libraries like *Next.js* or *Electron*, linters like *eslint* or *tslint,* test runners like *Jest* and **so on, they all are advancing and being developed on their own to push the boundaries while simultaneously lean on each other’s work and try to keep up with the new versions of JavaScript. 

Another reason could be that JavaScript was simply flawed at the beginning. It wasn’t designed and meant to do all of these. Compare today’s JavaScript with what it was around ten years ago. You didn’t even have simple immutable array methods like `.map()` before 2009. JavaScript has gone a long way to become what it is today, but yet with the help of all those patches, tools and even languages that are built on top of it (TypeScript <3) it’s still not quite there since the demand is too high. There are still holes to be filled, core issues to be addressed and lacking features to be implemented.

But does this high demand for JavaScript justify the speed and the frequency of changes in the frameworks and the tools which we create? Considering the structure of JavaScript ecosystem and its entanglements and also how it is practically used everywhere, perhaps we should take a few steps back before making decisions to reflect on our long-term vision and to recognize that how every change, even the tiny ones, could affect a whole group of users. It’s our responsibility to make sure that our app, library or framework is (and will be) working fine with other commonly used libraries or frameworks. 

And that’s the language’s responsibility to make it possible. 

### In a perfect world.

I’m not an expert to design a programming language or write a runtime for it, and I’m fully aware of the complexities of solving even the smallest problems especially at this scale. However, as a user I can have wishes and sometimes I just can’t stop dreaming about a perfect world where I would go back to any of my old JavaScript projects with ease of mind and knowing that everything just works and my program is going to stand the test of time. 

A perfect world where there is a unified module system and I wouldn’t need to worry about file names, build tools and compatibility. 

A perfect world where I wouldn’t need dozens of third-party linters and type checkers just to make sure that my code is correct. 

A perfect world in which I wouldn’t feel like my app is insufficient because I’m not using the “latest tech”.

A perfect world where I can just use a library without it depending on hundreds of other libraries which they themselves might already be dead or unmaintained, or probably would be at some point.