Template.home.helpers({});

Template.home.events({});

Template.home.onDestroyed(function(){});

Template.home.onCreated(function(){
	document.title = "The CAD Collection";
	mixpanel.track("View", { "Page": "Home" });
	mixpanel.track("Home Page Viewed", {"First Time": "TRUE"}, function() {
    	setTimeout(mixpanel.register({"First Time": "FALSE"}), 500);
	});
});
Template.home.onRendered(function(){
	$('#navComputer').addClass('fullscreen');
    // var vivus = new Vivus ('vivus', {
	// 	type: 'async',
	// 	duration: 50,
	// 	start: 'autostart',
	// 	forceRender: false,
	// 	dashGap: 2,
	// });
	// vivus.reset().play();
});
