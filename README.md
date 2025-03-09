Abstract:

This is a basic math flash card app with a timed element.  The purpose of this 
app is to create a tool to allow me to help my daugter memorize basic 
arithmetic so she doesn't spend so much time thinking about it in school.

Usage Synopsis:

The user is presented with a menu.  There are buttons that allow the user to
select what kinds of basic arithmetic problems will be generated.  The user
will also be able to specify how many correct answers are required to end the
game session (the lower bound), and how many total questions end the session
(the upper bound).  The user will also be able to specify the number of
seconds Abby has to provide an answer.  Finally, a button at the bottom starts
the game.

When the game is started, the user is presented with a view:

  * Correct answers
  * Total questions
  * Current question (with answer)
  * Time remaining on current question.

A random question (based on selections made in the menu) is produced and
presented in the `Current question` space, the "Total questions" value is
incremented, and the timer is started.

If Abby produces the correct answer before time runs out, the user is to tap
the screen.  This will stop the timer, and log a correct answer.  The display 
of `Correct answers` is updated, and a new question is generated.  The timer
is restarted.

If Abby does not produce the correct answer before the timer runs out, the
view will indicate that time is up.  The user is to provide Abby with the
answer, and then tap the screen.  When the user taps the screen, a new
question is generated, but the `Correct answers` count is not updated.  The
timer is restarted.

Idea: Incorrect questions should be stored, and re-presented after 3-5
new questions, to re-enforce memory recollection.