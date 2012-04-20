import unittest
import gameBoardUnittests
import gameManagementUnittests

if __name__ == '__main__':
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(gameBoardUnittests.TestGameBoardHex))
    suite.addTest(unittest.makeSuite(gameManagementUnittests.TestGameManagement))
    
    unittest.TextTestRunner(verbosity=1).run(suite)