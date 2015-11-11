Meteor.methods({
    sendMessage: function(values) {
        check(values, {
            name: String,
            email: String,
            reason: String,
            description: String
        });
        this.unblock();
        Email.send({
            from: values.email,
            to: "contact@nascis.fr",
            subject: values.name + values.reason,
            text: values.description,
        });
    }
});
