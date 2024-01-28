-- Drop tables if they exist to avoid errors
DROP TABLE IF EXISTS Vote;
DROP TABLE IF EXISTS Punchline;
DROP TABLE IF EXISTS Setup;
DROP TABLE IF EXISTS Round;
DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS Game;

-- Game table
CREATE TABLE IF NOT EXISTS Game (
    gameId VARCHAR(36) PRIMARY KEY,
    code VARCHAR(4),
    status VARCHAR(12),
    activeRound VARCHAR(36) NULL
);

-- Player table
CREATE TABLE IF NOT EXISTS Player (
    playerId VARCHAR(36) PRIMARY KEY,
    nickname VARCHAR(255),
    gameId VARCHAR(36)
);

-- Round table
CREATE TABLE IF NOT EXISTS Round (
    roundId VARCHAR(36) PRIMARY KEY,
    gameId VARCHAR(36),
    currentComedian VARCHAR(36),
		setup TEXT NULL,
		punchline TEXT NULL
);

-- Vote table
CREATE TABLE IF NOT EXISTS Vote (
    voteId INT AUTO_INCREMENT PRIMARY KEY,
    roundId VARCHAR(36),
    playerId VARCHAR(36),
    vote VARCHAR(3) CHECK (vote IN ('Aye', 'Nay')),
    UNIQUE (roundId, playerId)
);

-- Setup table
CREATE TABLE IF NOT EXISTS Setup (
    setupId INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT
);

-- Punchline table
CREATE TABLE IF NOT EXISTS Punchline (
    punchlineId INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT
);

