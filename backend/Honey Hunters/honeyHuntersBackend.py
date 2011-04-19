from google.appengine.ext.webapp.util import run_wsgi_app
import web
import simplejson as json
import game
import game.gameManagement
import game.gameBoardHex
import uuid                                 

accessControlAllowOriginValue = "*" #"http://nonegames.net"
        
urls = (
    '/HH/Status/(.*)/(.*)', 'HoneyHuntersGameStatus',
    '/HH/Status/(.*)', 'HoneyHuntersGameStatusDebug',
    '/HH/Move/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersMove',
    '/HH/SetupHex/(.*)/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/SetupHex/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/TotalGames', 'HoneyHuntersTotalGames',
    '/HH/TotalStatus', 'HoneyHuntersTotalStatus'
)
app = web.application(urls, globals())
games = game.gameManagement.GameManagement()

def jsonDump(func):
    def jsonizeFunc(*args, **kwargs):
        return json.dumps(func(*args, **kwargs))
    return jsonizeFunc
        
class HoneyHuntersTotalGames:
    @jsonDump      
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        return {'TotalGames' : games.TotalGames()}
        
class HoneyHuntersTotalStatus:
    @jsonDump      
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        return games.GetStats()
        
class HoneyHuntersGameStatus:
    @jsonDump        
    def GET(self, gameId, playerId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame, playerId) == False:
            return {'GameStatus' : False}
        else:
            return {
                'GameStatus' : True,
                'GameStart' : currentGame.PlayersExist(),
                'Turn' : currentGame.PlayersTurn(playerId),
                'PlayerName' : currentGame.GetPlayerName(playerId),
                'PlayerScore' : currentGame.GetPlayerScore(playerId),
                'OpponentName' : currentGame.GetOtherPlayerName(playerId),
                'OpponentScore' : currentGame.GetOtherPlayerScore(playerId),
                'Board' : currentGame.displayBoard,
                'GameOver' : currentGame.CheckGameOver(),
                'Winner' : currentGame.CheckWinner(playerId),
                'TotalHoney' : currentGame.TotalHoney(), 
                'GameType' : currentGame.__class__.__name__ 
            }
            
class HoneyHuntersGameStatusDebug:
    @jsonDump        
    def GET(self, gameId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame) == False:
            return {'GameStatus' : False}
        else:
            playerId = currentGame.playerOne
            return {
                'GameStatus' : True,
                'GameStart' : currentGame.PlayersExist(),
                'Turn' : currentGame.PlayersTurn(playerId),
                'PlayerName' : currentGame.GetPlayerName(playerId),
                'PlayerScore' : currentGame.GetPlayerScore(playerId),
                'OpponentName' : currentGame.GetOtherPlayerName(playerId),
                'OpponentScore' : currentGame.GetOtherPlayerScore(playerId),
                'Board' : currentGame.displayBoard,
                'GameOver' : currentGame.CheckGameOver(),
                'Winner' : currentGame.CheckWinner(playerId),
                'TotalHoney' : currentGame.TotalHoney(), 
                'GameType' : currentGame.__class__.__name__ 
            }

class HoneyHuntersMove:
    @jsonDump       
    def GET(self, gameId, playerId, x, y):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        currentGame = games.GetGame(gameId)
        if games.Validate(currentGame, playerId) == False or not x or not y:
            return {'MoveMade' : False}
        else:
            moveMade = currentGame.MakeMove(playerId, int(x), int(y))
            if moveMade == True:
                moveMade = games.UpdateGame(gameId, currentGame)
            return {'MoveMade' : moveMade}     

class HoneyHuntersSetupHexGame:
    @jsonDump       
    def GET(self, gameId, name = game.gameBoardBase.GameBoardBase.NAME_NOT_SET):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not gameId: 
            return {'Setup' : False}

        if games.GameExists(gameId) == False:
            newgame = game.gameBoardHex.GameBoardHex()
            games.NewGame(gameId, newgame)
        
        currentGame = games.GetGame(gameId)
        if currentGame.PlayersExist() == False:
            playerId = str(uuid.uuid4())
            if currentGame.SetPlayer(playerId, name):
                games.UpdateGame(gameId, currentGame)
                return {'Setup' : True, 'PlayerId' : playerId}
        return {'Setup' : False}
        
        
        
def main():
    application = app.wsgifunc()
    run_wsgi_app(application)

if __name__ == '__main__':
    main()
