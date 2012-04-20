import gameBoardBase
from google.appengine.api import memcache

class GameManagement:
    TTL = 1200 # seconds
        
    def NewGame(self, gameId, game):
        return memcache.add(str(gameId), game, GameManagement.TTL)
        
    def UpdateGame(self, gameId, game):
        return memcache.set(str(gameId), game, GameManagement.TTL)
    
    def Validate(self, game, playerId = None):
        if playerId == None:
            return game is not None
        elif playerId != None and game is not None:
            return game.PlayerExists(playerId)
        else:
            return False 
    
    def GameExists(self, gameId):
        return memcache.get(str(gameId)) is not None
        
    def GetGame(self, gameId):
        return memcache.get(str(gameId))
            
    def EndGame(self, gameId):
        code = memcache.delete(str(gameId))
        #if code == 0:
            #log DELETE_NETWORK_FAILURE
        #if code == 1:
            #log DELETE_ITEM_MISSING
        #if code == 2:
            #log DELETE_SUCCESSFUL
        
    def TotalGames(self):
        return memcache.get_stats()["items"]
        
    def GetStats(self):
        return memcache.get_stats()
        