(function(){
  var openFormButton = document.querySelector('.arrow-down');
  var form = document.querySelector('.form');
  var nav = document.querySelector('.nav');

  if (openFormButton) {
    openFormButton.addEventListener('click', function(e) {
      wyless.form.open();

      e.preventDefault();
    });
  }

  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if(wyless.form.isValid()) {
        console.log('OK');
      } else {
        console.log('Fill in fields')
      }
    })
  }

  if(nav) {
    nav.addEventListener('click', function(e) {
      var target = e.target;
      if(target.tagName.toLowerCase() !== 'a')
      {
        return;
      }
      wyless.navigation.toggleToActiveLink(target);
      e.preventDefault();
    });
  }
}());