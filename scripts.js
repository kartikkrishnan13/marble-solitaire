$(document).ready(function() {
  var sr = 0;
  var sc = 0;
  var score = 0;
  var timeTaken = 0;
  var seconds = 0;
  var minutes = 0;
  var marblesLeft = 32;
  var x = "";
  $('#score-value').text(score);
  $('#time-value').text(minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0));
  $('#marbles-left-value').text(marblesLeft);
  $('#board').hide();
  $('#final-score').hide();
  $('.place:not(".blank")').html('<img src="marble.png" class="marble">');
  $('.place.blank').html('<img src="blank.png" class="marble">');

  $('#start').click(function() {
    $('#instructions').hide();
    $('#board').show();
    x = setInterval(function() {
      seconds = timeTaken%60;
      minutes = Math.floor(timeTaken/60);
      $('#time-value').text(minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0));
      timeTaken++;
    }, 1000);
  });

  $('#stop').click(function() {
    clearInterval(x);
    var result = "";
    if (marblesLeft == 1) {
      result = "YOU ARE A GENIUS!!!";
    }
    else if (marblesLeft == 2) {
      result = "YOU ARE VERY INTELLIGENT!!";
    }
    else if (marblesLeft == 3) {
      result = "YOU ARE INTELLIGENT!";
    }
    else if (marblesLeft >= 4) {
      result = "YOU NEED MORE PRACTICE...";
    }
    $('#final-score').text(result);
    $('#final-score').show();
    $('.place').css('pointer-events', 'none');
  });

  $('#board').on('click', '.place:not(".blank")', function() {
    sr = Number(this.id[2]);
    sc = Number(this.id[4]);
    $('.place').css('background-color', 'skyblue');
    $(this).css('background-color', 'fuchsia');
  });

  $('#board').on('click', '.place.blank', function() {
    var flag = 0;
    br = Number(this.id[2]);
    bc = Number(this.id[4]);
    $('.place').css('background-color', 'skyblue');
    if(sr!=0 && sc!=0) {
      if(br==sr && bc==(sc-2) && !($(`#m-${sr}-${sc-1}`).hasClass('blank'))) {
        $(`#m-${sr}-${sc}`).addClass('blank');
        $(`#m-${sr}-${sc-1}`).addClass('blank');
        $(`#m-${br}-${bc}`).removeClass('blank');
        $(this).css('background-color', 'fuchsia');
        score += 100;
        marblesLeft -= 1;
        flag = 1;
      }
      else if(br==sr && bc==(sc+2) && !($(`#m-${sr}-${sc+1}`).hasClass('blank'))) {
        $(`#m-${sr}-${sc}`).addClass('blank');
        $(`#m-${sr}-${sc+1}`).addClass('blank');
        $(`#m-${br}-${bc}`).removeClass('blank');
        $(this).css('background-color', 'fuchsia');
        score += 100;
        marblesLeft -= 1;
        flag = 1;
      }
      else if(br==(sr-2) && bc==sc && !($(`#m-${sr-1}-${sc}`).hasClass('blank'))) {
        $(`#m-${sr}-${sc}`).addClass('blank');
        $(`#m-${sr-1}-${sc}`).addClass('blank');
        $(`#m-${br}-${bc}`).removeClass('blank');
        $(this).css('background-color', 'fuchsia');
        score += 100;
        marblesLeft -= 1;
        flag = 1;
      }
      else if(br==(sr+2) && bc==sc && !($(`#m-${sr+1}-${sc}`).hasClass('blank'))) {
        $(`#m-${sr}-${sc}`).addClass('blank');
        $(`#m-${sr+1}-${sc}`).addClass('blank');
        $(`#m-${br}-${bc}`).removeClass('blank');
        $(this).css('background-color', 'fuchsia');
        score += 100;
        marblesLeft -= 1;
        flag = 1;
      }
      else {
        $(this).css('background-color', 'red');
      }
      if (flag == 1) {
        $('.place:not(".blank")').html('<img src="marble.png" class="marble">');
        $('.place.blank').html('<img src="blank.png" class="marble">');
        $('#score-value').text(score);
        $('#marbles-left-value').text(marblesLeft);
        $("#score, #marbles-left").addClass("attention");
        setTimeout(function() {
          $("#score, #marbles-left").removeClass("attention");
        }, 1500);
      }
    }
    else {
      $(this).css('background-color', 'red');
    }
    sr = 0;
    sc = 0;
  });
});
