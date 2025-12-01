 // Insert current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll offset for fixed navbar
    $(function(){
      // smooth scroll for internal links
      $('a[href^="#"]').on('click', function(e){
        var target = $(this.getAttribute('href'));
        if( target.length ){
          e.preventDefault();
          var offset = target.offset().top - 70; // navbar height
          $('html, body').stop().animate({ scrollTop: offset }, 500);
        }
      });

      // Trial form handler (demo)
      $('#trialForm').on('submit', function(e){
        e.preventDefault();
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        if(!name || !email || !phone){
          $('#formMsg').text('Please complete all fields.').css('color','#ffb4b4').show();
          return;
        }
        $('#formMsg').text('Thanks ' + name + '! We will contact you shortly to confirm your trial.').css('color','#cfe9d1').show();
        // reset form after success (simulate)
        $(this)[0].reset();
      });

      // Subscribe form (demo)
      $('#subscribeForm').on('submit', function(e){
        e.preventDefault();
        var eaddr = $('#subEmail').val().trim();
        if(!eaddr){
          $('#subMsg').text('Enter a valid email').css('color','#ffb4b4').show();
          return;
        }
        $('#subMsg').text('Subscribed! Check your inbox for updates.').css('color','#cfe9d1').show();
        $(this)[0].reset();
      });

      // Simple gallery click -> modal preview (Bootstrap modal)
      $('.gallery img').on('click', function(){
        var src = $(this).attr('src');
        var modalHtml = '\
        <div class="modal fade" id="imgModal" tabindex="-1">\
          <div class="modal-dialog modal-dialog-centered modal-lg">\
            <div class="modal-content bg-transparent border-0">\
              <div class="modal-body p-0 text-center">\
                <img src="'+src+'" alt="preview" style="width:100%; height:auto; border-radius:12px;">\
              </div>\
            </div>\
          </div>\
        </div>';
        $('body').append(modalHtml);
        var $m = new bootstrap.Modal(document.getElementById('imgModal'));
        $m.show();
        $('#imgModal').on('hidden.bs.modal', function(){ $(this).remove(); });
      });

    });
 



  $(function(){
    // 1) Animate hero elements once page is ready
    // add classes to trigger CSS animations
    $('.hero h1').addClass('animated');
    $('.hero p.lead').addClass('animated');

    // 2) Give the primary CTA a slow idle pulse (only on non-touch devices)
    function isTouch(){ return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
    if(!isTouch()){
      // choose the first CTA as the pulsing one
      $('.hero .btn-cta').addClass('pulse');
    }

    // 3) Stagger gallery image fade-ins
    $('.gallery img').each(function(i){
      var delay = 120 + (i * 110); // ms
      $(this).css('animation-delay', delay + 'ms').addClass('animated');
    });

    // 4) Navbar shrink on scroll
    var $nav = $('.navbar');
    function checkNav(){
      if($(window).scrollTop() > 60){
        $nav.addClass('shrink');
      } else {
        $nav.removeClass('shrink');
      }
    }
    checkNav();
    $(window).on('scroll', checkNav);

    // 5) Optional: remove pulse when user focuses or taps CTA (prevents motion while interacting)
    $('.btn-cta').on('mousedown touchstart focus', function(){ $(this).removeClass('pulse'); });

    // 6) When a gallery image is clicked open modal (you already have modal code),
    //    make sure modal image doesn't animate when opened by removing animation class
    $('.gallery img').on('click', function(){
      $(this).removeClass('animated'); // avoid double animation
      // your existing modal preview code will run as before (if present)
    });
  });






  // Initialize EmailJS with your public key (replace placeholder)
  // emailjs.init('BykK_nv3t0ddUxEfe'); // <-- replace
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY_HERE');


  $(function(){
    // contact form submit
    $('#contactForm').on('submit', function(e){
      e.preventDefault();

      var $btn = $('#cf_submit');
      var $status = $('#cf_status');

      // Basic front-end validation
      var name = $('#cf_name').val().trim();
      var email = $('#cf_email').val().trim();
      var message = $('#cf_message').val().trim();

      if(!name || !email || !message){
        $status.text('Please fill name, email and message.').css('color','#ffb4b4').show();
        return;
      }

      $btn.prop('disabled', true).text('Sending...');
      $status.hide();

      // Build template params (keys should match your EmailJS template variables)
      var templateParams = {
        from_name: name,
        from_email: email,
        from_phone: $('#cf_phone').val().trim(),
        message: message,
        site: 'Fit Forge' // extra field if you want
      };

      // Send email via EmailJS
      emailjs.send('service_3ir13ys', 'template_hq58gur', templateParams)
        .then(function(response) {
          // success
          $btn.prop('disabled', false).text('Send Message');
          $status.text('Thanks! Your message has been sent.').css('color','#cfe9d1').show();
          $('#contactForm')[0].reset();
        }, function(error) {
          // failure
          console.error('EmailJS error:', error);
          $btn.prop('disabled', false).text('Send Message');
          $status.text('Oops — unable to send right now. Please try again later.').css('color','#ffb4b4').show();
        });
    });
  });