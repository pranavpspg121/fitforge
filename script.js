 
 const searchInput = document.getElementById("serviceSearch");
const serviceCards = document.querySelectorAll("#servicesList .service-card");

searchInput.addEventListener("input", function() {
    const value = this.value.toLowerCase();

    serviceCards.forEach(card => {
        const text = card.textContent.toLowerCase();

        if(text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

 
 
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

    

     
// --------- CONFIG - replace these with your actual EmailJS values ----------
const PUBLIC_KEY = "BykK_nv3t0ddUxEfe";      // from EmailJS dashboard (user_ or pk_ string)
const SERVICE_ID = "service_3ir13ys";      // e.g. "service_3ir13ys"
const TEMPLATE_ID = "template_wc4dwqq";    // e.g. "template_wc4dwqq"
// -------------------------------------------------------------------------

// -----------------------------------------------------------

// initialize
if (window.emailjs && emailjs.init) {
  emailjs.init(PUBLIC_KEY);
} else {
  console.error("EmailJS not loaded. Make sure the CDN <script> is included BEFORE this script.");
}

const bookform = document.getElementById("trialForm");
const bookfeedback = document.getElementById("formMsg");

function setFeedback(text, success = true) {
  if (!bookfeedback) return;
  bookfeedback.textContent = text;
  bookfeedback.style.display = "block";
  bookfeedback.className = success ? 'muted small succ' : 'muted small err';
}

function nowTimeStr() {
  return new Date().toLocaleString();
}

bookform.addEventListener('submit', function (e) {
  e.preventDefault();
  setFeedback('Sending...', true);

  // read form values
  const nameVal = (document.getElementById('name') || {}).value || '';
  const emailVal = (document.getElementById('email') || {}).value || '';
  const phoneVal = (document.getElementById('phone') || {}).value || '';
  const programVal = (document.getElementById('program') || {}).value || '';

  // Build template payload that matches YOUR template variable names exactly
  const templateParams = {
    from_name: nameVal,        // {{from_name}}
    from_email: emailVal,      // {{from_email}}
    from_phone: phoneVal,      // {{from_phone}}
    program: programVal,       // {{program}}
    time: nowTimeStr()         // {{time}}
  };

  console.log("DEBUG: templateParams ->", templateParams);

  // send using explicit send so keys are exact (less dependent on form name attributes)
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(function (resp) {
      console.log('EmailJS send SUCCESS', resp);
      setFeedback('Thanks ' + (nameVal || 'there') + '! We will contact you shortly to confirm your trial.', true);
      bookform.reset();
      setTimeout(() => bookfeedback.style.display = 'none', 7000);
    }, function (err) {
      console.error('EmailJS send ERROR', err);
      setFeedback('Send failed. Check console for details.', false);
    });
});








//  subscribe us and local storage


    document.getElementById("subscribeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("subEmail");
    const subMsg = document.getElementById("subMsg");

    const eaddr = emailInput.value.trim();

    // Validate
    if (!eaddr) {
        subMsg.textContent = "Enter a valid email";
        subMsg.style.color = "#ffb4b4";
        subMsg.style.display = "block";
        return;
    }

    // Save to localStorage
    localStorage.setItem("username", eaddr);
    alert("Name saved!");

    // Success message
    subMsg.textContent = "Subscribed! Check your inbox for updates.";
    subMsg.style.color = "#cfe9d1";
    subMsg.style.display = "block";

    // Reset form
    this.reset();
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
  emailjs.init('BykK_nv3t0ddUxEfe');


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
  // auto year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Fade-slide reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.2});

document.querySelectorAll('.fade-slide').forEach(el=>{
  observer.observe(el);
});


// about js
document.addEventListener('DOMContentLoaded', () => {
  // animate progress bars when visible
  const bars = document.querySelectorAll('.bar');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const target = parseInt(bar.getAttribute('data-value'), 10) || 0;
        const fill = bar.querySelector('.bar-fill');
        // animate width
        fill.style.width = target + '%';

        // animate number (tiny count up)
        const pctEl = bar.previousElementSibling.querySelector('.percent');
        if (pctEl) {
          let cur = 0;
          const step = Math.max(1, Math.floor(target / 30));
          const tick = () => {
            cur += step;
            if (cur >= target) {
              pctEl.textContent = target + '%';
            } else {
              pctEl.textContent = cur + '%';
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
        observer.unobserve(bar);
      });
    }, {threshold:0.25});

    bars.forEach(b => obs.observe(b));
  } else {
    // fallback: instantly show
    bars.forEach(b => {
      const t = b.getAttribute('data-value') || 0;
      b.querySelector('.bar-fill').style.width = t + '%';
    });
  }
});

// json
fetch("gym-data.json")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log("Error:", error));
