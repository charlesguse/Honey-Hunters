from google.appengine.ext.webapp.util import run_wsgi_app
import web
import simplejson as json
import game
import game.gameManagement
import game.gameBoardHex
import uuid                                 

accessControlAllowOriginValue = "*" #"http://nonegames.net"
        
urls = (
    '/HH/Debug/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersDebug',
    '/HH/Status/(.*)/(.*)', 'HoneyHuntersGameStatus',
    '/HH/Move/(.*)/(.*)/(\d*)/(\d*)', 'HoneyHuntersMove',
    '/HH/SetupHex/(.*)/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/SetupHex/(.*)', 'HoneyHuntersSetupHexGame',
    '/HH/TotalGames', 'HoneyHuntersTotalGames'
)
app = web.application(urls, globals())
games = game.gameManagement.GameManagement()

def jsonDump(func):
    def jsonizeFunc(*args, **kwargs):
        return json.dumps(func(*args, **kwargs))
    return jsonizeFunc

class HoneyHuntersDebug:
    @jsonDump      
    def GET(self, game, playerId, x, y):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        #if not game: 
        #    game = -1
        #if not playerId:
        #    playerId = -2
        #if not move:
        #    move = -3
        return {'Game' : game, 'Player' : playerId, 'Move' : (int(x), int(y))}
        
class HoneyHuntersTotalGames:
    @jsonDump      
    def GET(self):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        return {'TotalGames' : len(games.games)}
        
class HoneyHuntersGameStatus:
    @jsonDump        
    def GET(self, gameId, playerId):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if games.Validate(gameId, playerId) == False:
            return {'GameStatus' : False}
        try:
            currentGame = games.GetGame(gameId)
            return {
                'GameStatus' : True,
                'Turn' : currentGame.PlayersTurn(playerId),
                'PlayerName' : currentGame.GetPlayerName(playerId),
                'PlayerScore' : currentGame.GetPlayerScore(playerId),
                'OpponentName' : currentGame.GetOtherPlayerName(playerId),
                'OpponentScore' : currentGame.GetOtherPlayerScore(playerId),
                'Board' : currentGame.displayBoard,
                'Winner' : currentGame.CheckWinner(playerId),
                'GameType' : currentGame.__class__.__name__ 
            }
        except KeyError:
            return {'GameStatus' : False}

class HoneyHuntersMove:
    @jsonDump       
    def GET(self, gameId, playerId, x, y):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if games.Validate(gameId, playerId) == False or not x or not y:
            return {'MoveMade' : False}
        currentGame = games.GetGame(gameId)
        return {'MoveMade' : currentGame.MakeMove(playerId, int(x), int(y))}     

class HoneyHuntersSetupHexGame:
    @jsonDump       
    def GET(self, gameId, name = game.gameBoardBase.GameBoardBase.NAME_NOT_SET):
        web.header("Access-Control-Allow-Origin", accessControlAllowOriginValue)
        if not gameId: 
            return {'Setup' : False}
        if not name:
            name = game.gameBoardBase.GameBoardBase.NAME_NOT_SET
        if games.GameExists(gameId) == False:
            newgame = game.gameBoardHex.GameBoardHex()
            games.NewGame(gameId, newgame)
        
        currentGame = games.GetGame(gameId)
        if currentGame.PlayersExist() == False:
            playerId = str(uuid.uuid4())
            if currentGame.SetPlayer(playerId, name):
                return {'Setup' : True, 'PlayerId' : playerId}
        return {'Setup' : False}
        
def main():
    application = app.wsgifunc()
    run_wsgi_app(application)

if __name__ == '__main__':
    main()
    #app.run()
