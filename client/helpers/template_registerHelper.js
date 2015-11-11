Template.registerHelper("isNotNull", function(value) {
    return (value[1] != null) || (value[2] != null) || (value[3] != null);
});

Template.registerHelper('isFavoriteItem', function(itemId) { return _.indexOf(Meteor.user().profile.favorite, itemId) != -1; });

Template.registerHelper('getYear', function(date) { return moment(date).year(); });

Template.registerHelper('formatDate', function(date) { return moment(date).format('MM-DD-YYYY'); });

Template.registerHelper('formatDuration', function(date) { return moment(date).fromNow(); });

Template.registerHelper('activeDurationUnit', function(date) {
    var unit = _.first(moment(date).fromNow(true).split(" "));
    return unit[0] == "a" ? 1 : unit;
});

Template.registerHelper('activeDurationMoment', function(date) {
    return _.last(moment(date).fromNow(true).split(" "));
});

Template.registerHelper('getItemNumber', function(userId) { return Items.find({ "metadata.owner": userId }).count();  });
