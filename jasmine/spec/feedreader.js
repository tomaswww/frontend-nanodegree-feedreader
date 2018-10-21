/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This first test makes sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* This test loops through each feed in the allFeeds object
     * and ensures that it has a URL defined and not empty.
     */
    it('URL defined', function() {
      allFeeds.forEach(function(feed){
        expect(feed.url).toBeDefined();
      })
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures that it has a name defined
     * and that the name is not empty.
     */
    it('name defined', function() {
      allFeeds.forEach(function(feed){
        expect(feed.name).toBeDefined();
    });
  });
});

  /* Test suite named "The menu" */
  describe('The menu', function() {
    /* This test ensures that the menu element is
     * hidden by default.
     */
    it('menu hidden', function() {
      var menuClass = document.querySelector("body").classList.contains("menu-hidden");
      expect(menuClass).toBe(true);
    });
    /* This test ensures that the menu changes
     * visibility when the menu icon is clicked. It has two expectations: That the menu displays when
     * clicked and it hides when clicked again.
     */
    it('menu Visibility', function() {
      let menuIcon = document.querySelector(".menu-icon-link");
      menuIcon.click();
      let menuShowed = document.querySelector("body").classList.contains("menu-hidden");
      expect(menuShowed).toBe(false);
      menuIcon.click();
      let menuHidden = document.querySelector("body").classList.contains("menu-hidden");
      expect(menuHidden).toBe(true);
    });
  });

  /* Test suite named "Initial Entries" */
  describe("Initial Entries", function() {
    /* This test ensures that when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    let initialEntry;
    beforeEach(done => {
      loadFeed(1, () => {
        initialEntry = document.querySelector(".entry, .feed");
        done();
      });
    });
    it("loadFeed gets completed and with entry", (done) => {
      expect(initialEntry).toBeDefined(true);
      done();
    });
  });

  /* Test suite named "New Feed Selection" */
  describe("New Feed Selection", function() {
    /* This test ensures that when a new feed is loaded
     * by the loadFeed function the content actually changes.
     */
    let firstFeed, secondFeed;
    beforeEach(done => {
      loadFeed(1, () => {
        window.firstFeed = document.querySelector(".entry-link").innerHTML;
        loadFeed(2, () => {
          window.secondFeed = document.querySelector(".entry-link").innerHTML;
          done();
        });
      });
    });
    it("loads new feeds", (done) => {
      expect(window.secondFeed !== window.firstFeed).toBe(true);
      done();
    });
  });


}());
