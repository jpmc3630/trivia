

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

        

        
        // let currentQ = 0;

        // Give 10 seconds 
        let clock = setInterval(timedFunction, 1000);
        let time = 9;
        i = 0;
        
       
       

        function timedFunction (){

            $('#question-div').html(Q[i].question);
            if (time > -1) {
            $('#timer-div').html('00:0' + time);
            };
            time--;
            
            if (time < 0) {
                //load next question!
                
                $('footer').text('You are out of time! Next Question in ' + (time+4) +  ' seconds ...');
                
                if (time < -3) {
                    $('footer').text('');
                    i++
                    $('#question-div').html(Q[i].question);
                    time = 9;
                    $('#timer-div').html('00:10');
                }
            };
        };

    };

});