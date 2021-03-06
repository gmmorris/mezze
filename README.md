# meze ![alt TravisCI Build](https://travis-ci.org/gmmorris/meze.svg?branch=master)

***Meze***, a word with its roots in antiquity, describes a selection of small dishes served accompanying alcoholic drinks, whose purpose is three-fold: to complement and enhance the taste of the drink, to provide the backdrop for a social gathering and to decouple the implementation of the individual dishes so that they may be consumed by the hungry developer in whichever way suits them the best.

The above is as true for real life *Meze* as for it's Javascript counterpart.

Born out of a thought experiment, *Meze* provides the Component Composition API popularized by the *React* library in order to declaratively compose data and process. *Meze* is designed to make it painless to express complex operations while striving for the simplicity of functional composition.

## Key Features
* ***Stateless Components*** maintain the standard *React API*, with slight changes to better reflect their purpose as implementations of data & process ,rather than stateful UI
* ***Meze.compose*** mounts a component tree which reduces down to a single return value
* Asynchronous processes are seamlessly supported via a *Promise based API* between composed component trees
* Fully supports *JSX* in order to make adoption as seamless as possible for developers already used to the syntax and developer experience of React
* [*Banquet*](https://github.com/gmmorris/meze/tree/master/packages/banquet), a *Meze* based wrapper for the superb [Restify](http://restify.com/) library, is available to make it easy to get started building a *REST* service using **Meze**
* Supports all of the paradigms we've come to love about working with React, ranging from Component Composition to Higher Order Components

## Why
The most obvious question in regards to Meze is - why would we want to add it to our stack?
Meze was born out of [a thought experiment](https://medium.com/@chekofif/the-magical-quest-for-componentisation-76a0d609a103), in which we contemplated what componentisation was and what benefits it gave us.
Out of that experiment a Research Question was born, which was:

> How could the Component Composition we've grown to appreciate in building our UIs be used to build more declarative, less cohesively coupled code in our server side code as well.

We know, we know, Research Questions are supposed to be more granular and specific but in truth, an abstract question is needed when you're interesting in providing an abstract answer.
The key difference between React and what we're looking for is that React is designed for long lived component trees with every changing state, while what we need for our server side processes is something slightly different.
What we need is a pipe line of operations, resulting in some kind of result and often, some side effects too. This called for a very different implementation approach from what React could provide.
That said, the Component Composition API, which is the basis of what separates React, Inferno and similar libraries from other UI focused libraries, is very intuitive, generic enough to suit our needs and most importantly - has received wide adoption and so would make onboarding new developers into the Meze ecosystem easier.

So what we've built is a library using the familiar Component Composition API with *unidirectional data flow and separation of concerns* whose internal implementation is designed as a *compose & reduce* operation rather than a long lived tree of flowing state.

## Install
There is only one module you *need* in order to start using Meze, which is the core *meze* module. In addition you'd probably benefit from using *babel-preset-meze* as well, which will allow you to start using Meze components via JSX.

```sh
npm install --save meze
npm install --save-dev babel-preset-meze
```

In order to use *babel-preset-meze* you'll also want to define it's usage in your *.babelrc* file (we've included the es2015 preset).
```json
{
  "presets": ["meze", "es2015"]
}
```

Once you have both of these modules installed and configured you can start defining components and composing them together.

# Full Documentation

* [Introduction](packages/meze/docs/installation.md)
* [Basic Usage](packages/meze/docs/usage.md)
* [Thinking in Components](packages/meze/docs/thinking_in_components.md)
* [Composing](packages/meze/docs/composing.md)
* [Type Checking](packages/meze/docs/type_checking.md)
* [Manipulating Children](packages/meze/docs/manipulating_children.md)
* [Component Lifecycle](packages/meze/docs/component_lifecycle.md)
* [Banquet](packages/meze/docs/banquet.md)
* [Testing](packages/meze/docs/testing.md)
* [TODO](packages/meze/docs/todo.md)

# Articles
* [Componentization](packages/meze/docs/componentization.md)

# Talks
[![A Tech Talk I gave about Meze at Unruly HQ](http://img.youtube.com/vi/VkhiXWq-VVQ/0.jpg)](http://www.youtube.com/watch?v=VkhiXWq-VVQ "Meze: A Preface")


