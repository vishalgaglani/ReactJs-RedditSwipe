# ReactJs-RedditSwipe
Swipe cards viewer for image related subreddits

![Alt text](./img/iangry-ui.jpg?raw=true "Optional Title")

#Objective
Create an app that connects to reddits server, gets image links for desired subreddit, parses the direct link and displays them in card format.

## Version 1 - React only Version - single subreddit


State and http requests handled by React


Rendering to DOM, simple list format, all cards rendered at once


Client side, dirty image parsing gets 80% of url’s fixed, auto deletes images that will not render.



## Version 2 - ReactNative mobile port - single subreddit

Image parsing needs to be changed to account for iOS only accepting https: connections


React-Native for state management 


Using swipecard.js for card animation


Cards will trigger image refresh after X amount of swipes


No longer rendering to DOM


Native api connect


Will only load the top 100 images for that day, images are not shuffled.

##Version 2a - ReactNative/Redux mobile port - multiple subreddit

Add dropdown Menu Functionality for other cool image subreddits

##Version 3 - Server Side Image Parsing - single subreddit

Image URL’s are parsed via server scripts, database of 1000 images is created.


Database automatically resolves all url’s.  


Possible image scraping via PhantomJS + reddit enhancement suite to get hard to resolve ones (or just to save time).



