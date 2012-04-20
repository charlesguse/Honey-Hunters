import unittest
import game_board_unittests
import game_management_unittests

if __name__ == '__main__':
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(game_board_unittests.TestGameBoardHex))
    suite.addTest(unittest.makeSuite(game_management_unittests.TestGameManagement))
    
    unittest.TextTestRunner(verbosity=1).run(suite)