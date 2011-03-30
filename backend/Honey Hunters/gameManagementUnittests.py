from game.gameManagement import *
from game.gameBoardHex import *
import unittest

class TestGameManagement(unittest.TestCase):

    def setUp(self):
        self.management = GameManagement()

    def testBaseConstructor(self):
        self.assertEqual(len(self.management.games), 0)
        
    def testStartNewHexGameWithNoOtherGames(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.assertTrue(self.management.NewGame(gameId, game))
        self.assertEqual(len(self.management.games), 1)
        self.assertEqual(self.management.GetGame(gameId), game)

    def testStartNewHexGameWithOneOtherGame(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 2
        self.assertTrue(self.management.NewGame(gameId1, game1))
        self.assertTrue(self.management.NewGame(gameId2, game2))
        self.assertEqual(len(self.management.games), 2)
        self.assertEqual(self.management.GetGame(gameId1), game1)
        self.assertEqual(self.management.GetGame(gameId2), game2)
        
    def testStartNewHexGameWithSameIDAsOtherGame(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 1
        self.assertTrue(self.management.NewGame(gameId1, game1))
        self.assertFalse(self.management.NewGame(gameId2, game2))
        self.assertEqual(len(self.management.games), 1)
        self.assertEqual(self.management.GetGame(gameId1), game1)
        self.assertNotEqual(self.management.GetGame(gameId2), game2)
        
        
    def testGetPlayerPointsWithExistingGame(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.assertTrue(self.management.NewGame(gameId, game))
        self.assertEqual(self.management.GetPlayerPoints(gameId, 1), 0)
        self.assertEqual(self.management.GetPlayerPoints(gameId, 'a'), 0)
        
    def testGetPlayerPointsWithNonExistentGame(self):
        self.assertFalse(self.management.GetPlayerPoints(123, 1))
    
    def testEndHexGameWithNoOtherGames(self):
        game = GameBoardHex(1,'a')
        gameId = 1
        self.management.NewGame(gameId, game)
        self.management.EndGame(gameId)
        self.assertEqual(len(self.management.games), 0)
        self.assertFalse(self.management.GetGame(gameId))
        
    def testEndFirstHexGameInListOfMultipleGames(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 2
        self.management.NewGame(gameId1, game1)
        self.management.NewGame(gameId2, game2)
        self.management.EndGame(gameId1)
        self.assertEqual(len(self.management.games), 2)
        self.assertEqual(self.management.GetGame(gameId1), -1)
        self.assertEqual(self.management.GetGame(gameId2), game2)
        
    def testEndFirstHexGameInListOfMultipleGames(self):
        game1 = GameBoardHex(1,'a')
        game2 = GameBoardHex(1,'a')
        gameId1 = 1
        gameId2 = 2
        self.management.NewGame(gameId1, game1)
        self.management.NewGame(gameId2, game2)
        self.management.EndGame(gameId2)
        self.assertEqual(len(self.management.games), 1)
        self.assertEqual(self.management.GetGame(gameId1), game1)
        self.assertFalse(self.management.GetGame(gameId2))
        
    def testValidate(self):
        game = GameBoardHex()
        gameId = 1
        playerIdOne = 1
        playerIdTwo = 'a'
        
        self.assertFalse(self.management.Validate(gameId))
        self.assertFalse(self.management.Validate(gameId, playerIdOne))
        self.assertFalse(self.management.Validate(gameId, playerIdTwo))
        
        self.management.NewGame(gameId, game)
        self.assertTrue(self.management.Validate(gameId))
        self.assertFalse(self.management.Validate(gameId, playerIdOne))
        self.assertFalse(self.management.Validate(gameId, playerIdTwo))
        
        self.management.games[gameId].playerOne = playerIdOne
        self.assertTrue(self.management.Validate(gameId, playerIdOne))
        self.assertFalse(self.management.Validate(gameId, playerIdTwo))
        
        self.management.games[gameId].playerTwo = playerIdTwo
        self.assertTrue(self.management.Validate(gameId, playerIdOne))
        self.assertTrue(self.management.Validate(gameId, playerIdTwo))
        
        
    
if __name__ == '__main__':
    unittest.main()