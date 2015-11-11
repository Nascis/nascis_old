Template.footer.events({

});

Template.footer.helpers({

});

Template.footer.onRendered(function(){
    $('#brandingFooterLogo')
      .visibility({
        onTopVisible: function() {
          $('#brandingFooterLogo').addClass('animated short delayed fadeInUp');
        }
      })
    ;
});
