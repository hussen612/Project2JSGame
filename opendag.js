  // Set the date we're counting down to
  var countDownDate = new Date("Jan 26, 2024 15:00:00").getTime();

  // Update the count down every 1 second
  var countdownFunction = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="countdown"
      document.getElementById("countdown").innerHTML = "De open dag begint over: " + days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text 
      if (distance < 0) {
          clearInterval(countdownFunction);
          document.getElementById("countdown").innerHTML = "De open dag is begonnen of al voorbij!";
      }
  }, 1000);