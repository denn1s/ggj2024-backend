import { Router } from 'itty-router'
import htmlContent from './html'
const { v4: uuid } = require('uuid')

const router = Router()
const headers = {
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	},
}


 router.get('/', () => {
	return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
})

router.post('/game/start', async (request, env) => {
	const characters = 'abcdefghijklmnopqrstuvwxyz123456789'
  let code = ''
  const charactersLength = characters.length
	for (let i = 0; i < 4; i++) {
		code += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	const gameId = uuid()

  const json = JSON.stringify({
    gameId,
    code
  }, null, 2);

	await env.DB.prepare(`INSERT INTO Game (gameId, code, status) VALUES (?1, ?2, 'NOT_STARTED')`).bind(gameId, code).run()

  return new Response(json, headers)
})

// Define the /game/:code/join POST endpoint
router.post('/game/:code/join', async (request, env) => {
  const { code } = request.params
  const requestBody = await request.json()
  const nickname = requestBody.nickname // Assuming the JSON body has a 'nickname' property

	const playerId = uuid()
	const { gameId } = await env.DB.prepare(
  	'SELECT gameId FROM Game WHERE code = ?'
	).bind(code.toLowerCase()).first()

	if (!gameId) {
		return new Response(JSON.stringify({}), headers)
	}

	await env.DB.prepare(`INSERT INTO Player (playerId, nickname, gameId) VALUES (?1, ?2, ?3)`).bind(playerId, nickname, gameId).run();
  // Create a response object with gameId and a randomly generated playerId
  const response = {
    playerId,
    gameId
  }

  return new Response(JSON.stringify(response), headers)
})

// Define the /game/:gameId/round/start POST endpoint
router.post('/game/:gameId/round/start', async (request, env) => {
  const { gameId } = request.params
  let currentComedianId
	try {
		const requestBody = await request.json()
  	currentComedianId = requestBody.currentComedianId
	} catch {}

	if (!currentComedianId) {
		const stmt = env.DB.prepare('SELECT playerId FROM Player WHERE gameId = ?')
		const { results } = await stmt.bind(gameId).all()
		const randomIndex = Math.floor(Math.random() * results.length)
    currentComedianId = results[randomIndex].playerId
	}
	const stmt2 = env.DB.prepare(`UPDATE Game SET status = 'IN_PROGRESS' WHERE gameId = ?`)
	await stmt2.bind(gameId).run()

	const roundId = uuid()

	await env.DB.prepare(`INSERT INTO Round (roundId, gameId, currentComedian) VALUES (?1, ?2, ?3)`).bind(roundId, gameId, currentComedianId).run()

	const stmt = env.DB.prepare('UPDATE Game SET activeRound = ? WHERE gameId = ?')
	await stmt.bind(roundId, gameId).run()

  const response = {
    roundId
  }

  return new Response(JSON.stringify(response), headers)
})

router.get('/game/:gameId', async (request, env) => {
  const { gameId } = request.params
	// Prepare the statement to select game details and all associated players
	const stmt = env.DB.prepare(`
		SELECT
			g.activeRound AS activeRoundId,
			g.status AS gameStatus,
			p.playerId,
			p.nickname
		FROM Game g
		LEFT JOIN Player p ON g.gameId = p.gameId
		WHERE g.gameId = ?
	`);

	const { results } = await stmt.bind(gameId).all();

	const response = {
		activeRoundId: results.length > 0 ? results[0].activeRoundId : null,
		gameStatus: results.length > 0 ? results[0].gameStatus : null,
		players: results.map(row => ({ playerId: row.playerId, nickname: row.nickname }))
	};

  return new Response(JSON.stringify(response), headers)
})

router.get('/game/:gameId/round/:roundId', async (request, env) => {
  const { gameId, roundId } = request.params

	const stmt = env.DB.prepare(`
		SELECT
			r.setup,
			r.punchline,
			COUNT(CASE WHEN v.vote = 'Aye' THEN 1 END) AS ayeCount,
			COUNT(CASE WHEN v.vote = 'Nay' THEN 1 END) AS nayCount,
			r.currentComedian
		FROM Round r
		LEFT JOIN Vote v ON r.roundId = v.roundId
		WHERE r.roundId = ?
		GROUP BY r.roundId
	`)

	const result = await stmt.bind(roundId).first()

	// Construct the response object
	const response = {
		ayeCount: result.ayeCount,
		nayCount: result.nayCount,
		setup: result.setup || '',
		punchline: result.punchline || '',
		comedianId: result.currentComedian
	}

  return new Response(JSON.stringify(response), headers)
})

// Define the /game/:gameId/rounds GET endpoint
router.get('/game/:gameId/rounds', async (request, env) => {
  const { gameId } = request.params
	const stmt = env.DB.prepare(`
		SELECT
			r.roundId,
			r.currentComedian AS comedianId,
			COUNT(CASE WHEN v.vote = 'Aye' THEN 1 END) AS ayeCount,
			COUNT(CASE WHEN v.vote = 'Nay' THEN 1 END) AS nayCount
		FROM Round r
		LEFT JOIN Vote v ON r.roundId = v.roundId
		WHERE r.gameId = ?
		GROUP BY r.roundId
	`)

	// Execute the statement
	const { results } = await stmt.bind(gameId).all()

	// Construct the response array
	const response = results.map(round => ({
		roundId: round.roundId,
		ayeCount: round.ayeCount,
		nayCount: round.nayCount,
		comedianId: round.comedianId
	}))

  return new Response(JSON.stringify(response), headers)
})

router.post('/game/:gameId/finish', async (request, env) => {
  const { gameId } = request.params
	const stmt = env.DB.prepare(`UPDATE Game SET status = 'FINISHED', activeRound = NULL  WHERE gameId = ?`)
	await stmt.bind(gameId).run()
	const stmt2 = env.DB.prepare(`
		SELECT
			r.roundId,
			r.currentComedian AS comedianId,
			COUNT(CASE WHEN v.vote = 'Aye' THEN 1 END) AS ayeCount,
			COUNT(CASE WHEN v.vote = 'Nay' THEN 1 END) AS nayCount
		FROM Round r
		LEFT JOIN Vote v ON r.roundId = v.roundId
		WHERE r.gameId = ?
		GROUP BY r.roundId
	`)

	// Execute the statement
	const { results } = await stmt2.bind(gameId).all()

	// Construct the response array
	const response = results.map(round => ({
		roundId: round.roundId,
		ayeCount: round.ayeCount,
		nayCount: round.nayCount,
		comedianId: round.comedianId
	}))

  return new Response(JSON.stringify(response), headers)
})

router.post('/game/:gameId/round/:roundId/player/:playerId/vote', async (request, env) => {
  const { gameId, roundId, playerId } = request.params
  const requestBody = await request.json()
  const vote = requestBody.vote

	const stmt = env.DB.prepare(`INSERT INTO Vote (roundId, playerId, vote) VALUES (?1, ?2, ?3)`);
	await stmt.bind(roundId, playerId, vote).run();

  return new Response(JSON.stringify({
		gameId, roundId, playerId
	}), headers)
})

// Define the /game/:gameId/round/:roundId/player/:playerId/joke POST endpoint
router.post('/game/:gameId/round/:roundId/player/:playerId/joke', async (request, env) => {
  const { gameId, roundId, playerId } = request.params
  const requestBody = await request.json()

  // Extracting setup and punchline from the request body
  const setup = requestBody.setup
  const punchline = requestBody.punchline

	const stmt = env.DB.prepare('UPDATE Round SET setup = ?, punchline = ? WHERE roundId = ?')
	await stmt.bind(setup, punchline, roundId).run()

  // Assuming a successful operation, return an empty object
  return new Response(JSON.stringify({
		setup, punchline
	})  , headers)
})

// Define the /game/:gameId/round/:roundId/player/:playerId GET endpoint
router.get('/game/:gameId/round/:roundId/player/:playerId', async (request, env) => {
  const { gameId, roundId, playerId } = request.params

	const stmt = env.DB.prepare(`
		SELECT
			CASE
				WHEN currentComedian = ? THEN 'YES'
				ELSE 'NO'
			END AS isComedian,
			setup,
			punchline
		FROM Round
		WHERE roundId = ?
	`);

	const result = await stmt.bind(playerId, roundId).first()
	const isComedian = result && result.isComedian === 'YES'
	const setup = result && result.setup
	const punchline = result && result.punchline

	let response
	if (isComedian) {
		const setupStmt = env.DB.prepare(`
			SELECT text FROM Setup
			ORDER BY RANDOM()
			LIMIT 5
		`);

		const { results: setups } = await setupStmt.all();

		const punchlineStmt = env.DB.prepare(`
			SELECT text FROM Punchline
			ORDER BY RANDOM()
			LIMIT 5
		`);

		// Execute the punchline statement
		const { results: punchlines } = await punchlineStmt.all();

		// Construct the response object
		response = {
			role: 'COMEDIAN',
			setups: setups.map(s => s.text),
			punchlines: punchlines.map(p => p.text)
		}
  } else {
		const stmt = env.DB.prepare(`
			SELECT COUNT(*) AS voteCount
				FROM Vote
			WHERE roundId = ? AND playerId = ?
		`);

		// Execute the statement
		const result = await stmt.bind(roundId, playerId).first();

		// Check if the player has voted
		const hasVoted = result.voteCount > 0;
		response = {
			role: 'AUDIENCE',
			hasVoted,
			setup,
			punchline
		}
	}

  return new Response(JSON.stringify(response), headers)
})


// Fallback for all other GET requests
// router.all('*', () => new Response('Not Implemented', { status: 501 }))
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Adjust this to be more restrictive if necessary
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Options Handler - Respond to preflight requests
router.options('*', () => {
  return new Response(null, {
    headers: corsHeaders
  })
})

export default {
  async fetch(request, env, ctx) {
		return router.handle(request, env, ctx).catch((e) => {
						console.error('Error: ', e)
							return new Response('{ "status": "Error" }', { ...headers, status: 500 })
		})
  }
}

