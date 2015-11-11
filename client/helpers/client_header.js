Template.header.helpers({
    isSearching() { return instance.get('searching'); },
    background() { return "background_0"+Math.floor((Math.random() * 5) + 1) },
    cart() { return Template.instance().cart.get() },
    itemsIndex() { return ItemsIndex },
    inputAttributes() { return { 'placeholder':'What you looking for?', 'class':'prompt' } },
    avatarUrl() {
        var avatarUrl = Avatars.findOne({ "metadata.owner": Meteor.userId() });
        if (avatarUrl) return avatarUrl.url('avatar');
        else return "/img/avatarPlaceholder.jpg";
    },
});

Template.header.events({
    "click #globalAccount > div": () => $('#globalAccount > div').dropdown(),
    "click .search, submit form": (event, template) => {
        event.preventDefault();

        // instance = EasySearch.getComponentInstance({ class: 'prompt', index: 'items', autorun: self.autorun });
        // instance.on('searchResults', function (searchResults) {
        //     console.log("Resultats de la recherche ",searchResults);
        // });

        // instance.triggerSearch();

        Router.go('item.search');
        return false;
    }
});

Template.header.onRendered(function() {
    // EasySearch.getComponentInstance({ class: 'prompt', index: 'items' });
});

Template.header.onCreated(function() {
    this.subscribe('showOwnAvatar');

    this.cart = new ReactiveVar(undefined);

    Meteor.call('getCart', (err, res) => {
        if (err) console.log(err); else this.cart.set(res);
    }.bind(this));


    // instance = EasySearch.getComponentInstance({ class: 'prompt', index: 'items', autorun: self.autorun });
    // instance.on('searchingDone', function (searchingIsDone) {
    //     searchingIsDone && console.log('I am done!');
    //     Router.go('/search');
    // });
    // instance.on('searchResults', function (searchResults) {
    //     console.log("Resultats de la recherche ",searchResults);
    // });
    // instance.on('autosuggestSelected ', function (autosuggestSelected ) {
    //     console.log("autosuggestSelected ",autosuggestSelected );
    // });
    // instance.on('total', function (total) {
    //     console.log("Resultats total ",total);
    // });
    // instance.on('currentValue', function (val) {
    //     console.log('The user searches for ' + val);
    // });

});
