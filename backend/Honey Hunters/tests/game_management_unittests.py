from context import game

from game.gameManagement import *
from game.gameBoardHex import *
import inspect
import unittest
from google.appengine.api import memcache
from google.appengine.ext import testbed

class TestGameManagement(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_memcache_stub()
        self.management = GameManagement()
        
    def check_if_game_properties_are_equal(self, game1, game2, debug=False):
        for d in dir(game1):
            potential_property1 = "inspect.ismethod(game1.{0}) == False".format(d)
            if d in dir(game2):
                potential_property2 = "inspect.ismethod(game2.{0}) == False".format(d)
                if eval(potential_property1) and eval(potential_property2):
                    game1Prop = eval("game1.{0}".format(d))
                    game2Prop = eval("game2.{0}".format(d))
                    if debug and game1Prop != game2Prop:
                        print "\ngame1.{0}: '{1}'".format(d, game1Prop)
                        print "game2.{0}: '{1}'\n".format(d, game2Prop)
                    if game1Prop != game2Prop:
                        return False
        return True
        
    def test_base_constructor(self):
        self.assertEqual(self.management.TotalGames(), 0)
        
    def test_start_new_hex_game_with_no_other_games(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.assertTrue(self.management.NewGame(gameId, game))
        self.assertEqual(self.management.TotalGames(), 1)
        managedGame = self.management.GetGame(gameId)
        self.assertTrue(self.check_if_game_properties_are_equal(game, managedGame))

    def test_start_new_hex_game_with_one_other_game(self):
        game1 = GameBoardHex(1,'a')
        game1.identifier = "game1"
        game2 = GameBoardHex(1,'a')
        game2.identifier = "game2"
        gameId1 = 1
        gameId2 = 2
        self.assertTrue(self.management.NewGame(gameId1, game1))
        self.assertTrue(self.management.NewGame(gameId2, game2))
        self.assertEqual(self.management.TotalGames(), 2)
        
        managedGame1 = self.management.GetGame(gameId1)
        managedGame2 = self.management.GetGame(gameId2)
        self.assertTrue(self.check_if_game_properties_are_equal(game1, managedGame1))
        self.assertTrue(self.check_if_game_properties_are_equal(game2, managedGame2))
        self.assertFalse(self.check_if_game_properties_are_equal(managedGame1, managedGame2))
        
    def test_game_data_is_not_changed_while_being_managed(self):
        game1 = GameBoardHex(1,'a')
        game1.identifier = "game1"
        game2 = GameBoardHex(1,'a')
        game2.identifier = "game2"
        gameId1 = 1
        gameId2 = 2
        self.assertTrue(self.management.NewGame(gameId1, game1))
        self.assertTrue(self.management.NewGame(gameId2, game2))
        self.assertEqual(self.management.TotalGames(), 2)
        
        managedGame1 = self.management.GetGame(gameId1)
        managedGame2 = self.management.GetGame(gameId2)
        self.assertTrue(self.check_if_game_properties_are_equal(game1, managedGame1))
        self.assertTrue(self.check_if_game_properties_are_equal(game2, managedGame2))
        self.assertFalse(self.check_if_game_properties_are_equal(managedGame1, managedGame2))
        
    def test_start_new_hex_game_with_same_id_as_other_game(self):
        game1 = GameBoardHex(1,'a')
        game1.identifier = "game1"
        game2 = GameBoardHex(1,'a')
        game2.identifier = "game2"
        gameId1 = 1
        gameId2 = 1
        self.assertTrue(self.management.NewGame(gameId1, game1))
        self.assertFalse(self.management.NewGame(gameId2, game2))
        self.assertEqual(self.management.TotalGames(), 1)
        self.assertEqual(self.management.GetGame(gameId1).identifier, game1.identifier)
        self.assertNotEqual(self.management.GetGame(gameId2).identifier, game2.identifier)
        
        managedGame1 = self.management.GetGame(gameId1)
        managedGame2 = self.management.GetGame(gameId2)
        self.assertTrue(self.check_if_game_properties_are_equal(game1, managedGame1))
        self.assertFalse(self.check_if_game_properties_are_equal(game2, managedGame2))
        self.assertTrue(self.check_if_game_properties_are_equal(managedGame1, managedGame2))
    
    def test_end_hex_game_with_no_other_games(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.management.NewGame(gameId, game)
        self.management.EndGame(gameId)
        self.assertEqual(self.management.TotalGames(), 0)
        self.assertFalse(self.management.GetGame(gameId))
        
    def test_end_first_hex_game_in_list_of_multiple_games(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 2
        self.management.NewGame(gameId1, game1)
        self.management.NewGame(gameId2, game2)
        self.assertEqual(self.management.TotalGames(), 2)
        self.management.EndGame(gameId1)
        self.assertEqual(self.management.TotalGames(), 1)
        self.assertFalse(self.management.GetGame(gameId1))
        
        managedGame2 = self.management.GetGame(gameId2)
        self.assertFalse(self.check_if_game_properties_are_equal(game1, managedGame2))
        self.assertTrue(self.check_if_game_properties_are_equal(game2, managedGame2))
        
    def test_end_second_hex_game_in_list_of_multiple_games(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 2
        self.management.NewGame(gameId1, game1)
        self.management.NewGame(gameId2, game2)
        self.management.EndGame(gameId2)
        self.assertEqual(self.management.TotalGames(), 1)
        self.assertFalse(self.management.GetGame(gameId2))
        
        managedGame1 = self.management.GetGame(gameId1)
        self.assertTrue(self.check_if_game_properties_are_equal(game1, managedGame1))
        self.assertFalse(self.check_if_game_properties_are_equal(game2, managedGame1))
    
    def test_validate(self):
        game = GameBoardHex()
        gameId = 1
        playerIdOne = 1
        playerIdTwo = 'a'
        
        managedGame1 = self.management.GetGame(gameId)
        self.assertFalse(self.management.Validate(managedGame1))
        self.assertFalse(self.management.Validate(managedGame1, playerIdOne))
        self.assertFalse(self.management.Validate(managedGame1, playerIdTwo))
        
        self.management.NewGame(gameId, game)
        managedGame1 = self.management.GetGame(gameId)
        self.assertTrue(self.management.Validate(managedGame1))
        self.assertFalse(self.management.Validate(managedGame1, playerIdOne))
        self.assertFalse(self.management.Validate(managedGame1, playerIdTwo))
        
        game.SetPlayer(playerIdOne)
        self.management.UpdateGame(gameId, game)
        managedGame1 = self.management.GetGame(gameId)
        self.assertTrue(self.management.Validate(managedGame1, playerIdOne))
        self.assertFalse(self.management.Validate(managedGame1, playerIdTwo))
        
        game.SetPlayer(playerIdTwo)
        self.management.UpdateGame(gameId, game)
        managedGame1 = self.management.GetGame(gameId)
        self.assertTrue(self.management.Validate(managedGame1, playerIdOne))
        self.assertTrue(self.management.Validate(managedGame1, playerIdTwo))
        
    def test_game_exists(self):
        game = GameBoardHex(1, 'a')
        gameId = 1
        self.assertFalse(self.management.GameExists(gameId))
        self.management.NewGame(gameId, game)
        self.assertTrue(self.management.GameExists(gameId))
    
if __name__ == '__main__':
    unittest.main()