

let Q;
let qTime = 5;
let waitTime = 3;
let qCount = 0;
let qClock;
let wait;

//doc ready
$( document ).ready(function() {
    

    // grab questions from API
    $.ajax({
        url: `https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple`,
        method: "GET"
    }).then(function(response){
        

        Q = response.results;

        console.log(Q);

        Begin();
        
    });
    

    let answerList = [];
    
    function shuffleAnswers() {
        
        answerList = Q[qCount].incorrect_answers;
        console.log (answerList);
           
        randomNumber = (Math.floor(Math.random() * answerList.length ));
        console.log(randomNumber);

        answerList.splice(randomNumber, 0, Q[qCount].correct_answer);
        console.log(answerList);



        $('#answers-div').html('');

        for (let j = 0; j < answerList.length; j++) {

          let newButton=$('<button class="answer-button btn btn-info btn-sm">');
            newButton.text(answerList[j]);
          $('#answers-div').append(newButton);
        };        
 

   };

    $('body').on ("click", ".answer-button", function() {
    
        if ($(this).text() == Q[qCount].correct_answer) {
            alert('correct');
        } else {
            alert('incorrect');
        };

    });



    //Begin
    function Begin(){

        
        qTime = 5;
        waitTime = 3;
        qCount = 0;
        

        // Give 10 seconds 
        let qClock = setInterval(qTimeFunction, 1000);

        
        $('#question-div').html(Q[qCount].question);
        shuffleAnswers(qCount);

       
       

        function qTimeFunction (){

            
            console.log('qTime: ' + qTime);
            if (qTime > 0) {
                qTime--;
                $('#timer-div').html('00:0' + qTime);
            } else {
                clearInterval(qClock);
                waitTime = 3;
                wait = setInterval(waitTimeFunction, 1000);
                $('footer').text('You are out of time! Next Question in ' + waitTime +  ' seconds ...');
            };
            
            
            

        };


        function waitTimeFunction (){
            
            console.log('waitTime: ' + waitTime);
            $('footer').text('You are out of time! Next Question in ' + waitTime +  ' seconds ...');

            waitTime--;

            if (waitTime < 0) {
                qCount++
                $('#question-div').html(Q[qCount].question);
                shuffleAnswers();
                $('footer').text('');
                
                qTime = 5;
                $('#timer-div').html('00:0' + qTime);
                clearInterval(wait);
                qClock = setInterval (qTimeFunction, 1000);
            }
            

        }

    };

});