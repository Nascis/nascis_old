Meteor.methods({
    getAvatar: function(userId) {
        check(userId, String);
        var avatar = Avatars.findOne({ "metadata.owner": userId });
        if (avatar) return avatar.url();
        else return "/img/avatarPlaceholder.jpg";
    },
    getCart: function() {
        if (Meteor.userId()) {
            var credit = Meteor.users.findOne(userId).profile.credit;
            var items = Cart.find({ owner: userId }, { fields: { item: 1 } });
            return { credit: credit, items: items };
        }
    }
});
