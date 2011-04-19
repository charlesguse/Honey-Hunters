from random import *

class GameBoardBase:
    EMPTY_SPOT = 0
    HONEY_SPOT = -1
    NOT_VISIBLE = -2
    PLAYER_NOT_SET = None
    NAME_NOT_SET = None

    def __init__(self, p1 = PLAYER_NOT_SET, p2 = PLAYER_NOT_SET, n1 = NAME_NOT_SET, n2 = NAME_NOT_SET):   
        self.playerOne = p1
        self.playerTwo = p2
        self.playerOneName = n1
        self.playerTwoName = n2
        
        self.playersTurn = p1

        self.playerOneScore = 0
        self.playerTwoScore = 0

        self.hiddenBoard = self.CreateHiddenBoard();
        self.displayBoard = self.CreateDisplayBoard();
        
    def BoardSize(self):
        raise NotImplementedError("Subclass must implement abstract method")
    
    def TotalHoney(self):
        raise NotImplementedError("Subclass must implement abstract method")
    
    def DisplayVisibleSpots(self, refArray, updateArr, x, y):
        raise NotImplementedError("Subclass must implement abstract method")
    
    def AddHoneyToTile(self, arr, x, y):
        raise NotImplementedError("Subclass must implement abstract method")

    def CheckGameOver(self):
        return (self.playerOneScore > (self.TotalHoney() / 2)) or (self.playerTwoScore > (self.TotalHoney() / 2))

    def CheckWinner(self, playerId):
        if self.PlayerExists(playerId) == False:
            return False
            
        if self.playerOneScore > self.TotalHoney() / 2:
            return self.playerOne == playerId
        elif self.playerTwoScore > self.TotalHoney() / 2:
            return self.playerTwo == playerId
        else:
            return False 

    def SetPlayer(self, playerId, playerName = NAME_NOT_SET):
        if self.PlayerExists(playerId):
            return False
        elif self.playerOne == GameBoardBase.PLAYER_NOT_SET:
            self.playerOne = playerId
            self.playerOneName = playerName
            return True
        elif self.playerTwo == GameBoardBase.PLAYER_NOT_SET:
            self.playerTwo = playerId
            self.playerTwoName = playerName
            return True
        else:
            return False # If a player cannot be set, return false
            
    def PlayersExist(self):
        return self.playerOne != GameBoardBase.PLAYER_NOT_SET and self.playerTwo != GameBoardBase.PLAYER_NOT_SET
        
    def PlayerExists(self, playerId):
        return playerId != GameBoardBase.PLAYER_NOT_SET and (self.playerOne == playerId or self.playerTwo == playerId)
        
    def PlayersTurn(self, playerId):
        if self.playersTurn == GameBoardBase.PLAYER_NOT_SET and self.PlayersExist():
            self.playersTurn = self.playerOne
        return playerId == self.playersTurn and self.PlayersExist() 

    def GetPlayerScore(self, playerId):
        if self.playerOne == playerId:
            return self.playerOneScore
        elif self.playerTwo == playerId:
            return self.playerTwoScore
        else:
            return False
            
    def GetOtherPlayerScore(self, playerId):
        if self.playerOne == playerId:
            return self.playerTwoScore
        elif self.playerTwo == playerId:
            return self.playerOneScore
        else:
            return False
            
    def GetPlayerName(self, playerId):
        name = GameBoardBase.NAME_NOT_SET
        if self.playerOne == playerId:
            name = self.playerOneName
        elif self.playerTwo == playerId:
            name = self.playerTwoName
        else:
            return False
        
        if name == GameBoardBase.NAME_NOT_SET:
            return 'You'
        else:
            return name
            
    def GetOtherPlayerName(self, playerId):
        name = GameBoardBase.NAME_NOT_SET
        if self.playerOne == playerId:
            name = self.playerTwoName
        elif self.playerTwo == playerId:
            name = self.playerOneName
        else:
            return False
        
        if name == GameBoardBase.NAME_NOT_SET:
            return 'Opponent'
        else:
            return name

    def CreateHiddenBoard(self):
        size = self.BoardSize()
        total_honey = self.TotalHoney()
        
        array = self.CreateBoardArray(size, GameBoardBase.EMPTY_SPOT)
        self.AddHoneyToArray(array, total_honey)
        return array

    def CreateDisplayBoard(self):
        size = self.BoardSize()        
        array = self.CreateBoardArray(size, GameBoardBase.NOT_VISIBLE)
        return array
        
    def MakeMove(self, playerId, x, y):
        if self.displayBoard[x][y] == GameBoardBase.NOT_VISIBLE and self.PlayersTurn(playerId):
            self.DisplayVisibleSpots(playerId, self.displayBoard, self.hiddenBoard, x, y)
            if self.hiddenBoard[x][y] != GameBoardBase.HONEY_SPOT:
                self.SwitchPlayersTurn(playerId)
            return True
        else:
            return False

    def SwitchPlayersTurn(self, playerId):
        if playerId == self.playerOne:
            self.playersTurn = self.playerTwo
        elif playerId == self.playerTwo:
            self.playersTurn = self.playerOne

    def CreateBoardArray(self, size, tile):
        array = []
        for i in xrange(size[0]):
            array.append([])
            for j in xrange(size[1]):
                array[i].append(tile)
        return array
        
    def AddHoneyToArray(self, array, total_honey):
        width = len(array)
        height = len(array[0])
    
        for i in range(total_honey):
            x = int(random() * width)
            y = int(random() * height)
            
            while array[x][y] == GameBoardBase.HONEY_SPOT:
                x = int(random() * width)
                y = int(random() * height)
                
            self.AddHoneyToTile(array, x, y)
        
    def UpdateArrayInBound(self, arr, x, y):
        if 0 <= x and x < len(arr) and 0 <= y and y < len(arr[x]) and arr[x][y] != GameBoardBase.HONEY_SPOT:
            arr[x][y] += 1
