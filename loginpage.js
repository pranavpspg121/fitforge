

  // loginpage.js (jQuery)
$(function () {

  // ---- helpers ----
  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // Phone number validation (10 digits, India format)
$('#phone').on('input blur', function () {
  var $t = $(this);
  var v = $t.val().trim();

  if (!v) { 
    clearFieldValidation($t); 
    return; 
  }

  if (!/^[0-9]{10}$/.test(v)) {
    setFieldInvalid($t, 'Enter a valid 10-digit phone number.');
  } else {
    setFieldValid($t);
  }
});


  function showAlert(message, type) {
    type = type || 'danger';
    var $a = $('#alertBox');
    $a.removeClass('alert-danger alert-success alert-warning alert-info')
      .addClass('alert-' + type)
      .text(message)
      .show();
  }

  function hideAlert() {
    $('#alertBox').hide().text('');
  }

  function refNodeFor($field) {
    // if input is inside .input-group, attach feedback after that container
    var $parent = $field.parent();
    return $parent.hasClass('input-group') ? $parent : $field;
  }

  function setFieldValid($field) {
    $field.removeClass('is-invalid').addClass('is-valid');
    var $ref = refNodeFor($field);
    $ref.next('.invalid-feedback').remove();
  }

  function setFieldInvalid($field, message) {
    $field.removeClass('is-valid').addClass('is-invalid');
    var $ref = refNodeFor($field);
    if ($ref.next('.invalid-feedback').length === 0) {
      $ref.after('<div class="invalid-feedback"></div>');
    }
    $ref.next('.invalid-feedback').text(message);
  }

  function clearFieldValidation($field) {
    $field.removeClass('is-valid is-invalid');
    var $ref = refNodeFor($field);
    $ref.next('.invalid-feedback').remove();
  }

  // ---- toggle show/hide password ----
  $('#togglePass').on('click', function () {
    var $p = $('#password');
    if ($p.attr('type') === 'password') {
      $p.attr('type', 'text');
      $(this).text('Hide').attr('aria-label', 'Hide password');
    } else {
      $p.attr('type', 'password');
      $(this).text('Show').attr('aria-label', 'Show password');
    }
  });

  $('#confirm_togglePass').on('click', function () {
    var $c = $('#confirm_password');
    if ($c.attr('type') === 'password') {
      $c.attr('type', 'text');
      $(this).text('Hide').attr('aria-label', 'Hide password');
    } else {
      $c.attr('type', 'password');
      $(this).text('Show').attr('aria-label', 'Show password');
    }
  });

  // ---- live validation ----
  $('#email').on('input blur', function () {
    var $t = $(this);
    var v = $t.val().trim();
    if (!v) { clearFieldValidation($t); return; }
    if (!isEmailValid(v)) setFieldInvalid($t, 'Enter a valid email address.');
    else setFieldValid($t);
  });

  $('#password').on('input blur', function () {
    var $t = $(this);
    var v = $t.val();
    if (!v) { clearFieldValidation($t); return; }
    if (v.length < 6) setFieldInvalid($t, 'Password must be at least 6 characters.');
    else setFieldValid($t);
  });

  $('#confirm_password').on('input blur', function () {
    var $t = $(this);
    var v = $t.val();
    var p = $('#password').val();
    if (!v) { clearFieldValidation($t); return; }
    if (v !== p) setFieldInvalid($t, 'Passwords do not match.');
    else setFieldValid($t);
  });

  // clear validation on focus
  $('#email, #password, #confirm_password').on('focus', function () {
    clearFieldValidation($(this));
    hideAlert();
  });

  // ---- form submit ----
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    hideAlert();

    var $form = $(this);
    var $submit = $form.find('button[type="submit"]');
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var phone = $('#phone').val().trim();

    var confirm = $('#confirm_password').val();
    var remember = $('#remember').is(':checked');

    var hasError = false;

    // email
    if (!email) {
      setFieldInvalid($('#email'), 'Email is required.');
      hasError = true;
    } else if (!isEmailValid(email)) {
      setFieldInvalid($('#email'), 'Please enter a valid email address.');
      hasError = true;
    } else {
      setFieldValid($('#email'));
    }
    // phone validation
if (!phone) {
  setFieldInvalid($('#phone'), 'Phone number is required.');
  hasError = true;
} else if (!/^[0-9]{10}$/.test(phone)) {
  setFieldInvalid($('#phone'), 'Enter a valid 10-digit phone number.');
  hasError = true;
} else {
  setFieldValid($('#phone'));
}


    // password
    if (!password) {
      setFieldInvalid($('#password'), 'Password is required.');
      hasError = true;
    } else if (password.length < 6) {
      setFieldInvalid($('#password'), 'Password must be at least 6 characters.');
      hasError = true;
    } else {
      setFieldValid($('#password'));
    }

    // confirm (optional for login; validate only if filled)
    if (confirm !== '') {
      if (confirm !== password) {
        setFieldInvalid($('#confirm_password'), 'Passwords do not match.');
        hasError = true;
      } else {
        setFieldValid($('#confirm_password'));
      }
    } else {
      // leave neutral; remove validation UI
      clearFieldValidation($('#confirm_password'));
    }

    if (hasError) {
      showAlert('Please fix the highlighted errors and try again.', 'danger');
      return;
    }

    // disable submit while "auth" runs
    $submit.prop('disabled', true).text('Signing in...');

    // ---- Demo async auth: replace with real AJAX POST to server ----
    // Example:
    // $.post('/api/login', { email: email, password: password, remember: remember })
    //  .done(function(res){ /* handle success */ })
    //  .fail(function(err){ /* show error */ })
    //  .always(function(){ $submit.prop('disabled', false).text('Sign In'); });

    setTimeout(function () {
      var lower = email.toLowerCase();
      if (lower.includes('user') || lower.includes('pranav')) {
        if (remember) {
          try { localStorage.setItem('fitforge_remember', email); } catch (e) {}
        } else {
          try { localStorage.removeItem('fitforge_remember'); } catch (e) {}
        }
        // success -> redirect
        window.location.href = 'index.html';
      } else {
        showAlert('Invalid credentials — demo only. Use an email containing "user" or "pranav".', 'danger');
        $submit.prop('disabled', false).text('Sign In');
      }
    }, 900);
  });

  // ---- social / forgot placeholders ----
  $('#googleBtn, #appleBtn').on('click', function () {
    showAlert('Social sign-in not implemented in demo. Integrate OAuth on the backend.', 'info');
  });

  $('#forgotLink').on('click', function (e) {
    e.preventDefault();
    showAlert('Password reset flow not implemented in demo. Connect to your backend to send reset emails.', 'warning');
  });

  // ---- prefill remembered email ----
  try {
    var remembered = localStorage.getItem('fitforge_remember');
    if (remembered) {
      $('#email').val(remembered);
      $('#remember').prop('checked', true);
      $('#email').trigger('input');
    }
  } catch (e) {
    // ignore storage errors
  }

});

