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
