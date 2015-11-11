Template.registerHelper('formatDate', function(date) { return moment(date).format('MM-DD-YYYY'); });

Template.registerHelper('formatDuration', function(date) { return moment(date).fromNow(); });
