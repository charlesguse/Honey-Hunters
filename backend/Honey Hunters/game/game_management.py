#import game_board_base
from google.appengine.api import memcache
import uuid

class GameManagement:
    TTL = 1200 # seconds
    ID_NAMESPACE = "id"
    NAME_NAMESPACE = "name"
        
    def NewGame(self, gameId, game):
        return memcache.add(str(gameId), game, time=GameManagement.TTL, namespace=GameManagement.ID_NAMESPACE)
        
    def UpdateGame(self, gameId, game):
        return memcache.set(str(gameId), game, time=GameManagement.TTL, namespace=GameManagement.ID_NAMESPACE)
    
    def Validate(self, game, playerId = None):
        if playerId == None:
            return game is not None
        elif playerId != None and game is not None:
            return game.PlayerExists(playerId)
        else:
            return False
    
    #def GameExists(self, gameId):
    #    return memcache.get(str(gameId), namespace=GameManagement.ID_NAMESPACE) is not None
        
    def GetGame(self, gameId):
        return memcache.get(str(gameId), namespace=GameManagement.ID_NAMESPACE)
            
    def EndGame(self, gameId):
        code = memcache.delete(str(gameId), namespace=GameManagement.ID_NAMESPACE)
        #if code == 0:
            #log DELETE_NETWORK_FAILURE
        #if code == 1:
            #log DELETE_ITEM_MISSING
        #if code == 2:
            #log DELETE_SUCCESSFUL
    
    def SetGameIdFromName(self, game_name):
        game_id = str(uuid.uuid4())
        if memcache.add(str(game_name), game_id, time=GameManagement.TTL, namespace=GameManagement.NAME_NAMESPACE):
            return game_id
        else:
            return None
    
    def GetGameIdFromName(self, game_name):
        return memcache.get(str(game_name), namespace=GameManagement.NAME_NAMESPACE)
        
    def RemoveGameName(self, game_name):
        code = memcache.delete(str(game_name), namespace=GameManagement.NAME_NAMESPACE)
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
        