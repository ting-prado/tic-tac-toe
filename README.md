# Tic-Tac-Toe

## Introduction
This project is a classic game of tic-tac-toe where there are two players, X and O, will take turns in filling a 3x3 gameboard. The first one to fill 3 grids in a row, horizontally, vertically, or diagonally, with its respective sign wins.

## Goals and Objectives

* Create a 3x3 grid that will serve as the gameboard
* If there are two players playing against each other, allow them to enter their names before the game
* If there is only one player, the computer will play against the player
* Use factory functions and IIFE to create the players, game mechanics, and gameboard

## How It Works

The user(s) will be greeted with an interface where they can choose whether to play with an AI, or against each other. After choosing the game mode, they can enter their names. The first player will be assigned an 'X' sign while the second one is 'O'. The game ends when an 'X' or an 'O' is filled 3 times horizontally, vertically, and diagonally.

### vs. AI
The player will play against an AI that chooses a random grid to fill. After the player chooses a grid to write in, the AI takes 1 second to take its turn.

### 2 players
Player one that is assigned as 'X' will go first. After the first player clicks a grid, the sign will change into 'O' to allow the second player to play, and will change back into 'X' after its turn.

## Skills Emphasized in this Project:

* DOM Manipulation
* Click event listeners
* Factory Functions
* Immediately Invoked Function Expressions
* Closures and Scopes
* Loops
* Objects
* Arrays

## Thoughts after Completion:

I wasn't able to work on this project continuously and got lost for a while when I came back to it. This was a very challenging project specially when it came to the AI part. Supposedly the Minimax Algorithm should be applied for a smart AI to play with, but there are a lot of things that I should understand to accomplish it. I'll come back to this project in the future and work on the algorithm.