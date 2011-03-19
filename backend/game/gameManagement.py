import gameBoardBase

class GameManagement:
    
    def __init__(self):   
        self.games = {}
        
    def NewGame(self, gameId, game):
        #if gameId in self.games:
        if self.GameExists(gameId):
            return False
        else:
            self.games[gameId] = game
            return True
    
    def Validate(self, gameId, playerId = None):
        gameExists = self.GameExists(gameId)
        if playerId == None:
            return gameExists
        elif playerId != None and gameExists == True:
            game = self.GetGame(gameId)
            return game.PlayerExists(playerId)
        else:
            return False 
    
    def GameExists(self, gameId):
        return gameId in self.games
        
    def GetGame(self, gameId):
        try:
            return self.games[gameId]
        except KeyError:
            return False
        
    def GetPlayerPoints(self, gameId, playerId):
        game = self.GetGame(gameId)
        if game != False:
            return game.GetPlayerScore(playerId)
        else:
            return False
            
    def EndGame(self, gameId):
        if self.GameExists(gameId):
            del self.games[gameId]
        