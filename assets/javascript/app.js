

let Q;

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
    
    //Begin
    function Begin(){

        //Load Question 1
        for (let i = 0; i < Q.length; i++) {
        // let currentQ = 0;
        $("#question-div").html(Q[i].question);

        // Give 10 seconds 
        let clock = setInterval(timedFunction, 1000);
        let time = 9;
        
        
        function timedFunction (){
            
            $('#timer-div').html('00:0' + time);
            time--;
            
            if (time < 0) {
                clearInterval(clock);
                $('footer').text('You are out of time!');
            };
        };

    }
    
        //Wait for user input

    };

});