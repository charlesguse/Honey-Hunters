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
        
    def checkIfGamePropertiesAreEqual(self, game1, game2):
        for d in dir(game1):
            potential_property = "inspect.ismethod(game1.{0}) == False".format(d)
            if eval(potential_property):
                game1Prop = eval("game1.{0}".format(d))
                game2Prop = eval("game2.{0}".format(d))
                if game1Prop != game2Prop:
                    return False
        return True
        
    def testBaseConstructor(self):
        self.assertEqual(self.management.TotalGames(), 0)
        
    def testStartNewHexGameWithNoOtherGames(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.assertTrue(self.management.NewGame(gameId, game))
        self.assertEqual(self.management.TotalGames(), 1)
        managedGame = self.management.GetGame(gameId)
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game, managedGame))

    def testStartNewHexGameWithOneOtherGame(self):
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
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game1, managedGame1))
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game2, managedGame2))
        self.assertFalse(self.checkIfGamePropertiesAreEqual(managedGame1, managedGame2))
        
    def testGameDataIsNotChangedWhileBeingManaged(self):
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
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game1, managedGame1))
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game2, managedGame2))
        self.assertFalse(self.checkIfGamePropertiesAreEqual(managedGame1, managedGame2))
        
    def testStartNewHexGameWithSameIDAsOtherGame(self):
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
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game1, managedGame1))
        self.assertFalse(self.checkIfGamePropertiesAreEqual(game2, managedGame2))
        self.assertTrue(self.checkIfGamePropertiesAreEqual(managedGame1, managedGame2))
    
    def testEndHexGameWithNoOtherGames(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.management.NewGame(gameId, game)
        self.management.EndGame(gameId)
        self.assertEqual(self.management.TotalGames(), 0)
        self.assertFalse(self.management.GetGame(gameId))
        
    def testEndFirstHexGameInListOfMultipleGames(self):
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
        self.assertFalse(self.checkIfGamePropertiesAreEqual(game1, managedGame2))
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game2, managedGame2))
        
    def testEndSecondHexGameInListOfMultipleGames(self):
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
        self.assertTrue(self.checkIfGamePropertiesAreEqual(game1, managedGame1))
        self.assertFalse(self.checkIfGamePropertiesAreEqual(game2, managedGame1))
    
    def testValidate(self):
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
        
    def testGameExists(self):
        game = GameBoardHex(1, 'a')
        gameId = 1
        self.assertFalse(self.management.GameExists(gameId))
        self.management.NewGame(gameId, game)
        self.assertTrue(self.management.GameExists(gameId))
    
if __name__ == '__main__':
    unittest.main()