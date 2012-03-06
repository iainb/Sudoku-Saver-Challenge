Sudoku Saver Challenge: How much can you compress a saved sudoku game?
======================================================================

Introduction
-------------
The aim of this puzzle is to save a Sudoku puzzle and a partially
completed solution created by a user into the smallest space possible. I started
experimenting with this when making a javascript sudoku solver, the idea being that 
the saved game could be stored after the anchor tag in a url. That way the game
state can easily be saved, reloaded and shared without any backend infrastucture. 

For example the url might look like:
sudoku.solver.com/play#your_saved_game_string

Or for a real world example:

<pre>
sudoku.solver.com/play#37065000070000700200000040910070089500000030000008270040056090000007008000020000190065000070000760254000040910070089500000530000008270040056190000097308000020000190
</pre>

Uncompressed this would take 162 characters, two copies of the grid, one containing
the original puzzle and one containing the board with the users changes. In todays world of url shorteners this looks really clunky.

It should be possible to shrink the size down, a simple run length encoder (simple_runlength.js) reduces 
the average puzzle size (based on the test puzzles) to about 71% of an uncompressed save game. 

<pre>
sudoku.solver.com/play#30A65D7D7B2F4A91B7B895F3F827B4B56A9F7B8D2D19AA65D7D76A254D4A91B7B895E53F827B4B5619E973A8D2D19A
</pre>

It should be possible to make it smaller, right?

How to play
------------
Fork the repository, load up the index.html file in your browser and you'll
see the status of the current Saver / Loaders and which one is best.

Take a look at how the basic.js Basic Saver/Loader works, if you want to make 
your own then take the following steps:

* Copy the skeleton.js Saver/Loader
* Change the name and assign it to a different attribute of the 'SL' object.
* Edit index.html to load your javascript file
* Write your own versions of the Save and Load functions
* Keep reloading the index page to track your progress and verify that the output is valid

Save Function
--------------
The Save function takes an single argument which is an object, this object has two
attributes base and partial. Base is an array of 81 elements containing the base 
puzzle, partial is an array of 81 elements containing the users partially completed grid.

It should return a single string which represents your saved puzzle.

Load Function
--------------
The Load function should take your saved string and convert it back into the object
which was passed into the save function.
