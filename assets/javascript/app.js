
//global variables

let Q;
let qTime = 5;
let waitTime = 3;

let qCount = 0;
let timeoutTally = 0;
let correctTally = 0;
let incorrectTally = 0;

let qClock;
let wait;


let waitScreenText = "";



//doc ready
$( document ).ready(function() {
    

    function restart() {

            // grab questions from API
    $.ajax({
        url: `https://opentdb.com/api.php?amount=10&type=multiple`,
        method: "GET"
    }).then(function(response){
        
        Q = response.results;

        Game();
        
    });

    };
    
    
    
    function shuffleAnswers() {

        //shuffle correct answer into incorrect ones
        let answerList = [];

        answerList = Q[qCount].incorrect_answers;
        randomNumber = (Math.floor(Math.random() * answerList.length ));
        answerList.splice(randomNumber, 0, Q[qCount].correct_answer);
        console.log(answerList);
        //append answers as buttons
        $('#answers-div').html('');

        for (let j = 0; j < answerList.length; j++) {
          let newButton=$('<button>');
            newButton.addClass('answer-button btn btn-info btn-sm');
            newButton.html(answerList[j]);
          $('#answers-div').append(newButton);
        };        
   };


   // on click for ANSWER buttons
    $('body').on ("click", ".answer-button", function() {
    
        if ($(this).text() == Q[qCount].correct_answer) {
            clearInterval(qClock);
            correctTally++;
            waitTime = 3;
            waitScreenText =  "You are correct!";
            wait = setInterval(waitTimeFunction, 1000);

        } else {
            clearInterval(qClock);
            incorrectTally++;
            waitTime = 3;
            waitScreenText =  "You are incorrect!";
            wait = setInterval(waitTimeFunction, 1000);
        };
    });

    // on click for PLAY AGAIN button
    $('body').on ("click", ".restart-button", function() {
        
        restart();
        $('#results-screen').css('display', 'none');
    });


    


    // (re)start game function
    function Game(){
   

        qTime = 5;
        waitTime = 3;
        qCount = 0;

        timeoutTally = 0;
        correctTally = 0;
        incorrectTally = 0;
        answerList = [];
        waitScreenText = "";

        shuffleAnswers();
        $('#question-div').html(Q[qCount].question);

        qClock = setInterval(qTimeFunction, 1000);
        

        
       



    };


    function qTimeFunction (){
            
        console.log('qTime: ' + qTime);
        if (qTime > 0) {
            qTime--;
            $('#timer-div').html('00:0' + qTime);
        } else {
            clearInterval(qClock);
            timeoutTally++;
            waitTime = 3;
            waitScreenText =  "You have timed out!";
            wait = setInterval(waitTimeFunction, 1000);
            
            // $('footer').text('You are out of time! Next Question in ' + (waitTime+1) +  ' seconds ...');
        };
        
    };


    //wait screen - correct, incorrect or timed out

    function waitTimeFunction() {
        
        console.log(waitTime);

        $('#wait-screen').html(`
        <br><b>${waitScreenText}</b>
        <br>
        <br>The answer was
        <br>
        <br>${Q[qCount].correct_answer}
        <br>
        <br> Next Question in <b>${waitTime}</b> seconds ...
        `);

        
        $('#wait-screen').css('display', 'block');
        waitTime--;

        if (waitTime < 0) {
            
            nextQuestion(); 
            
            clearInterval(wait);
            $('#wait-screen').css('display', 'none');
        };
    };

    function nextQuestion() {
        // if qCount < number of questions, then next question ELSE results screen function...
        
        if (qCount < Q.length-1) {

            qCount++
            $('#question-div').html(Q[qCount].question);
            shuffleAnswers();
            
            
            qTime = 5;
            $('#timer-div').html('00:0' + qTime);
            
            qClock = setInterval (qTimeFunction, 1000);

        } else {
            
            resultsScreen();

        };
    };

    function resultsScreen() {

        $('#results-screen').html(`
        <br>Quiz Complete!
        <br>You Scored:
        <br>Correct: ${correctTally}
        <br>Incorrect: ${incorrectTally}
        <br>Timeouts: ${timeoutTally}
        <br>
        <button class="restart-button btn-info btn-sm">Play Again</button>
        `);
        
        $('#results-screen').css('display', 'block');



    };




});