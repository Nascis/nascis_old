Meteor.release = "1.0.0";

Meteor.startup(function () {
	// Stripe.setPublishableKey('pk_test_D05JjdmxfSVhYOsOZGE6XG1u');

	// Items.resumable.on('fileAdded', function(file) {
	// 	Session.set(file.uniqueIdentifier, 0);
	// 	return Items.insert({ _id: file.uniqueIdentifier, filename: file.fileName, contentType: file.file.type },
	// 	function (err, _id) {
	//         if err {
	// 			console.warn("File creation failed!", err);
	//         	return;
	// 	    }
	// 		Items.resumable.upload()
	// 	);
	// });

	Items.resumable.on('fileAdded', function(file) {
		Session.set(file.uniqueIdentifier, 0);
		return Items.insert({
    		_id: Meteor.Collection.ObjectID(),
    		filename: file.fileName,
    		contentType: file.file.type
			}, function(err, _id) {
	    		if (err) console.warn("File creation failed!", err);
	    		return Items.resumable.upload();
		});
	});

	Deps.autorun(function () {
    	Meteor.subscribe('myData', Meteor.userId());
    });

	Items.resumable.assignBrowse($("#attachmentName"));

	Items.resumable.assignDrop($("#dropzone"));

	Items.resumable.on('fileProgress', function(file) { Session.set(file.uniqueIdentifier, Math.floor(100*file.progress())) });

    Items.resumable.on('fileSuccess', function(file) { Session.set(file.uniqueIdentifier, undefined) });

    Items.resumable.on('fileError', function(file) {
		console.warn("Error uploading", file.uniqueIdentifier);
		Session.set(file.uniqueIdentifier, undefined);
	});
});

Accounts.onResetPasswordLink(function(token, done) {
	Router.go("user.resetPassword", { _token: token });
	done();
});

Accounts.onEmailVerificationLink(function(token, done) {
    Accounts.verifyEmail(token, function(err) {
        if (err) {
			if (err.message = 'Verify email link expired [403]')
				alertMessages.sendUrlExpired();
        }
        else alertMessages.sendUserAuthenticated();
    });
});

Template.layout.onRendered(function(){});

Template.layout.helpers({});

Template.layout.events({});
