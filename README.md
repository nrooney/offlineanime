Offline Anime App
=================

This app showcases HTML5 offline capabilities using Angular JS. The offline capabilities exhibited are:

* LocalStorage: used for storing data in a JSON format (but stored as a string)
* AppCache: used for storing the app shell
* IndexedDB: only exemplified in indexedDBexample.html in the root. Will be adding to app for next iteration.

The app is a simple data driven app for reading and writing items to a database. The items in this case are "Anime" that the user has watched (or wants to add to a list for any reason). The app will display a list of anime, let the user view an individual anime, and search for new anime.

noOffline Branch
----------------

I removed the offline capabilities in this branch so you can add them back in. These are the files that will need editing. Try to follow the comments!

* app/js/controllers.js: LocalStorage is missing!
* app/index.html: appCache declaration is missing!
* app.appcache: appCache has no declarations!
* indexedDBexample.html: you can also try fixing my indexedDB example! The fixer will receive a bottle of wine or a couple of good belgian beers!

Key Resources
-------------

Key resources showcasing the APIs are identified below:

* app/js/controllers.js: LocalStorage usage is here
* app/index.html: appCache declaration is here
* app.appcache: appCache file (manifest)
* indexedDBexample.html: indexedDB example (has bugs)

Next Steps
----------

This is a demo app so it is in no way ready to be deployed! It's giving the ability to test the new HTML5 APIs and find out the inconsistencies. There are some cool new things that we could do with the app to make it ready and more robust, these are below.

* "Anime Added to Database" needs to be clear to user - no feedback currently.
* IndexedDB could be used for user data
* Network Information API could be used to tell user they are offline(?!)
* Fix the image issue (should be possible with IndexedDB)
* Delete functionality
* Much more feedback for user!
* Proper search!