'use strict';

/* jasmine specs for controllers go here */
describe('offlineAnimeApp controllers', function() {

  describe('AnimeListCtrl', function(){

    beforeEach(module('offlineAnimeApp'));

    it('should create "animes" model with 3 animes', function() {
      var scope = {},
          ctrl = new AnimeListCtrl(scope);

      expect(scope.animes.length).toBe(3);
    });

    it('should create "animes" model with 3 animes', inject(function($controller) {
      var scope = {},
          ctrl = $controller('AnimeListCtrl', {$scope:scope});

      expect(scope.animes.length).toBe(3);
    }));

  });
});
