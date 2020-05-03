# Disclaimer
>*Disclaimer: **This is not a tutorial**. I am decidedly not an expert. While I do my best to strive for best practices, I do not guarantee them. I'm writing this simply as a means of journaling my own development. I will try to make this document as informative as I can. However, this should not be treated as anything more than the ramblings of a lunatic with a \[D]ill-informed opinion. If other people find this useful though − great!*

# Document Goal
We're going to turn it up a notch and move our previous TicTacToe effort over into an Angular application, and expanding on it. Why? Because TypeScript is awesome, Angular is awesome, and RxJS is awesome. The whole ecosystem is **AWESOME**. Angular has taken out much of the pain of developing front end applications, and replaced it with a smooth developer experience.

While I love working with Angular, this is not going to be a guide or tutorial on how to use Angular. This is just journaling my own efforts, and helps organize and note my thoughts as I develop this project.

On that note, feel free to [read my thoughts on Angular Architecture and Design Patterns](https://kdill.ca/angular-architecture-a-brief-consideration/). It briefly explains my rationale for why I do and name things the way I do in this document.

In addition, ***we will be laying some of the groundwork for future iterations of this project***. For that reason there will be some redundant or unused code written in this document. It will serve a purpose later on.

This version is going to be quite a bit more detailed than previous efforts.

# Tech Stack
We will be using the following technologies to complete version 3 of this app.
- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/guide/overview)
- [Angular-CLI](https://cli.angular.io/)
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Sass](https://sass-lang.com/)

## Node.js
>[Node.js](https://nodejs.org/en/)® is a JavaScript runtime built on [Chrome's V8 JavaScript engine.](https://v8.dev/)

## NPM
>We're [npm](https://www.npmjs.com/), Inc., the company behind Node package manager, the npm Registry, and npm CLI. We offer those to the community for free, but our day job is building and selling useful tools for developers like you. 

## TypeScript
>[TypeScript](https://www.typescriptlang.org/) is a typed superset of JavaScript that compiles to plain JavaScript.

## RxJS - Reactive Extensions Library for JavaScript
>[RxJS](https://rxjs.dev/guide/overview) is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debug call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface 

## Angular CLI
>The [Angular CLI](https://cli.angular.io/) is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications. You can use the tool directly in a command shell, or indirectly through an interactive UI such as Angular Console.

## Angular
>[Angular](https://angular.io/) is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.

## Angular Material
>[Material Design](https://material.angular.io/) components for Angular

## Sass
>[Sass](https://sass-lang.com/) is the most mature, stable, and powerful professional grade CSS extension language in the world. 

## Assumptions

This documentation is going to assume that Node, Angular CLI, and TypeScript have already been installed.

On Top of that, I will be using [Visual Studio Code](https://code.visualstudio.com/) as my editor. While it's not pertinent to this specific document, the extension [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) is nearly essential it's so good. Recommend both.

# Creating an Angular App
Ok, so in the root directory we're going to create a new Angular App. We'll just call it 'v3' because this is Version 3 of our TicTacToe journey.

## New App

Using Angular CLI the **recommended** command will be this:
```
ng new v3 --packageManager=npm --routing=true --style=scss
```

Quick Overview:
1. Creates a new angular app named 'v3'
1. Setups NPM as our package manager - just my preference.
1. Adds Angular Routing
1. Sets up Sass as our styling solution

The first command, `ng new v3` is straight forward. It creates a new Angular application named 'v3'. The following commands are all options for the app.

`--packageManager=npm` sets [Node Package Manager](https://www.npmjs.com/) as our package manager of choice. It actually *already is* the default for Angular, but I wanted to point out that I will be using this for the rest of the guide. There are alternatives, like yarn, that I really don't know enough about to have an opinion on. However, as of writing, NPM has just been acquired by GitHub. NPM has massive backing behind it, and will likely end up becoming the industry standard. Good enough for me!

`--routing=true` Sets our project up to use [Angular Routing](https://angular.io/guide/router). We will only be using a single component that matters, so I will not be going into a ton of detail on Routing or how it works. In short though, it allows us to navigate around our app via URL. Very useful for more complex applications, and marshalling data between components when/if required to use a URL.

`--style=scss` We configured the app with Sass selected as our styling solution. This is a CSS preprocessor, that extends the functionality of CSS. This is used by Material, and is also just my preferred solution.

## Setup Material 
So after that finishes running we will want to change our directory.

```
cd v3
```

Now we're going to [install Angular Material](https://material.angular.io/guide/getting-started), an implementation of Google's Material Design. This is a UI design / framework that is used across their services and platforms. It gives a nice, professional polish to our components.

```
ng add @angular/material
```

It will prompt us to pick a theme. In this case, because it's a dark theme, I'm going to go with Pink/Blue Grey.

We will say `yes` to set up global Angular Material typography styles.

We will say `yes` to set up browser animations for Angular Material

## Update Styles
We need to add in the Material theme to style.scss. In addition we'll set the preferred font, and essential font-size / line-height for app sizing.

```scss
/* You can add global styles to this file, and also import other style files */
@import '@angular/material/prebuilt-themes/pink-bluegrey.css';

html, body {height: 100%; margin: 0; padding: 0; line-height: 14px; font-size: 14px;}
body {font-family: Roboto, "Helvetica Neue", "Arial", sans-serif;}
```
## Update index.html
Also we need to go back and update the index.html. We need to include the extra style sheets from Material and Material Icons. I've also included some extra fonts that we will use later, and just some generally useful ones commented out for now.
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>V3</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- Roboto -->
  <!-- font-family: 'Roboto', sans-serif; -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
  <!-- font-family: 'Roboto Mono', monospace; -->
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500&display=swap" rel="stylesheet">
  <!--
  <!-- font-family: 'Roboto Condensed', sans-serif; --
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,500&display=swap" rel="stylesheet">
  <!-- font-family: 'Roboto Slab', serif; --
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500&display=swap" rel="stylesheet">
  -->

  <!-- Monospaced -->
  <!-- font-family: 'VT323', monospace; -->
  <link href="https://fonts.googleapis.com/css?family=VT323&display=swap" rel="stylesheet">
  <!-- font-family: 'Inconsolata', monospace; -->
  <link href="https://fonts.googleapis.com/css?family=Inconsolata&display=swap" rel="stylesheet">


  <!-- Icon Fonts -->
  <!-- Material -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- Font Awesome -->
  <!-- You'll need to get your own code from them if you want to use their fonts -->

</head>

<body class="mat-typography mat-app-background">
  <app-root></app-root>
</body>

</html>
```

And that's it. The new application is now setup. We can run `ng serve` to see the app. By default it will open up a dev server at `http://localhost:4200/`.

Let's see:
<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-0.jpg" style="max-height: 480px; max-width: 100%;"></img>
</p>

<em>
<small>
<p align='center'>
Note: Yours may have a different color background depending on the theme you've installed from Material. Specifically the class `mat-app-background` we added to body in index.html would affect that.
</p>
</em>
</small>

# Create Initial Services and Game Module
Great. Next we will create the 'Game' module. All games we will be writing will share the 'Games' module. It will create the very basic setup for games, hold some shared constants, and also be a place to store generic settings and components like volume, input, etc.

This Games module is going to be extremely basic during this current iteration, but in the future I'll be adding in the aforementioned components to expand the Game module into a more robust solution. For now it will just be a wrapper container for the TicTacToe game, with a few settings for animation and sizing.
```
ng g module Games --module=app --route=Games
```
And lastly we will create a GamesMediator service to manage the module.
```
ng g s games/GamesMediator
```
Done.


# Create The TicTacToe Module
## Rundown
Now we will start building out the skeleton of our TicTacToe app.

So if this was a single one off app, you might want to start creating components and just run off the App or Game module. That's fine, but I actually intend to reuse a lot of this code in the near future to create more games, so I'll be sticking TicTacToe into it's own module. Let's first talk about what our TicTacToeModule is going to contain:

- [x] A TicTacToeModel service.
- [x] A TicTacToeMediator service.
- [x] A TicTacToe component.
- [x] A TicTacToeBoard component.
- [x] A TicTacToeBoardGrid component.
- [x] A TicTacToeBoardPieces component.
- [x] A TicTacToeTurnIndicator component.
- [x] A TicTacToeSettings component.

Alright. If you've been following along from the other version of our TicTacToe game, at this point you might be wondering right now why I'm chopping up the game into so many components. The answer is that in order to increase the complexity of our game, it is best to compartmentalize our code to break it down into smaller bits. This is Angular's greatest strength.

For example, drawing the grid and pieces to a single canvas in code is both annoying, and unnecessary. Does the game **GRID** *really* need to be updated after every move? Right now the only reason it does so is because we color it red on a tie, but we can simply just do that to the pieces only instead, and leave the grid alone. So in this case we will create two components from the original one - breaking up our logic into bite sized chunks, and increasing efficiency while we're at it.

Beyond that, we'll be adding in new animations for the game pieces, so additional and more complicated draw calls will be occurring when compared to v1 and v2. The less complexity overall the better, so we will reduce the problem down into their individual segments.

The most important pieces will be the TicTacToeModel and TicTacToeMediator services. The Model will be the central logic for the game, computing and managing states. The TicTacToeMediator is the main communicator between the Model and components, where data binding shall occur via a BehaviorSubject observable.

## Make!

Let's start creating our new module. Run these commands:
```
ng g module games/play/TicTacToe --module=games --route=play/TicTacToe
```
This will create a TicTacToe module, which is meant to be a stand alone collection of code for our application.

Setting up routing like this will automatically update our app-routing.module. So that's nice. In addition a module comes with a tic-tac-toe.component right away - this will be the main entry component that will act as the parent to our TicTacToe game.

Let's continue.
```
ng g s games/play/tic-tac-toe/TicTacToeModel
```
This service will be the main model and data for our game.
```
ng g s games/play/tic-tac-toe/TicTacToeMediator
```
This service will mediate between all of our module components, marshalling the model state back and forth. When it updates the game state, the corresponding bound components will be notified and update as well.
```
ng g c games/play/tic-tac-toe/TicTacToeBoard --module=games/play/tic-tac-toe
```
This will be for where we draw our game board. It will act as a wrapper for our grid and pieces components.
```
ng g c games/play/tic-tac-toe/TicTacToeBoardGrid --module=games/play/tic-tac-toe
```
This will be for our actual game grid.
```
ng g c games/play/tic-tac-toe/TicTacToeBoardPieces --module=games/play/tic-tac-toe
```
This will be for where we draw our game symbols/pieces.
```
ng g c games/play/tic-tac-toe/TicTacToeTurnIndicator --module=games/play/tic-tac-toe
```
This will be for our player indicators.
```
ng g c games/play/tic-tac-toe/TicTacToeSettings --module=games/play/tic-tac-toe
```
This will be a button that pop ups a setting menu to adjust our game. Also a label indicating the current difficulty.
```
ng g c games/play/tic-tac-toe/TicTacToeSettingsMenu --module=games/play/tic-tac-toe
```
This will be the actual settings menu with controls Reset Game / Change Grid Size / Change Difficulty / etc.

## Check structure

Ok. The skeleton is done. Your directory should now look like this:

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-1.jpg" style="max-height: 600px; max-width: 100%;"></img>
</p>

# Update Routes
So now that we have the components created, we will want to route to our base TicTacToeComponent.

Let's open our app.component.html and replace the template with these lines.
```html
<p>app works!</p>
<router-outlet></router-outlet>
```
And now we'll just open our app-routing.module and
```javascript
const routes: Routes = [{ path: '', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) }];
```
So what we've done here is change our apps default path to point to our Games Module.

Next let's open our games.component.html and change:
```html
<p>games works!</p>
<router-outlet></router-outlet>
```
And now games-routing.module we'll alter to:
```javascript
const routes: Routes = [{
  path: '',
  component: GamesComponent,
  children: [{
    path: '',
    loadChildren: () => import('./play/tic-tac-toe/tic-tac-toe.module').then(m => m.TicTacToeModule)
  }]
}];
```

Here we've routed the App component as a wrapper to the Games component, which in turn wraps the TicTacToe Component.

App will end up managing the general layout of the application. Games will manage the game general layout. TicTacToe will wrap its specific components. It's a clear hierarchal separation of concerns.

`ng serve`

You should now get something like this:

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-2.jpg" style="max-height: 200px; max-width: 100%;"></img>
</p>

<p align="center">
<em>Note: If you've gotten something else now would be the time to go back and try to figure out what you've missed!</em>
</p>

Great! We can see that all 3 expected components are being rendered. Go back and remove the `[component] works!` lines as they are no longer needed.


# Update Module Imports

Great stuff. We have a few quick things we need to knock out in our Modules. We will be using some Material modules, so we need to import and declare them in the relevant modules that will consume them. That means we need to update App.module.ts and TicTacToe.module.ts

## app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule

  ],
  providers: [
    MatIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## tic-tac-toe.module.ts
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeBoardComponent } from './tic-tac-toe-board/tic-tac-toe-board.component';
import { TicTacToeBoardGridComponent } from './tic-tac-toe-board-grid/tic-tac-toe-board-grid.component';
import { TicTacToeBoardPiecesComponent } from './tic-tac-toe-board-pieces/tic-tac-toe-board-pieces.component';
import { TicTacToeTurnIndicatorComponent } from './tic-tac-toe-turn-indicator/tic-tac-toe-turn-indicator.component';
import { TicTacToeSettingsComponent } from './tic-tac-toe-settings/tic-tac-toe-settings.component';
import { TicTacToeSettingsMenuComponent } from './tic-tac-toe-settings-menu/tic-tac-toe-settings-menu.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [TicTacToeComponent, TicTacToeBoardComponent, TicTacToeBoardGridComponent, TicTacToeBoardPiecesComponent, TicTacToeTurnIndicatorComponent, TicTacToeSettingsComponent, TicTacToeSettingsMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicTacToeRoutingModule,

    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    TicTacToeSettingsMenuComponent
  ],
  providers: [
    MatIconRegistry
  ]
})
export class TicTacToeModule { }
```

With those out of the way we should be able to use the required Material Components.


# App Layout

Ok. Now we have the skeleton, routing, and component declarations completed. Let's take a look at the general layout we want to achieve. Here's a quick mock up I did in good ole paint (ignore the color scheme):

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-3.jpg" style="max-height: 400px; max-width: 100%;"></img>
</p>

So in short we want a tool bar at the top with two buttons. The left button will open a side nav, and the right button will be user account controls.

The next part is the TicTacToe game itself - with some new additions! We will track the AI difficulty setting by applying it to the 'opponent' name. We will include a new 'Next Game' button that will end or concede a game, alternating players. And lastly we will have a settings button in the bottom corner to open a game settings menu.

Not included in the layout diagram is a 'game title'. I was iffy on it, but for now I think it will be included beside the navigation button.

Notably too, while the side nav and account button will be implemented, they are going to be empty for this iteration. It's just convenient to knock these out now.

Let's get started!

# App
First we'll do a very basic layout for our app. We will wrap everything in a Material sidenav component. The sidenav contents we will place a toolbar at the top with a menu button, modifiable title, and account button.

The contents will also have a container for the router outlet.

## app.component
```html
<!-- app.component.html -->
<mat-sidenav-container class='app-container'>
  <mat-sidenav #sidenav class='sidenav' [mode]="mobileQuery.matches ? 'over' : 'side'"
    [fixedInViewport]="mobileQuery.matches">

    <!-- Mobile Close button-->
    <div *ngIf="mobileQuery.matches" class="sidenav-close-button">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <!-- Navigation stuff goes here -->

  </mat-sidenav>

  <mat-sidenav-content>
    <mat-toolbar color='primary' class='app-toolbar'>
      <div class='app-toolbar-contents'>
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>{{title}}</span>
        <span class='app-toolbar-spacer'></span>
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <div class='app-route-container'>
      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>

</mat-sidenav-container>
```
```scss
// app.component.scss
$toolbarheight: 3em;

.app-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.sidenav{
  min-width: 300px;
  display: flex;
  flex-direction: column;
}
.sidenav-close-button{
  display: flex;
  padding: 0.5em;
  justify-content: flex-end;
  align-items: center;
}
.app-content{
  width: 100%;
  height: 100%;
  position: relative;
}

.app-toolbar{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1em;
  height: $toolbarheight;
  margin: 0;
}

.app-route-container{
  position: absolute;
  top: $toolbarheight;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

.app-toolbar-contents{
  font-size: 1.5rem;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
}

.app-toolbar-spacer {
  flex: 1 1 auto;
}
```
```typescript
// app.component.ts
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  title = 'v3';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
```

Now you should have something like:

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-4.jpg" style="max-height: 360px; max-width: 100%;"></img>
</p>

Awesome. Now we will quickly do the games component. As said earlier, this is going to be a wrapper more or less for now. You can see from the comments though how we intend to add other components to create a more 'general' platform for future games. That work will happen in later iterations - let's just get TicTacToe done for now.

## games.component
```html
<!-- games.component.html -->
<div class='games-component'>
  <!-- Layered Game Components go here -->

  <!-- TODO: 0 Background Layer -->

  <!-- TODO: 1 Audio Component Layer -->

  <!-- TODO: 2 Input Component Layer -->

  <!-- 3 Child Components Route Layers -->
  <div class='games-children-layer'>
    <router-outlet></router-outlet>
  </div>

  <!-- TODO: 4 Settings Layer -->

  <!-- TODO: 5 Notification Layer -->
</div>
```
```scss
// games.component.scss
.games-component{
  position: relative;
  height: 100%;
  width: 100%;
}
.games-children-layer{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  overflow: auto;
}

```
Pretty straight forward. The Game.component is going to be unused for now, but we can add a few control variables to games-mediator.service.ts

## games-mediator.service.ts
```typescript
// games-mediator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesMediatorService {
  isAnimationEnabled: boolean = true;
  useSmoothAnimation: boolean = true;

  get targetFps(): 60 | 30 {
    return this.useSmoothAnimation ? 60 : 30;
  }

  get frequency(): number {
    return 1000 / this.targetFps;
  }

  constructor() { }
}
```

The animation variables are pretty straight forward. Later on the TicTacToeBoardPieces component will use these variables to control its drawing function.

Phew! That's everything done for the general setup of the app. We can finally start porting the old code.

# TicTacToe Logic
So now we can start to repurpose our previously written TicTacToe code from versions 1 and 2. Before we were using JavaScript, and now we'll be upgrading that to TypeScript. Much of it will get rewritten in the process. It will be a nice jumping off point though. I won't go into major detail unless significant changes were made to the underlying code.

We'll begin with the most important parts, the Mediator and Model services.

## TicTacToeModel and TicTacToeMediator Services
We'll start here because these will be the heart and soul of the rest of the app. We'll be mostly rewriting our game here. That includes TicTacToeCell, TicTacToeGameState, and much of the TicTacToeGame logic. We will also make use of RxJS to do so.

Let's start with our Model service. The model is responsible in this case for handling and processing all game related logic, from a data perspective.

Here's the code


## tic-tac-toe-model.service.ts
```typescript
// tic-tac-toe-model.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeModelService {

  constructor() { }
}
```

Pretty straight forward. Note the injectable decorator, and the 'providedIn' attribute. What that essentially means is a *singleton* instance of this service will be injected into the application root. Whenever another service, or component is passed this service into their constructor they will receive a copy of the singleton. Combined with observables, this is a really simple way to pass around application state throughout components.

Let's drop in TicTacToeCell

```typescript
// tic-tac-toe-model.service.ts
import { Injectable } from '@angular/core';

export interface ITicTacToeCell {
  contains: 0 | 1 | 2;  // 0 Is empty, 1 is X's, 2 is O's
  winner: boolean;      // Is set if cell is part of win condition
  x: number;            // X position on Board
  y: number;            // Y position on Board
}

// ...
```
You can see that we started making use of our types. Next lets drop in TicTacToeGameState right underneath the cell class.

```typescript
// tic-tac-toe-model.service.ts
import { Injectable } from '@angular/core';

// ...

export type AiDifficulty = 'Solo' | 'Easy' | 'Medium' | 'Hard' | 'Impossible';

export interface ITicTacToeGameState {
  userIsPlayerPosition: 1 | 2;
  userName: string;
  opponentName: string;
  difficulty: AiDifficulty;
  gridSize: number;
  board: ITicTacToeCell[][];
  gameTurn: number;
  isGameWon: 'No' | 'Yes' | 'Tied';
}

// ...
```

Ok. We made some changes, including a few more variables added to the interface which are self explanatory. What's going to be different this time is we will be using the ITicTacToeGameState this time to trigger our observer pattern in combination with the BehaviorSubject from RxJS. *(Note: This new approach would be very helpful if we were to network gameplay.)*

More on that in a moment.

As it was mostly covered in previous iterations, I'm just going to copy paste the rest of the model class.

```typescript
// tic-tac-toe-model.service.ts
@Injectable({
  providedIn: 'root'
})
export class TicTacToeModelService implements ITicTacToeGameState {

  static readonly MINIMUM_GRID_SIZE = 3;

  userIsPlayerPosition: 1 | 2;
  userName: string;
  opponentName: string;
  difficulty: AiDifficulty;

  private _gridSize: number;
  set gridSize(val: number) {
    if (val == null) {
      console.warn(`Grid size is unset. Returning default grid size: ${TicTacToeModelService.MINIMUM_GRID_SIZE}.`);
      val = TicTacToeModelService.MINIMUM_GRID_SIZE;
    }
    else if (val < TicTacToeModelService.MINIMUM_GRID_SIZE) {
      console.warn(`Grid size cannot be less than ${TicTacToeModelService.MINIMUM_GRID_SIZE}. Returning default grid size: ${TicTacToeModelService.MINIMUM_GRID_SIZE}.`);
      val = TicTacToeModelService.MINIMUM_GRID_SIZE;
    }
    this._gridSize = val;
    this.restart();
  }
  get gridSize(): number {
    return this._gridSize;
  }

  board: ITicTacToeCell[][];
  gameTurn: number;
  isGameWon: 'No' | 'Yes' | 'Tied';

  constructor(size?: number) {
    this.userIsPlayerPosition = 1;
    this.userName = 'Player';
    this.opponentName = 'Opponent';
    this.difficulty = 'Easy';
    this.gridSize = size;
    // Restart is called when we assign grid size, constructing the rest of the default values
  }

  /**
   * Restarts the game.
   */
  restart(): ITicTacToeGameState {
    this.gameTurn = 0;
    this.isGameWon = 'No';

    // Board setup
    this.board = [];
    for (let x = 0; x < this.gridSize; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.gridSize; y++) {
        this.board[x][y] = {
          contains: 0,
          winner: false,
          x: x,
          y: y
        };
      }
    }
    return this;
  }

  /**
   * Proceeds to the next game, alternating user player position.
   */
  nextGame(): ITicTacToeGameState {
    this.userIsPlayerPosition = this.userIsPlayerPosition == 1 ? 2 : 1;
    return this.restart();
  }

  /**
   * Tries a move. If valid win conditionals are checked and board cells updated.
   * @param {number} x - The X Position of the TicTacToe Cell.
   * @param {number} y - The Y Position of the TicTacToe Cell.
   */
  tryMove(x: number, y: number): ITicTacToeGameState {
    //let state = this;
    if (this.board[x][y].contains === 0) {
      if ((this.gameTurn % 2) === 0) {
        this.board[x][y].contains = 1;
      } else {
        this.board[x][y].contains = 2;
      }

      // Check row win conditions
      let row = this.board.length - 1;
      let col = y;
      let rowWin = TicTacToeModelService.checkRowWinCondition(this, this.board[x][y], row, col);

      // Check column win condition
      row = x;
      col = this.board[x].length - 1;
      let colWin = TicTacToeModelService.checkColumnWinCondition(this, this.board[x][y], row, col);

      // Check diagonal win condition
      row = this.board.length - 1;
      col = this.board[x].length - 1;
      let diagWin = TicTacToeModelService.checkDiagonalWinCondition(this, this.board[x][y], row, col);

      // Check reverse diagonal win condition
      row = 0;
      col = this.board[x].length - 1;
      let maxRow = this.board.length - 1;
      let reverseDiagWin = TicTacToeModelService.checkReverseDiagonalWinCondition(this, this.board[x][y], row, col, maxRow);

      this.gameTurn++;

      // Confirm if the game has been won
      if (rowWin === true || colWin === true || diagWin === true || reverseDiagWin === true) {
        this.isGameWon = 'Yes';
      }
      // Has game run out of moves?
      else if (this.gameTurn >= Math.pow(this.gridSize, 2)) {
        this.isGameWon = 'Tied';
      }

      return this;
    }
  }

  // Win Conditionals
  checkReverseDiagonalWinCondition(state: ITicTacToeGameStateInterface, cell: TicTacToeCell, row: number, col: number, maxRow: number): boolean {
    // ...
  }

  checkDiagonalWinCondition(state: ITicTacToeGameStateInterface, cell: TicTacToeCell, row: number, col: number): boolean {
    // ...
  }

  checkColumnWinCondition(state: ITicTacToeGameStateInterface, cell: TicTacToeCell, row: number, col: number): boolean {
    // ...
  }

  checkRowWinCondition(state: ITicTacToeGameStateInterface, cell: TicTacToeCell, row: number, col: number): boolean {
    // ...
  }
}
```

Awesome. I know that was kind of a lot to just dump at once, but again it has already been covered pretty thoroughly. Very little has changed.

Moving on!

## tic-tac-toe-mediator.service.ts

So this class just acts as a middle man to ferry data between the components and the model service. The components should, in theory, never interact directly with the model service, communicating through the mediator instead. The Mediator will additionally hold some general variables that the components will be using. 

```typescript
// tic-tac-toe-mediator.service.ts
import { Injectable } from '@angular/core';
import { ITicTacToeGameState, TicTacToeModelService, AiDifficulty } from './tic-tac-toe-model.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeMediatorService {
  strokePrimaryColor: string = "white";
  strokeWinColor: string = 'green';
  strokeTieColor: string = 'red';

  // Observable acting as our state machine
  state: BehaviorSubject<ITicTacToeGameState>;

  constructor(private model: TicTacToeModelService) {
    this.state = new BehaviorSubject(model);
  }

  /**
   * Tries a move. The model will process the action and 'state' will be updated.
   * @param {number} x - The X Position of the TicTacToe Cell.
   * @param {number} y - The Y Position of the TicTacToe Cell.
   */
  tryMove(x: number, y: number) {
    this.state.next(this.model.tryMove(x, y));
  }

  /**
   * Proceeds to the next game, alternating user player position. 'State' will be updated.
   */
  nextGame() {
    this.state.next(this.model.nextGame());
  }

  /**
   * Changes the model's AI difficulty. 'State' will be updated.
   * @param {AiDifficulty} difficulty - The AI difficulty to be set.
   */
  changeDifficulty(difficulty: AiDifficulty) {
    if (difficulty != this.state.value.difficulty) {
      this.model.difficulty = difficulty;
      this.state.next(this.model);
    }
  }

  /**
   * Changes the model's grid size. 'State' will be updated.
   * @param {number} size - The size of grid to change to.
   */
  changeGridSize(size: number) {
    if (size != this.model.gridSize) {
      this.model.gridSize = size;
      this.state.next(this.model);
    }
  }
}
```

Awesome. So the important things to note is that we are now passing the model through to the BehaviorSubject whenever its state has changed. State Changes occur in the tryMove / nextGame / changeDifficulty / changeGridSize functions. After processing the logic we update our BehaviorSubject via its next method, passing in the model as the new state. The BehaviorSubject will then notify its subscribers. The subscribers then should call their own methods to update themselves in response, automating everything through one action, that chains multiple function calls in response.

Just to really hammer this in, BehaviorSubject is really going to be the core paradigm to the whole application. BehaviorSubject uses an (modified) observable design pattern. The Subject holds onto its state internally as a read only value. However, we can change that value by calling its `next()` method, and passing it its new state. When this happens the BehaviorSubject will notify any objects 'subscribed' to it, passing along its state as a parameter. Importantly to note is that BehaviorSubject will immediately emit its state to anything that subscribes to it - that means every subscriber is guaranteed to receive an update at least once.

This is a very efficient way to marshal data back and forth between all of our apps components.

Very efficient. Very Cool.

# TicTacToe Components

Now that we have the logic being handled, it's finally time to start wiring up our components. Let's take another look at the basic layout we're going for again.

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-3.jpg" style="max-height: 480px;  max-width: 100%;"></img>
</p>

OK, so breaking it from the top down we have:
- AppComponent / GamesComponent. Our root components that wrap TicTacToe.
- TicTacToeComponent. Will wrap the rest of the components within the TicTacToeModule.
- Player indicator. Used to indicate which players turn it is. Also indicates AI difficulty.
- The game board. It will wrap our grid and pieces.
- The game grid. It simply displays our grid.
- The game pieces. The X's and O's.
- Next Game button that concedes a game. Settings button to open the settings menu.

Neat. We've already made our components earlier. So we can dive into ripping apart and updating our old HTML. But first:

## A Note on Styling
So let's just briefly go over the included styling that was added when we created our app.

So we've installed Material, and used the Pink / Blue Grey theme. It was automatically added as an external resource via our angular.json config file

```json
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/pink-bluegrey.css",
  "src/styles.scss"
],
```
The app will change depending on which material theme has been used. We'll use as much of the material theme as is reasonable for this little app.

Next we have `styles.scss` in v3/src. This is the root stylesheet for the whole app, and where you would put your 'global' styles.

These two places are where there might be non obvious styling that is happening. Material and mat-typography specifically alter a lot of default styling. These are where you should look first if you're confused.

***NOTE: MANY OF THE STYLE DECISIONS I MAKE IN THIS DOCUMENT ASSUME A DARK THEME. IF YOU GO WITH SOMETHING ELSE, JUST BE AWARE YOU MAY NEED TO ADJUST SOME OF THE SCSS.** This will be particularly noteworthy in areas where I'm inverting colors - like the turn indicator.*

## Components
We know what our app is generally going to look like, and we know what our current default styles are. 

## tic-tac-toe.component
```html
<!--tic-tac-toe.component.html -->

<div class="game-container">
  <div class="game">
    <app-tic-tac-toe-turn-indicator class="game-bar"></app-tic-tac-toe-turn-indicator>
    <app-tic-tac-toe-board class="game-board mat-app-background"></app-tic-tac-toe-board>
    <app-tic-tac-toe-settings class="game-bar"></app-tic-tac-toe-settings>
  </div>
</div>
```
```scss
// tic-tac-toe.component.scss

@use '../../../app.component' as c;

.game-container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  overflow: auto;
}
.game{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.game-bar{
  box-sizing: border-box;
  position: relative;
  width: calc(100% - 6em);
  height: 3em;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.game-board{
  position: relative;
  width: calc(100% - 6em);
  height: calc(100% - 6em);
}

@media (orientation: landscape) {
  .game {
    width: calc(100vh - (2 * #{c.$toolbarheight}));
    height: calc(100vh - (2 * #{c.$toolbarheight}));
  }
}
@media (orientation: portrait) {
  .game {
    width: calc(100vw);
    height: calc(100vw);
  }
}
@media screen and (max-width: 575px) {
  .game-container{
    display: block;
  }
  .game {
    width: 480px;
    height: 480px;
    margin: auto;
  }
}
@media screen and (max-height: 575px) {
  .game-container{
    display: block;
  }
  .game {
    width: 480px;
    height: 480px;
    margin: auto;
  }
}
```
```typescript
// tic-tac-toe.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {

  constructor() { }
}

```
TicTacToeComponent - instead of doing the fancy sizing from previous iterations, we're just going to use some more advanced CSS queries instead. We will still be using the resize observers, but they will be a little less intricate than before. This component class is untouched.

## tic-tac-toe-board.component
```html
<!-- tic-tac-toe-board.component.html -->

<app-tic-tac-toe-board-grid class="boards"></app-tic-tac-toe-board-grid>
<app-tic-tac-toe-board-pieces class="boards"></app-tic-tac-toe-board-pieces>
<div class="boards game-input"></div>
```
```scss
// tic-tac-toe-board.component.scss

.boards{
  position: absolute;
  height: 100%;
  width: 100%;
}

.game-pieces{
  z-index: 0;
}

.game-grid{
  z-index: 1;
}
```
```typescript
// tic-tac-toe-board.component.ts
import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent implements OnInit {
  private _board: HTMLElement;

  constructor(private mediator: TicTacToeMediatorService) { }

  ngOnInit() {
    // Event listener for player input
    this._board = document.getElementsByClassName('game-input')[0] as HTMLElement;
    this._board.addEventListener("mousedown", this.boardActivationEventListener.bind(this), false);
  }

  boardActivationEventListener(e: MouseEvent) {
    let gridSize = this.mediator.state.value.gridSize;
    let colWidth = this._board.offsetWidth / gridSize;
    let rowHeight = this._board.offsetHeight / gridSize;
    // If the game is 'completed', reset the game
    if (this.mediator.state.value.isGameWon != 'No') {
      this.mediator.nextGame();
    }
    else {
      // Determine which cell was activated.
      let x = Math.floor(e.offsetX / colWidth);
      let y = Math.floor(e.offsetY / rowHeight);

      this.mediator.tryMove(x, y);
    }
  }
}
```
We're finally starting to stick some functionality back into this bad boy. Note how I've passed the TicTacToeMediatorService to the constructor. Reminder that this is a singleton service, so any modification to it will be received by any other component 'observing' it.

The other noteworthy thing is that we are making use of Angular's life cycle hooks - `ngOnInit()`. This hook makes sure that the browser has rendered the component before calling this method. If we were to call getElementsByClassName in the constructor, we would get a null ref in this case because that code would be called before the component had been rendered to the DOM.

## tic-tac-toe-board-grid.component
```html
<!-- tic-tac-toe-board-grid.component.html -->

<canvas class="game-grid"></canvas>
```
```scss
// tic-tac-toe-board-grid.component.scss

.game-grid{
  height: 100%;
  width: 100%;
}
```
```typescript
// tic-tac-toe-board-grid.component.scss

import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board-grid',
  templateUrl: './tic-tac-toe-board-grid.component.html',
  styleUrls: ['./tic-tac-toe-board-grid.component.scss']
})
export class TicTacToeBoardGridComponent implements OnInit {
  private _EM: number;
  private _colWidth: number;
  private _rowHeight: number;
  private _currentGridSize: number;
  private _board: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(private mediator: TicTacToeMediatorService) {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    this._currentGridSize = 1;
  }

  ngOnInit(): void {
    // Grab the HTML Elements
    this._canvas = document.getElementsByClassName('game-grid')[0] as HTMLCanvasElement;
    this._board = document.getElementsByClassName('game-board')[0] as HTMLElement;
    this._context = this._canvas.getContext('2d');

    // Updates on resize. May require polyfill
    // @ts-ignore
    const resiveObserver = new ResizeObserver(observer => {
      this.resize();
    });
    resiveObserver.observe(this._board);

    // Updates on state change
    this.mediator.state.subscribe(state => {
      if (this._currentGridSize != state.gridSize) {
        this._currentGridSize = state.gridSize;
        this.resize();
      }
    });
  }

  resize() {
    // Adjusts the internal resolution of the canvas
    this._context.canvas.width = this._context.canvas.offsetWidth;
    this._context.canvas.height = this._context.canvas.offsetHeight;

    let w = this._context.canvas.offsetWidth;
    let h = this._context.canvas.offsetHeight;

    this._colWidth = w / this._currentGridSize;
    this._rowHeight = h / this._currentGridSize;

    this.draw();
  }

  draw() {
    let w = this._context.canvas.offsetWidth;
    let h = this._context.canvas.offsetHeight;

    // Clear canvas for redrawing, and add canvas styling
    // console.log(`Grid Fill Color ${getComputedStyle(this._board).backgroundColor}`);
    this._context.fillStyle = getComputedStyle(this._board).backgroundColor;
    this._context.fillRect(0, 0, w, h);
    this._context.lineWidth = this._EM / 4;

    // Invert stroke color
    let px = this._context.getImageData(0, 0, 1, 1);
    let r = px.data[0], g = px.data[1], b = px.data[2];
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    let strokeColor = `rgb(${r}, ${g}, ${b})`;
    this._context.strokeStyle = strokeColor;

    // Draw column grid lines
    let numberOfCol = w / this._colWidth;
    let x = 0;
    for (let i = 0; i < numberOfCol - 1; i++) {
      x += this._colWidth;
      this._context.beginPath();
      this._context.moveTo(x, 0);
      this._context.lineTo(x, h);
      this._context.stroke();
    }

    // Draw row grid lines
    let numberOfRow = h / this._rowHeight;
    let y = 0;
    for (let i = 0; i < numberOfRow - 1; i++) {
      y += this._rowHeight;
      this._context.beginPath();
      this._context.moveTo(0, y);
      this._context.lineTo(w, y);
      this._context.stroke();
    }
  }
}
```

Ok, now we're getting into the weeds. The code is pretty straight forward and is relatively unchanged from the other versions. Again, note how I pass through the mediator singleton in the component constructor. In the ngOnInit life cycle hook I also subscribe to the mediators state to receive updates. You can see the benefits of mediator state's BehaviorSubject, that when subscribed it will always emit its current state immediately - crucial for initializing the component by calling the resize function.

## tic-tac-toe-board-pieces.component
```html
<!-- tic-tac-toe-board-pieces.component.html -->

<canvas class="game-pieces"></canvas>
```
```scss
// tic-tac-toe-pieces.component.scss

.game-pieces{
  width: 100%;
  height: 100%;
}
```
```typescript
// tic-tac-toe-board-pieces.component.ts

import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { GamesMediatorService } from 'src/app/games/games-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board-pieces',
  templateUrl: './tic-tac-toe-board-pieces.component.html',
  styleUrls: ['./tic-tac-toe-board-pieces.component.scss']
})
export class TicTacToeBoardPiecesComponent implements OnInit {

  // Measurement variables
  private _EM: number;
  private _colWidth: number;
  private _rowHeight: number;
  private _currentGridSize: number;

  // HTML Elements
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _historyLength: number = 0;

  // Animation variables
  private _animationDuration = 240;

  constructor(private gamesMediator: GamesMediatorService, private mediator: TicTacToeMediatorService) {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    this._currentGridSize = mediator.state.value.gridSize;
  }

  ngOnInit(): void {
    // Grab the HTML Elements
    this._canvas = document.getElementsByClassName('game-pieces')[0] as HTMLCanvasElement;

    // Adjust context
    this._context = this._canvas.getContext('2d');
    this._context.imageSmoothingEnabled = true;
    this._context.imageSmoothingQuality = 'high';

    // Updates on resize. May require polyfill
    // @ts-ignore
    const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.resize();
    });
    resize.observe(this._canvas);

    // Updates on state change
    this.mediator.state.subscribe(state => {
      // Case 0 - Grid Resize
      if (this._currentGridSize != state.gridSize) {
        this._currentGridSize = state.gridSize;
        this.resize();
      }
      // Case 1 - New Game / Clear Board
      else if (state.gameTurn == 0) {
        this._historyLength = 0;
        this.clear();
      }

      // Case 2 & 3 - Game Has Ended
      if (state.isGameWon != 'No') {
        this.redraw();
      }

      // Case 4 - A new move has been played
      if (this._historyLength != this.mediator.moveHistory.length) {
        this._historyLength = this.mediator.moveHistory.length;
        if (this._historyLength != 0) {
          let cell = this.mediator.moveHistory[this.mediator.moveHistory.length - 1];
          this.animate(cell.x, cell.y, 0, this.gamesMediator.frequency / this._animationDuration, this.gamesMediator.frequency);
        }
      }
    });
  }

  resize() {
    // Adjusts the internal resolution of the canvas
    this._context.canvas.width = this._context.canvas.offsetWidth;
    this._context.canvas.height = this._context.canvas.offsetHeight;

    let w = this._context.canvas.offsetWidth;
    let h = this._context.canvas.offsetHeight;

    this._colWidth = w / this._currentGridSize;
    this._rowHeight = h / this._currentGridSize;

    this.redraw();
  }

  private animate(x: number, y: number, percent: number, changeInPercent: number, frequency: number) {
    // Animations Enabled
    percent = this.gamesMediator.isAnimationEnabled ? percent : 1;

    // Prevents going over '100%' and over drawing our piece
    percent = percent > 1 ? 1 : percent;

    let cell = this.mediator.state.value.board[x][y];

    // If the cell is empty, or invalidated since last draw - don't draw
    if (cell == null || cell.contains == 0) return;

    // Sets up context for drawing
    this._context.lineWidth = this._EM;
    this._context.lineCap = 'round';
    this._context.strokeStyle = this.mediator.strokePrimaryColor;
    this._context.beginPath();

    // Draw X
    if (cell.contains == 1) {
      // These percent ensure the lines alternate
      let percent1 = percent <= 0.5 ? percent * 2 : 1;
      let percent2 = percent >= 0.5 ? (percent - 0.5) * 2 : 0;

      // Positioning of the lines
      let startX = (x * this._colWidth) + this._EM;
      let startY = (y * this._rowHeight) + this._EM;
      let endX = ((x + 1) * this._colWidth) - this._EM;
      let endY = ((y + 1) * this._rowHeight) - this._EM;
      let xDiff = (endX - startX) * percent1;
      let yDiff = (endY - startY) * percent1;
      let xDiff2 = (endX - startX) * percent2;
      let yDiff2 = (endY - startY) * percent2;

      // Draw first line
      if (percent1 > 0) {
        this._context.moveTo(startX, startY);
        this._context.lineTo(startX + xDiff, startY + yDiff);
      }
      // Draw second line
      if (percent2 > 0) {
        this._context.moveTo(endX, startY);
        this._context.lineTo(endX - xDiff2, startY + yDiff2);
      }
    }
    // Draw O
    else if (cell.contains == 2) {
      // Simply draw an arc
      let minX = x * this._colWidth;
      let minY = y * this._rowHeight;
      let maxX = (x + 1) * this._colWidth;
      let maxY = (y + 1) * this._rowHeight;
      let radius = (maxX - minX - (this._EM * 2)) / 2;
      let centerX = maxX - ((maxX - minX) / 2);
      let centerY = maxY - ((maxY - minY) / 2);
      let startAngle = (3 * Math.PI) / 2;
      let endAngle = (((3 * Math.PI) / 2) + (2 * Math.PI) * percent);
      this._context.arc(centerX, centerY, radius, startAngle, endAngle);
    }

    // Set Color and Stroke Path
    if (cell.winner === true) {
      this._context.strokeStyle = this.mediator.strokeWinColor;
      this._context.stroke();
      this._context.strokeStyle = this.mediator.strokePrimaryColor;
    }
    else if (this.mediator.state.value.isGameWon == 'Tied') {
      this._context.strokeStyle = this.mediator.strokeTieColor;
      this._context.stroke();
      this._context.strokeStyle = this.mediator.strokePrimaryColor;
    }
    else {
      this._context.stroke();
    }

    if (percent < 1) {
      setTimeout(() => {
        this.animate(x, y, percent + changeInPercent, this.gamesMediator.frequency / this._animationDuration, this.gamesMediator.frequency);
      }, frequency);
    }
  }

  clear() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  redraw() {
    // Clears the pieces canvas for redraw
    this.clear();

    // Configs animate to instantly draw each piece
    for (let i = 0; i < this.mediator.moveHistory.length; i++) {
      let cell = this.mediator.moveHistory[i];
      this.animate(cell.x, cell.y, 1, 0, 0);
    }
  }
}
```

Ok, this one is quite a lot to digest. I commented it as clearly as I could, so it shouldn't be too bad. The major things I wanted to highlight were:

- That we use the GamesMediator animation variables to control tick rates for our setTimeout intervals. This can streamline how many draw calls we make, and allows us to make 'smooth' animations, or none at all if the user chooses.
- We only draw the specific 'pieces' of the canvas that is actually required. This is instead of redrawing the entire canvas every single time a state change happens. This drastically increases draw speeds.
- We track a move history to keep animations active. (In retrospect this might be a neat feature to 'replay' games. Maybe on another iteration ...)

Beyond that it's just a bunch of math to get everything drawing correctly.

<small><em>Note: (We'll do the settings components last, as they are a little more complicated.)</em></small>

## tic-tac-toe-turn-indicator.component
```html
<!-- tic-tac-toe-turn-indicator.component.html -->
<label class="p1 player-label">
  {{p1Name}}
</label>
<label class="p2 player-label">
  {{p2Name}}
</label>
<div class="turn-indicator mat-app-background">
</div>
```
```scss
// tic-tac-toe-turn-indicator.component.scss

.turn-indicator{
  position: relative;
  width: 1.5em;
  height: 1.5em;
  border-radius: 1em;
  position: absolute;
  left: calc(50% - 0.75em);
  z-index: 1;
  transition: left ease 0.5s, width ease 0.25s;
  filter: invert(100%);
}

.player-label{
  padding: 0 1em 0 1em;
  font-family: 'Roboto Mono', monospace;
  z-index: 2;
  font-weight: bold;
  mix-blend-mode: difference;
}
```

## tic-tac-toe-settings.component
```html
<!-- tic-tac-toe-settings.component.html -->

<button mat-stroked-button (click)='this.mediator.nextGame()'>Next Game</button>
<button mat-icon-button (click)='openDialog()'>
  <mat-icon>settings</mat-icon>
</button>
```
```scss
// tic-tac-toe-settings.component.scss
// EMPTY
```
```typescript
// tic-tac-toe-settings.component.ts

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { TicTacToeSettingsMenuComponent } from '../tic-tac-toe-settings-menu/tic-tac-toe-settings-menu.component';

@Component({
  selector: 'app-tic-tac-toe-settings',
  templateUrl: './tic-tac-toe-settings.component.html',
  styleUrls: ['./tic-tac-toe-settings.component.scss']
})
export class TicTacToeSettingsComponent {

  constructor(public mediator: TicTacToeMediatorService, public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(TicTacToeSettingsMenuComponent);
  }
}
```

So this one is super simple. It's just used to either call 'NextGame' or open the settings menu via a material dialog.

The settings menu however ... That's a little more complex.

## tic-tac-toe-settings-menu.component
```html
<!-- tic-tac-toe-settings-menu.component.html -->

<div class="settings-menu">

  <div class="settings-header">
    <div class="settings-label">
      <mat-icon>settings</mat-icon>
      <span>
        Settings
      </span>
    </div>
    <button mat-mini-fab [mat-dialog-close] cdkFocusInitial color="primary">
      <mat-icon>close</mat-icon>
    </button>
  </div>

  <mat-dialog-content class="settings-content">

    <mat-divider class="divider"></mat-divider>

    <mat-slide-toggle class="example-margin" color="primary" [(ngModel)]="gamesMediator.isAnimationEnabled">
      Enable Animations
    </mat-slide-toggle>

    <br>
    <br>

    <mat-slide-toggle class="example-margin" color="primary" [disabled]="!gamesMediator.isAnimationEnabled"
      [(ngModel)]="gamesMediator.useSmoothAnimation">
      Use Smooth Animations
    </mat-slide-toggle>

    <mat-divider class="divider"></mat-divider>

    <div class="settings-grid-slider-container">
      <label>Grid Size</label>
      <mat-slider [max]="10" [min]="3" [step]="1" [thumbLabel]="true" [tickInterval]="1" [(ngModel)]="gridSize"
        [vertical]="false" color="primary" class="settings-grid-slider">
      </mat-slider>
      <label><small><em>Changing grid size resets the game</em></small></label>
    </div>

    <mat-divider class="divider"></mat-divider>

    <label id="example-radio-group-label">Select AI difficulty</label>
    <mat-radio-group class="difficulty-radio-group" [(ngModel)]="difficulty">
      <mat-radio-button class="difficulty-radio-button" *ngFor="let diff of difficulties" [value]="diff"
        color="primary">
        {{diff}}
      </mat-radio-button>
    </mat-radio-group>

    <mat-divider class="divider"></mat-divider>

  </mat-dialog-content>
</div>
```
```scss
// tic-tac-toe-settings-menu.component.scss

.settings-menu{
  min-width: 300px;
  margin: 0;
  padding: 0;
}

.settings-header{
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-label{
  display: flex;
  align-items: center;
  font-size: 1.75rem;
}

.settings-content{
  padding: 0em 2em 0em 2em;
}

.divider{
  margin: 1em 0 1em 0;
}

.settings-grid-slider-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.settings-grid-slider{
  width: 100%;
}

.difficulty-radio-group {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}

.difficulty-radio-button{
  margin: 0.5em 1em 0.5em 0;
}
```
```typescript
// tic-tac-toe-settings-menu.component.ts

import { Component, Input } from '@angular/core';
import { AiDifficulty } from '../tic-tac-toe-model.service';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { GamesMediatorService } from 'src/app/games/games-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-settings-menu',
  templateUrl: './tic-tac-toe-settings-menu.component.html',
  styleUrls: ['./tic-tac-toe-settings-menu.component.scss']
})
export class TicTacToeSettingsMenuComponent {

