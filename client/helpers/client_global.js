Template.about.onCreated(function(){ document.title = "About | The CAD Collection"; });
Template.legalPages.onCreated(function() { document.title = "Legal pages | The CAD Collection"; });
Template.legalPages.onRendered(function() { $('.menu .item').tab(); });
Template.notFound.onCreated(function() { document.title = "Not Fount | The CAD Collection"; });
Template.accessDenied.onCreated(function() { document.title = "Access Denied | The CAD Collection"; });
Template.contact.events({
	"submit .contact": function(event, template) {
		event.preventDefault();
		var values = $('.contact').form('get values');

		$('.contact').form({
			fields: {
				name: {
					identifier : 'name',
					rules: [{ type   : 'empty', prompt : 'Please enter a name' }]
				},
				email: {
					identifier : 'email',
					rules: [{ type   : 'email', prompt : 'Please enter a valid email' }]
				},
				description: {
					identifier : 'description',
					rules: [{ type   : 'empty', prompt : 'Please enter a description' }]
				},
				reason: {
					identifier : 'reason',
					rules: [{ type   : 'empty', prompt : 'Please enter a reason' }]
				},
			}
		}).form('validate form');


		if ($('.contact').form('is valid')) {
			Meteor.call('sendMessage', values, function(err) {
				if (err) console.log(err);
				else {
					alertMessages.sendEmailSent();
					$('.contact').form('clear');
				}
			});

		}

		return false;
	}
});

Template.contact.onRendered(function() { $('.dropdown').dropdown(); });
Template.help.onRendered(function() { $('.ui.accordion').accordion(); });

Template.about.events({ "click .back": function() { history.back(); }, });
Template.accessDenied.events({ "click .back": function() { history.back(); } });
Template.notFound.events({ "click .back": function() { history.back(); } });
