from game.gameBoardBase import *
from game.gameBoardHex import *
import unittest

class TestGameBoardHex(unittest.TestCase):

    def setUp(self):
        self.baseLogic = GameBoardHex(1,'a')

    def testSetPlayerAndPlayersExist(self):
        gameBoard = GameBoardHex()
        self.assertEqual(gameBoard.playerOne, GameBoardBase.PLAYER_NOT_SET)
        self.assertEqual(gameBoard.playerTwo, GameBoardBase.PLAYER_NOT_SET)
        self.assertFalse(gameBoard.PlayersExist())
        
        self.assertTrue(gameBoard.SetPlayer(1))
        self.assertEqual(gameBoard.playerOne, 1)
        self.assertEqual(gameBoard.playerTwo, GameBoardBase.PLAYER_NOT_SET)
        self.assertFalse(gameBoard.PlayersExist())
        
        self.assertFalse(gameBoard.SetPlayer(1)) # Try to set using player one id again
        self.assertEqual(gameBoard.playerOne, 1)
        self.assertEqual(gameBoard.playerTwo, GameBoardBase.PLAYER_NOT_SET)
        self.assertFalse(gameBoard.PlayersExist())
        
        self.assertTrue(gameBoard.SetPlayer('a'))
        self.assertEqual(gameBoard.playerOne, 1)
        self.assertEqual(gameBoard.playerTwo, 'a')
        self.assertTrue(gameBoard.PlayersExist())
        
        self.assertFalse(gameBoard.SetPlayer('b'))
        self.assertEqual(gameBoard.playerOne, 1)
        self.assertEqual(gameBoard.playerTwo, 'a')
        self.assertTrue(gameBoard.PlayersExist())
        
    def testPlayerExists(self):
        self.assertTrue(self.baseLogic.PlayerExists(1))
        self.assertTrue(self.baseLogic.PlayerExists('a'))
        self.assertFalse(self.baseLogic.PlayerExists('b'))
        
        gameBoard = GameBoardHex()
        self.assertFalse(gameBoard.PlayerExists(None))
        self.assertFalse(gameBoard.PlayerExists(1))
        self.assertFalse(gameBoard.PlayerExists('a'))
        self.assertFalse(gameBoard.PlayerExists('b'))
        
        gameBoard.playerOne = 1
        self.assertTrue(gameBoard.PlayerExists(1))
        self.assertFalse(gameBoard.PlayerExists('a'))
        
        gameBoard.playerTwo = 'a'
        self.assertTrue(gameBoard.PlayerExists(1))
        self.assertTrue(gameBoard.PlayerExists('a'))
        self.assertFalse(self.baseLogic.PlayerExists('b'))
        
    def testSetPlayerName(self):
        gameBoard = GameBoardHex()
        self.assertEqual(gameBoard.playerOneName, GameBoardBase.NAME_NOT_SET)
        self.assertEqual(gameBoard.playerTwoName, GameBoardBase.NAME_NOT_SET)
        
        self.assertTrue(gameBoard.SetPlayer(1, 'one'))
        self.assertEqual(gameBoard.playerOneName, 'one')
        self.assertEqual(gameBoard.playerTwoName, GameBoardBase.NAME_NOT_SET)
        
        self.assertTrue(gameBoard.SetPlayer('a', 'two'))
        self.assertEqual(gameBoard.playerOneName, 'one')
        self.assertEqual(gameBoard.playerTwoName, 'two')
        
    def testBoardSize(self):
        self.assertEqual(self.baseLogic.BoardSize(), (16, 16))
    
    def testTotalHoney(self):
        self.assertEqual(self.baseLogic.TotalHoney(), 51)

    def testCheckPlayerIds(self):
        self.assertEqual(self.baseLogic.playerOne, 1)
        self.assertEqual(self.baseLogic.playerTwo, 'a')

    #Testing gameBoardBaseLogic, should probably be moved out of hex tests
    def testCreateBoardArrayBeforeHoneyAdded(self):
        expected = 0
        sum = 0
        boardSize = (3, 3)
        
        arr = self.baseLogic.CreateBoardArray(boardSize, GameBoardBase.EMPTY_SPOT)
        for i in arr:
            for j in i:
                sum += j
                
        self.assertEqual(sum, expected)
        
        self.assertEqual(len(arr), boardSize[0])
        
        for innerArray in arr:
            self.assertEqual(len(innerArray), boardSize[1])
    
    #Testing gameBoardBaseLogic, should probably be moved out of hex tests        
    def testCreateBoardArrayAfterHoneyAdded(self):
        sumHoneySpots = 0
        boardSize = (2, 2)
        totalHoney = 2
        arr = self.baseLogic.CreateBoardArray(boardSize, GameBoardBase.EMPTY_SPOT)
        self.baseLogic.AddHoneyToArray(arr, totalHoney)
        for i in arr:
            for j in i:
                if j == GameBoardBase.HONEY_SPOT:
                    sumHoneySpots += 1
                
        self.assertEqual(sumHoneySpots, totalHoney)

    def testAddHoneyToTileAt00and01(self):
        sum = 0
        expected = 3
        boardSize = (2, 2)        
        
        arr = self.baseLogic.CreateBoardArray(boardSize, GameBoardBase.EMPTY_SPOT)
        self.baseLogic.AddHoneyToTile(arr, 0, 0)
        self.baseLogic.AddHoneyToTile(arr, 0, 1)
        for i in arr:
            for j in i:
                if j != GameBoardBase.HONEY_SPOT:
                    sum += j
                
        self.assertEqual(sum, expected)
        
    def testAddHoneyToTileAt00and11(self):
        sum = 0
        expected = 4
        boardSize = (2, 2)        
        
        arr = self.baseLogic.CreateBoardArray(boardSize, GameBoardBase.EMPTY_SPOT)
        self.baseLogic.AddHoneyToTile(arr, 0, 0)
        self.baseLogic.AddHoneyToTile(arr, 1, 1)
        for i in arr:
            for j in i:
                if j != GameBoardBase.HONEY_SPOT:
                    sum += j
                
        self.assertEqual(sum, expected)
        
    def testAddHoneyToTileAt00and11and20(self):
        sum = 0
        expected = 8
        boardSize = (3, 3)        
        
        arr = self.baseLogic.CreateBoardArray(boardSize, GameBoardBase.EMPTY_SPOT)
        self.baseLogic.AddHoneyToTile(arr, 0, 0)
        self.baseLogic.AddHoneyToTile(arr, 1, 1)
        self.baseLogic.AddHoneyToTile(arr, 2, 0)
        for i in arr:
            for j in i:
                if j != GameBoardBase.HONEY_SPOT:
                    sum += j
                
        self.assertEqual(sum, expected)
           
    def testCheckDisplayBoard(self):
        boardSize = self.baseLogic.BoardSize()
        expected = boardSize[0] * boardSize[1] * GameBoardBase.NOT_VISIBLE
        sum = 0
        
        for i in self.baseLogic.displayBoard:
            for j in i:
                sum += j
                
        self.assertEqual(sum, expected)
        
        self.assertEqual(len(self.baseLogic.displayBoard), boardSize[0])
        
        for innerArray in self.baseLogic.displayBoard:
            self.assertEqual(len(innerArray), boardSize[1])
        
    def testCheckHiddenBoard(self):
        sum = 0
        expected = self.baseLogic.TotalHoney()
        boardSize = self.baseLogic.BoardSize()
        
        for i in self.baseLogic.hiddenBoard:
            for j in i:
                if j == GameBoardBase.HONEY_SPOT:
                    sum += 1
                
        self.assertEqual(sum, expected)
        
        self.assertEqual(len(self.baseLogic.hiddenBoard), boardSize[0])
        
        for innerArray in self.baseLogic.hiddenBoard:
            self.assertEqual(len(innerArray), boardSize[1])
            
    def testDisplayVisibleSpotsOnEmptyBoard(self):
        boardSum = 0
        expectedBoardSum = 0
        expectedPlayerScore = 0
        boardSize = (2, 2)
        
        refArray = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.EMPTY_SPOT)
        updateArr = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.NOT_VISIBLE)
        self.baseLogic.DisplayVisibleSpots(self.baseLogic.playerOne, updateArr, refArray, 0, 0)
        for i in updateArr:
            for j in i:
                boardSum += j
                
        self.assertEqual(boardSum, expectedBoardSum)
        self.assertEqual(self.baseLogic.playerOneScore, expectedPlayerScore)
        
    def testDisplayVisibleSpotsOnCornerNotTouchingHoney(self):
        boardSum = 0
        expectedBoardSum = gameBoardBase.GameBoardBase.NOT_VISIBLE + 1 + 1 + 0 # Honey wont be visible, two adjacent tiles will be (1) and the tile displayed will be (0)
        expectedPlayerScore = 0
        boardSize = (2, 2)        
        
        refArray = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.EMPTY_SPOT)
        updateArr = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.NOT_VISIBLE)
        self.baseLogic.AddHoneyToTile(refArray, 1, 0)
        self.baseLogic.DisplayVisibleSpots(self.baseLogic.playerOne, updateArr, refArray, 0, 1)
        for i in updateArr:
            for j in i:
                boardSum += j
                
        self.assertEqual(boardSum, expectedBoardSum)
        self.assertEqual(self.baseLogic.playerOneScore, expectedPlayerScore)
        
    def testDisplayVisibleSpotsOnCornerTouchingHoney(self):
        boardSum = 0
        expectedBoardSum = gameBoardBase.GameBoardBase.NOT_VISIBLE * 3 + 1 # Only the spot displayed will be visible because it will be next to the honey
        expectedPlayerScore = 0
        boardSize = (2, 2)        
        
        refArray = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.EMPTY_SPOT)
        updateArr = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.NOT_VISIBLE)
        self.baseLogic.AddHoneyToTile(refArray, 0, 0)
        self.baseLogic.DisplayVisibleSpots(self.baseLogic.playerOne, updateArr, refArray, 0, 1)
        for i in updateArr:
            for j in i:
                boardSum += j
                
        self.assertEqual(boardSum, expectedBoardSum)
        self.assertEqual(self.baseLogic.playerOneScore, expectedPlayerScore)
        
    def testDisplayVisibleSpotsOnHoney(self):
        boardSum = 0
        expectedBoardSum = gameBoardBase.GameBoardBase.NOT_VISIBLE * 3 + gameBoardBase.GameBoardBase.HONEY_SPOT # Spot choosen is honey
        expectedPlayerScore = 1
        boardSize = (2, 2)        
        
        refArray = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.EMPTY_SPOT)
        updateArr = self.baseLogic.CreateBoardArray(boardSize, gameBoardBase.GameBoardBase.NOT_VISIBLE)
        self.baseLogic.AddHoneyToTile(refArray, 0, 0)
        self.baseLogic.DisplayVisibleSpots(self.baseLogic.playerOne, updateArr, refArray, 0, 0)
        for i in updateArr:
            for j in i:
                boardSum += j
                
        self.assertEqual(boardSum, expectedBoardSum)
        self.assertEqual(self.baseLogic.playerOneScore, expectedPlayerScore)
        
    def testMakeMovePlayFullGame(self):
        honeySum = 0                                                        
        
        while self.baseLogic.CheckWinner(self.baseLogic.playersTurn) == False:
            currentPlayer = self.baseLogic.playersTurn
            x = 0
            y = 0
            while x < len(self.baseLogic.displayBoard):
                while y < len(self.baseLogic.displayBoard[x]):
                    if self.baseLogic.displayBoard[x][y] == gameBoardBase.GameBoardBase.NOT_VISIBLE:
                        break
                    else:
                        y += 1
                if y < len(self.baseLogic.displayBoard[x]) and self.baseLogic.displayBoard[x][y] == gameBoardBase.GameBoardBase.NOT_VISIBLE:
                    break
                else:
                    x += 1
                    y = 0
            self.assertTrue(self.baseLogic.PlayersTurn(currentPlayer))
            self.baseLogic.MakeMove(currentPlayer, x, y)
            self.assertFalse(self.baseLogic.PlayersTurn(currentPlayer))
        
        for i in self.baseLogic.displayBoard:
            for j in i:
                if j == GameBoardBase.HONEY_SPOT:
                    honeySum += 1    
        self.assertEqual(honeySum, self.baseLogic.playerOneScore + self.baseLogic.playerTwoScore)
        
    def testGetPlayerScore(self):
        self.assertEqual(0, self.baseLogic.GetPlayerScore(1))
        self.assertEqual(0, self.baseLogic.GetPlayerScore('a'))
        
        self.baseLogic.playerOneScore = 1
        self.baseLogic.playerTwoScore = 2
        self.assertEqual(1, self.baseLogic.GetPlayerScore(1))
        self.assertEqual(2, self.baseLogic.GetPlayerScore('a'))
        
    def testGetPlayerScoreForAPlayerThatDoesntExist(self):
        self.assertFalse(self.baseLogic.GetPlayerScore(123123)) 
        
    def testGetOtherPlayerScore(self):
        self.assertEqual(0, self.baseLogic.GetOtherPlayerScore(1))
        self.assertEqual(0, self.baseLogic.GetOtherPlayerScore('a'))
        
        self.baseLogic.playerOneScore = 1
        self.baseLogic.playerTwoScore = 2
        self.assertEqual(2, self.baseLogic.GetOtherPlayerScore(1))
        self.assertEqual(1, self.baseLogic.GetOtherPlayerScore('a'))
        
    def testGetOtherPlayerScoreForAPlayerThatDoesntExist(self):
        self.assertFalse(self.baseLogic.GetOtherPlayerScore(123123))
        
    def testGetPlayerName(self):
        self.assertEqual("You", self.baseLogic.GetPlayerName(1))
        self.assertEqual("You", self.baseLogic.GetPlayerName('a'))
        
        self.baseLogic.playerOneName = "one"
        self.baseLogic.playerTwoName = "two"
        self.assertEqual("one", self.baseLogic.GetPlayerName(1))
        self.assertEqual("two", self.baseLogic.GetPlayerName('a'))
        
    def testGetPlayerScoreForAPlayerThatDoesntExist(self):
        self.assertFalse(self.baseLogic.GetPlayerName(123123))
        
    def testGetOtherPlayerName(self):
        self.assertEqual("Opponent", self.baseLogic.GetOtherPlayerName(1))
        self.assertEqual("Opponent", self.baseLogic.GetOtherPlayerName('a'))
        
        self.baseLogic.playerOneName = "one"
        self.baseLogic.playerTwoName = "two"
        self.assertEqual("two", self.baseLogic.GetOtherPlayerName(1))
        self.assertEqual("one", self.baseLogic.GetOtherPlayerName('a'))
        
    def testGetPlayerScoreForAPlayerThatDoesntExist(self):
        self.assertFalse(self.baseLogic.GetOtherPlayerName(123123)) 
        
    def testPlayersTurn(self):
        self.assertTrue(self.baseLogic.PlayersTurn(1))
        self.assertFalse(self.baseLogic.PlayersTurn('a'))
        self.assertFalse(self.baseLogic.PlayersTurn('b')) # Player does not exist
        
        self.baseLogic.playersTurn = 'a'
        self.assertFalse(self.baseLogic.PlayersTurn(1))
        self.assertTrue(self.baseLogic.PlayersTurn('a'))
        self.assertFalse(self.baseLogic.PlayersTurn('b')) # Player still does not exist
        
    def testPlayersTurnForUnsetPlayers(self):
        playerOneId = 1
        playerTwoId = 2
        
        game = GameBoardHex()
        self.assertEqual(game.playersTurn, None)
        self.assertFalse(game.PlayersTurn(game.playerOne))
        self.assertFalse(game.PlayersTurn(game.playerTwo))
        self.assertEqual(game.playersTurn, None)
        
        self.assertTrue(game.SetPlayer(playerOneId))
        self.assertEqual(game.playersTurn, None)
        self.assertFalse(game.PlayersTurn(game.playerOne))
        self.assertFalse(game.PlayersTurn(game.playerTwo))
        self.assertEqual(game.playersTurn, None)
        
        self.assertTrue(game.SetPlayer(playerTwoId))
        self.assertEqual(game.playersTurn, None) # playersTurn is still None until the function PlayersTurn is called after the second player's id is set
        self.assertTrue(game.PlayersTurn(game.playerOne))
        self.assertFalse(game.PlayersTurn(game.playerTwo))
        self.assertEqual(game.playersTurn, game.playerOne)

    def testCheckWinner(self):
        self.assertFalse(self.baseLogic.CheckWinner(1))
        self.assertFalse(self.baseLogic.CheckWinner('a'))
        
        self.baseLogic.playerOneScore = int(self.baseLogic.TotalHoney() / 2)
        self.baseLogic.playerTwoScore = int(self.baseLogic.TotalHoney() / 2)
        self.assertFalse(self.baseLogic.CheckWinner(1))
        self.assertFalse(self.baseLogic.CheckWinner('a'))
        
        self.baseLogic.playerOneScore = int(self.baseLogic.TotalHoney() / 2) + 1
        self.baseLogic.playerTwoScore = int(self.baseLogic.TotalHoney() / 2)
        self.assertEqual(self.baseLogic.CheckWinner(1), "You")
        self.assertEqual(self.baseLogic.CheckWinner('a'), "Opponent")
        
        self.baseLogic.playerOneScore = int(self.baseLogic.TotalHoney() / 2)
        self.baseLogic.playerTwoScore = int(self.baseLogic.TotalHoney() / 2) + 1
        self.assertEqual(self.baseLogic.CheckWinner(1), "Opponent")
        self.assertEqual(self.baseLogic.CheckWinner('a'), "You")
        
    def testCheckWinnerThatDoesNotExist(self):
        self.assertFalse(self.baseLogic.CheckWinner(123123))
                    

if __name__ == '__main__':
    unittest.main()