  private _gridSize: number = 3;
  get gridSize(): number {
    return this._gridSize;
  }
  @Input() set gridSize(value: number) {
    if (this._gridSize != value) {
      this._gridSize = value;
      this.ticTacToeMediator.changeGridSize(value);
    }
  }

  difficulties: AiDifficulty[] = ['Solo', 'Easy', 'Medium', 'Hard', 'Impossible'];
  private _difficulty: AiDifficulty;
  get difficulty(): AiDifficulty {
    return this._difficulty;
  }
  @Input() set difficulty(value: AiDifficulty) {
    if (this._difficulty != value) {
      this._difficulty = value;
      this.ticTacToeMediator.changeDifficulty(value);
    }
  }

  constructor(public gamesMediator: GamesMediatorService, public ticTacToeMediator: TicTacToeMediatorService) {
    this._difficulty = ticTacToeMediator.state.value.difficulty;
    this._gridSize = ticTacToeMediator.state.value.gridSize;
  }
}

```

This component has a lot of controls going on when compared to the other components. Let's take a look at it:

<p align="center">
  <img src="https://kdill.ca/wp-content/uploads/2020/05/tictactoe-v3-5.jpg" style="max-height: 480px; max-width: 100%;"></img>
</p>

Again, I'd like to remind anyone who's made reading it this far that this is **NOT** a tutorial. So I will not be going into super detail on the specifics of how Angular works. That said, here is a brief overview:

- Close Button - Straight forward. It closes the settings menu dialog
- Animations Controls - This Binds to the GamesMediator.
- Grid Size Slider - Adjusts the grid size for the game. Binds to the TicTacToeMediator.
- AI Difficulty radio group - We've included it as a precursor to the next iteration. It doesn't do anything yet other than bind to the TicTacToeMediator.

We can see now though the power of Angular. In combination with RxJS observables, we can utilize Angular's component bindings to immediately update every aspect of our application. When we include the power of UI frameworks, like Material, we can create beautiful applications with seemingly little effort.

# Serve it up!

Let's see if it works.

`ng serve`

✨✨✨It works a third time!✨✨✨

Have an embedded iframe. If that doesn’t work go try it out at [here](https://kdill.ca/examples/TicTacToe/v3/).

<center>
<iframe src="https://kdill.ca/examples/TicTacToe/v3/" width="100%" height="540px" scrolling="yes"></iframe>
</center>

# Final Thoughts

There's still a lot of work left to do. We've added in a navigation menu and a profile button, but we currently have no use for them. We'll come back to those at a later iteration.

There is some general polish issues too. I had started with the concept of having the game support ANY theme by inverting colors. I ran into some issues with that though. The plan is to have multiple theme options for the user, but that didn't make the cut for this iteration yet. I'll revisit it at a later iteration where I will expand on Material themeing and deal fix it up then.

On top of that, when we resize the grid we don't adjust the stroke width. It's not a huge deal, but on a small screen with large grid it can cause problems where the pieces are barely legible. I'll have to rethink that approach a little bit for future iterations.

In addition we've added in much of the skeleton for AI to play against, but have not implemented any yet. That's up next.

Lastly, because this is essentially unfinished, I will not be doing any testing for this iteration. I did not run into any bugs as of yet, so that's good. I do expect there will be issues due to ResizeObserver, as was mentioned in v2. Further testing will be done on later iterations. This is good for now.

Be sure to check out the source at [GitHub](https://github.com/DillK/TicTacToe).

Read more posts like this on [kdill.ca](https://kdill.ca)

Thanks for reading!

Kev

# MIT License
>Copyright © 2020 Kevin Dill, kdill.ca
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.