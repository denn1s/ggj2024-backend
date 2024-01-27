import { Router } from 'itty-router'
const { v4: uuid } = require('uuid')

// Create a new router
const router = Router()

// Define the /game/start POST endpoint
router.post('/game/start', async request => {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
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

  return new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
})

// Define the /game/:code/join POST endpoint
router.post('/game/:code/join', async request => {
  const { code } = request.params;
  const requestBody = await request.json();
  const nickname = requestBody.nickname; // Assuming the JSON body has a 'nickname' property

  // Create a response object with gameId and a randomly generated playerId
  const response = {
    playerId: '219371fe',
    gameId: '11cef786'
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/round/start POST endpoint
router.post('/game/:gameId/round/start', async request => {
  const { gameId } = request.params

  // Create a response object with fixed roundId
  const response = {
    roundId: '1231fa'
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

router.get('/game/:gameId', async request => {
  const { gameId } = request.params

  // Sample response data
  const response = {
    activeRoundId: '123',
    gameStatus: 'IN_PROGRESS',
    players: [
      { playerId: '219371fe', nickname: 'Oscar' },
      { playerId: '66a71fe', nickname: 'Rod' }
    ]
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/round/:roundId GET endpoint
router.get('/game/:gameId/round/:roundId', async request => {
  const { gameId, roundId } = request.params

  // Sample response data
  const response = {
    aye: ['219371fe'],
    nay: ['66a71fe'],
    setup: null,
    punchline: null
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/rounds GET endpoint
router.get('/game/:gameId/rounds', async request => {
  const { gameId } = request.params

  // Sample response data
  const response = [
    { roundId: '442', ayeCount: 1, nayCount: 1 },
    { roundId: '123', ayeCount: 10, nayCount: 2 }
  ]

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/round/:roundId/finish POST endpoint
router.post('/game/:gameId/round/:roundId/finish', async request => {
  const { gameId, roundId } = request.params

  // Sample response data
  const response = {
    ayeCount: 1,
    nayCount: 1
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

router.post('/game/:gameId/finish', async request => {
  const { gameId } = request.params

  // Sample response data
  const response = [
    { roundId: '442', ayeCount: 1, nayCount: 1 },
    { roundId: '123', ayeCount: 10, nayCount: 2 }
  ]

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

router.post('/game/:gameId/round/:roundId/player/:playerId/vote', async request => {
  const { gameId, roundId, playerId } = request.params
  const requestBody = await request.json()
  const vote = requestBody.vote

  // Implement logic here to handle the vote
  // For example, record the vote in a database or another storage system

  // Return an empty object
  return new Response('{}', {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/round/:roundId/player/:playerId/joke POST endpoint
router.post('/game/:gameId/round/:roundId/player/:playerId/joke', async request => {
  const { gameId, roundId, playerId } = request.params
  const requestBody = await request.json()

  // Extracting setup and punchline from the request body
  const setup = requestBody.setup
  const punchline = requestBody.punchline

  // Implement logic here to handle the joke submission
  // For example, store the joke in a database or process it further

  // Assuming a successful operation, return an empty object
  return new Response('{}', {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})

// Define the /game/:gameId/round/:roundId/player/:playerId GET endpoint
router.get('/game/:gameId/round/:roundId/player/:playerId', async request => {
  const { gameId, roundId, playerId } = request.params

  // Sample response data
  const response = {
    role: 'COMEDIAN',
    setups: [
      "Why don't eggs tell jokes?",
      "How does a penguin build its house?",
      "I'm reading a book on anti-gravity.",
      "Did you hear about the mathematician who’s afraid of negative numbers?",
      "Why don’t scientists trust atoms?",
      "What do you call fake spaghetti?",
      "How do you organize a space party?",
      "Why couldn't the bicycle stand up by itself?",
      "What did the janitor say when he jumped out of the closet?",
      "What do you call cheese that isn't yours?"
    ],
    punchlines: [
      "Because they might crack up.",
      "Igloos it together.",
      "It's impossible to put down.",
      "He’ll stop at nothing to avoid them.",
      "Because they make up everything.",
      "An impasta.",
      "You planet.",
      "It was two tired.",
      "Supplies!",
      "Nacho cheese."
    ]
  }

  return new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
})


// Fallback for all other GET requests
router.all('*', () => new Response('Not Implemented', { status: 501 }))

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})

