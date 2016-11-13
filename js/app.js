//trivia questions array
var triviaGame = {

 questions : [
	{
		"question" : "When was UT founded?",
		"correct_answer" : "1883",
		"incorrect_answers" : [
			"1877",
			"1872",
			"1900"
			]
	},
	{
		"question" : "What is UT's school song called?",
		"correct_answer" : "Texas Fight",
		"incorrect_answers" : [
			"Longhorns Forever",
			"Texas on Top",
			"The Spirit of Texas"
			]
	},
	{
		"question" : "UT's mascot is named ___________.",
		"correct_answer" : "Bevo",
		"incorrect_answers" : [
			"Big Boy",
			"Sir Charles",
			"Hook 'Em Harry"
			]
	},
	{
		"question" : "The First Woman To Earn A PhD From UT Did So in What Year?",
		"correct_answer" : "1916",
		"incorrect_answers" : [
			"1928",
			"1935",
			"1947"
			]
	},
	{
		"question" : "Which of the following people is NOT a former UT student?",
		"correct_answer" : "Steve Garvey",
		"incorrect_answers" : [
			"Janis Joplin",
			"Kevin Durant",
			"Matthew McConaughey"
			]
	},
	{
		"question" : "How many students did UT enroll in its first year?",
		"correct_answer" : "221",
		"incorrect_answers" : [
			"1106",
			"637",
			"1739"
			]
	},
	{
		"question" : "Approximately How Many Total Students Are Currently Enrolled at UT?",
		"correct_answer" : "50,000",
		"incorrect_answers" : [
			"37,000",
			"62,000",
			"33,000"
			]
	},
	{
		"question" : "How Many Museums Are Housed On UT's Campus?",
		"correct_answer" : "7",
		"incorrect_answers" : [
			"3",
			"9",
			"5"
			]
	},
	{
		"question" : "UT's Athletics Program Has Won ___ National Championships",
		"correct_answer" : "52",
		"incorrect_answers" : [
			"43",
			"60",
			"77"
			]
	}, 
	{
		"question" : "Prior To Its Current Mascot, UT's Mascot was a __________.",
		"correct_answer" : "Dog",
		"incorrect_answers" : [
			"Falcon",
			"Goat",
			"Eagle"
			]
	}],
	wait5 : function(){ // time between questions
		waiting = setInterval(function(){
			console.log(triviaGame.waitTime);
			console.log(this);
			triviaGame.waitTime--;
			if (triviaGame.waitTime < 0){
				clearInterval(waiting);
				triviaGame.displayQuestion();
				triviaGame.waitTime = 5;
			}
		}, 500);
	},
	wait15 : function(){ // timer
		timeCount = setInterval(function(){
			$('#timer').html("Time Remaining: " + triviaGame.timer);
			triviaGame.timer--;

			if (triviaGame.timer < 0){
				clearInterval(timeCount);
				$('.incorrect').prepend('<i class="glyphicon glyphicon-remove"></i>');
				$('#correct').prepend('<i class="glyphicon glyphicon-ok"</i>');
				$('<h3 class="outcome">Time Has Expired</h3>').insertAfter('#choices');
				$('.choice-item').removeClass('unclicked');
				triviaGame.timer = 15;
				triviaGame.wait5();
			}
		}, 1000);
	},
	reset : function(){ // game reset
		triviaGame.questionCounter = 1;
		triviaGame.indexCounter = 0;
		triviaGame.correct = 0;
		triviaGame.displayQuestion();
	},
	displayQuestion : function(){ // display questions and process user answers 
		
		if ( triviaGame.questionCounter <= triviaGame.questions.length ){ // new questions via array above
			var randomChild = Math.floor((Math.random()*3)+1),
				question = triviaGame.questions[triviaGame.indexCounter].question,
		        correctAnswer = triviaGame.questions[triviaGame.indexCounter].correct_answer,
		        incorrectArray = triviaGame.questions[triviaGame.indexCounter].incorrect_answers;
			triviaGame.wait15();
			$('#timer').html("Time Left: 15");
			$('#content-area').html('<h2 id="questionCount">Question #' + triviaGame.questionCounter +
								    '</h2>' + '<h3 id="question">' + question + '</h3>' +
									'<section class="row row-centered">'+ 
									'<section class="col-md-6"><ul id="choices"></ul>'+
									'</section></section>');
			for (var i=0; i<incorrectArray.length; i++){
				$('#choices').append('<li class="choice-item incorrect unclicked">' + incorrectArray[i] + '</li>');
			}
			$('<li id="correct" class="choice-item unclicked">' + correctAnswer + '</li>').insertAfter('.choice-item:nth-child('+randomChild+')');

			triviaGame.indexCounter++;
			triviaGame.questionCounter++;

			// click event for user answer choices
			$('.choice-item').click(function(){
				clearInterval(timeCount);
				triviaGame.timer = 15;
				if ($(this).hasClass('incorrect') && $(this).hasClass('unclicked')){
					$('.incorrect').prepend('<i class="glyphicon glyphicon-remove"></i>');
					$('#correct').prepend('<i class="glyphicon glyphicon-ok"</i>');
					$('<h3 class="outcome">Incorrect!</h3>').insertAfter('#choices');
					$('.choice-item').removeClass('unclicked');
					triviaGame.wait5();	
				}
				else if (!($(this).hasClass('incorrect')) && $(this).hasClass('unclicked')){
					$('#correct').prepend('<i class="glyphicon glyphicon-ok"</i>');
					$('<h3 id="right" class="outcome">Great Job!</h3>').insertAfter('#choices');
					$('.choice-item').removeClass('unclicked');
					triviaGame.correct++;
					triviaGame.wait5();
				}
			});
		}
		// when all questions are answered, display player's score
		else{
			$('#content-area').empty();
			$('#timer').empty();
			$('#content-area').html('<h2 id="score">You got ' 
									+ triviaGame.correct + ' out of 10</h2>' +
									'<h4 id="score-message"></h4>');
			
			triviaGame.correct <= 4 ? $('#score-message').append('Maybe Try Again?') : 
			triviaGame.correct <= 7 ? $('#score-message').append('Not Too Shabby!') :
			triviaGame.correct <= 9 ? $('#score-message').append('AWESOME!!!') : 
			$('#score-message').append('PERFECT SCORE!!!');
			$('#content-area').append('<button id="reset" class="btn btn-primary">Start Over?</button>');
			$('#reset').click(triviaGame.reset);
			
		}
	},
	indexCounter : 0,
	questionCounter : 1,
	waitTime : 5,
	timer : 15,
	correct : 0
}

// Start the game
$('#start-button').click(triviaGame.displayQuestion);




