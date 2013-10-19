'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('OfflineAnime App', function() {

  describe('Anime list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });


    it('should filter the anime list as user types into the search box', function() {
      expect(repeater('.animes li').count()).toBe(3);

      input('query').enter('nexus');
      expect(repeater('.animes li').count()).toBe(1);

      input('query').enter('motorola');
      expect(repeater('.animes li').count()).toBe(2);
    });
  });
});