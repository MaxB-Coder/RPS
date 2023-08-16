# RPS Challenge

Instructions
-------

* Feel free to use google, your notes, books, etc. but work on your own
* If you refer to the solution of another coach or trainee, please put a link to that in your README
* If you have a partial solution, **still check in a partial solution**
* You must submit a pull request to this repo with your code by the deadline specified in Noodle

Task
----

The DFA team ( **DFAT** ) have asked you to provide a game for them. The daily grind is pretty tough and they need time to have a little fun.

As usual please start by

* Forking this repo
* TEST driving development of your app

Your task is to provide a _Rock, Paper, Scissors_ game for them so they can play on the web with the following user stories:

### Acceptance Criteria
```
As a DFAT member
So that I can see my name
I would like to register my name before playing an online game
```
- [x] Done
```
As a DFAT member
So that I can move to the game screen
I would like a 'start game' button
```
- [x] Done
```
As a DFAT member
So that I can enjoy myself away from the daily grind
I would like to be able to play rock/paper/scissors
```
- [x] Done
```
As a DFAT member
So that I can have some agency
I would like to be able to be able to select one weapon
```
- [x] Done
```
As a DFAT member
So that I can continue moving forward
I would like to be able to have a 'submit' button to end my turn
```
- [x] Done
```
As a DFAT member
So that I can see how i'm doing
I would like to see the result of the round.
```
- [x] Done
```
As a DFAT member
So that I can enjoy myself away from the daily grind
I would like the round to be a draw if the same weapon was selected for each player.
```
- [x] Done
```
As a DFAT member
So that I can continue to enjoy myself
I would like to move to the next round.
```
- [x] Done
```
As a DFAT member
So that I can get a quick fix of dopamine
I would like the game to end when a player wins 5 rounds.
```
- [x] Done
```
As a DFAT member
So that I can satisfy my competitive side
I would like the winner to be declared at the end of the game.
```
- [x] Done
```
As a DFAT member
So that I can continue to enjoy myself
I would like a 'play again' button to repeat the game.
```
- [x] Done
```
As a DFAT member
So that I can continue to enjoy myself
I would like a 'new game' button to return to the initial setup screen.
```
- [x] Done
```
As a DFAT member
So that I can enjoy spending time with my friend
I would like to be able to play we a second human player.
```
- [x] Done
```
As a DFAT member
So that I can enjoy myself further
I would like play Rock, Paper, Scissors, Spock, Lizard.
```
- [x] Done

Hints on functionality

- the DFAT member should be able to enter their name before the game
- the DFAT member will be presented the choices (rock, paper and scissors)
- the DFAT member can choose one option
- the game will choose a random option
- a winner will be declared and an option to play again

## Basic Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock

In code review we'll be hoping to see:

* All tests passing
* High test coverage
* The code is elegant: every class has a clear responsibility, methods are short etc.

### Extended Acceptance Criteria

#### Multiplayer

Change the game so that two DFAT members can play against each other ( _yes there are two of them and they'll be playing on the same computer_ ).

#### Rock, Paper, Scissors, Spock, Lizard

Use the _special_ rules ( _you can find them here http://en.wikipedia.org/wiki/Rock-paper-scissors-lizard-Spock_ )
