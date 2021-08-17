
updatePage();

function updatePage(){
    //Set save button text 'unlock'
    //$('.saveBtn').text('\u1F513');

    var date = dayjs().format('MMMM D YYYY');
    var today = $("#today");
    today.text(date);
    //If it's a new day, delete the schedule from the previous day
    if(localStorage.today){
        if(localStorage.today != date){
            localStorage.clear;
            localStorage.setItem('today', date);
        }
    }else{
        localStorage.setItem('today', date);
    }
    var currentHour = dayjs().hour();


    $( '.eventField' ).each(function( index ) {
        var hourValue = index + 9;
        var textArea = $( this ).children().first();
        textArea.prop('id', hourValue);
    
        //Loads stored event infromation into the text area
        if(localStorage[hourValue])
        {
            textArea.val(localStorage[hourValue]);
        }

        //Sets past hours to gray, current hour to red, and future hours to green. 
        if(hourValue < currentHour){
            $( this ).css('background-color', 'gray');
        }else if( hourValue > currentHour ){
            $( this ).css('background-color', 'green');
        }else if( hourValue == currentHour ){
            $( this ).css('background-color', 'red');
        }
    });

    //Sets a timer to update again when the hour changes.
    var currentMinutes = dayjs().minute();
    var timeTillNextHour = (60 - currentMinutes)*1000;
    setTimeout( updatePage, timeTillNextHour)
}

$('.saveBtn').click( function(){
    var eventField = $(this).parent().prev().children().first();
    var hourValueOfEventField = eventField.prop('id');
    localStorage.setItem(hourValueOfEventField, eventField.val());
    $(this).children('.lockImage').attr('src', './assets/images/lock.png');
});

$('.eventField').children().keyup( function(e){
    var closestSaveBtnImg = $(this).parent().next('.save').children('.saveBtn').children('.lockImage');
    if(closestSaveBtnImg.attr('src') == './assets/images/lock.png')
    {
        closestSaveBtnImg.attr('src', './assets/images/unlock.png');
    }
});