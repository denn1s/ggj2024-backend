const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Stand-Up Factor[y]</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- Babel is included to allow JSX syntax -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        html, body {
					font-family: monospace;
					min-height: 100dvh;
					min-height: 100vh;
					min-height: 100%;
					padding: 0;
					margin: 0;
					color: white;
        }
				* {
					box-sizing: content-box;
					image-rendering: pixelated;
				}
				main {
					display: flex;
					flex-direction: column;
				}
				section {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					height: 100dvh;
					height: 100vh;
					background-size: 80px 80px;
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAHlJREFUOI1j7Al2/c9ARcCi/u8LisCzrz8YPvOKMKCLowNc6lg+//6DUxM+OVzqmIjSQQJg+fwLuyueff1BlAHo6lg+84pgVYhLnJA6FgYGBrIjAJs6FrhNZEQANkD9SGFgID8CcBpIbgRgNXA0p8DBaE5BuGjI5xQAt452oVtvHwEAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg==');
				}

				.logo {
					width: 210px;
					height: 210px;
				}
				input {
					padding: 10px 20px;
					margin-bottom: 20px;
					border: none;
					border-radius: 2px;
					min-height: 30px;
				}
				button {
					padding: 10px 20px;
					border: none;
					border-radius: 2px;
					min-height: 30px;
				}
				.vote {
					background: transparent;
					border: none;
					outline: none;
					color: transparent;
					background-repeat: no-repeat;
					background-size: cover;
				}
				.vote.aye {
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAAXNSR0IArs4c6QAAAPdJREFUSInllT8OgjAUh38QBk/izA3YiTEmuLGweAJGZwcHDmCMkYVNNsPODZiZXPQUpDjRvLYCxZSJLyFNH2m/tq9/gKVhyYHbZ9uaFJzvDABQH5+CS6hc3ru2rGyTXnguQ5I2ipxb5pAqHPZ8NQdNmZ+Pxmg983PhA4CyshFHjtKPGhkhLAJkfi6U8n8demdMOx+S/4vxpNJlnizuGsqlDmERaK1Eb45p4yliXSZvrjHoIIdmzg/0nOe4u0Tq1wq4Pixghs2lCxcnaQPPZfBcZlRAr0yKkOMkbRBHjlH5LykgPRLr08boy0Sh+VXEAISL3ChEuky+bmtptV+I15sAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg==');
				}
				.vote.nay {
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAAXNSR0IArs4c6QAAAOdJREFUSInllbEKgzAQhv+Wzi6+Q8ns6CQUzObUtyi4+yB9i05uCqVOjs7Sd3BxlFK7hTMmWuWc/CCYC6dfckIO2BsHfaGLk55TkOYVAOBaZwPXIOjipG+zktMLR/pG+XFLqc7tfFHVPNqS3Lowzm1rtrjNSkShN3rfKrYJbTQiUPluXaARwWT+pHhqQ1Sky+eks2LTx7lYfGJaTvpkF5vK1ohAjbWs+sccWMX0NLb5P/Fi8dYocZpXcKQPR/qsAnplUk40SPMKUeixyk1SQGsSDyFZOxPl9f3g/n4q36gt0oucEyrdJz+c7l9k6Fu9/QAAAA5lWElmTU0AKgAAAAgAAAAAAAAA0lOTAAAAAElFTkSuQmCC');
				}

				.vote.aye.chosen:disabled {
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAAXNSR0IArs4c6QAAAN1JREFUSIljYBgFdAKMWEVTQ/5T0xI1hR8Mt6q3oNiFaXFqyP8g6V/UtJdh3VM2DMuZaG0puvnYLcYC4tSzCIoh8+PUs1AwAwMDQ5D0L4ZbDzhQ9LCQ6GYGBgYGhkU3pzHEqWeh0OjyhABeHyMbjs9ycgDBoCYHIAczyRbDNKLTxIBFN6cRDAm8cYysmRSLiQFkJS5CANmRuHyOWoDQMB+ve8oGYcxew8jAQKPERQxAsVhN4QfDuqdsCNdRCcCKTGSAUVartfr8Ry9lKAUwS5HLarrUTgwMDPC4HbkAANC3VN+5HZReAAAADmVYSWZNTQAqAAAACAAAAAAAAADSU5MAAAAASUVORK5CYII=')
				}
			h1 {
					font-size: 24px;
					text-transform: uppercase;
					text-shadow: 3px 4px black;
					opacity: 0.7;
				}

				p {
					font-family: 'monospace';
					font-size: 24px;
					font-style: italic;
					font-weight: bold;
				}

				.vote.nay.chosen:disabled {
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAAXNSR0IArs4c6QAAANlJREFUSIntlbERgyAARb8cMziCprNwArXIAqlcwXmyAlUWSBGdgIIuZgRm8DSVBhWMh2iTvDsPBI6HcH6APwfh6RqLIOtcShJCcXneR66ZuAiyLgpjl16ImiMhFFXb4Pp6eABA9paaIEudfp5q66Y203sUxqjaZr3YJDQhWTmM9/MUkpXGsV/FSwtSRVP5knSVWDe5C6y+WN1OtXQu1m2bZOXw2GB9xlsZBcie/7GoOQDoA+RIRuKEUIiaD6tzRR+ZKrOsvp3O3TRlttJL1YvikNsJ+Jzt7/IG1B1PJSneqfYAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg==');
				}

				.setup, .punchline {
					max-width: 300px;
					border: none;
					margin-bottom: 20px;
					font-weight: bold;
					border: 1px solid white;
    			box-shadow: 3px 4px black;
				}

				.setup {
					background-color: black;
					color: white;
				}

				.punchline {
					background-color: white;
					color: black;
				}

				h3 {
					font-size: 18px;
					opacity: 0.7;
				}
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
		const API = 'https://ggj-make-that-joke.dennis-aldana.workers.dev'
		// const API = 'http://127.0.0.1:8787'

		const post = async (endpoint, body = {}) => {
			const response = await fetch(API + '/game' + endpoint, {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
			})
			return response.json()
		}

		const get = async (endpoint) => {
			const response = await fetch(API + '/game' + endpoint, {
					method: 'GET',
					headers: {
							'Content-Type': 'application/json'
					},
			})
			return response.json()
		}


        function App() {
						const [status, setStatus] = React.useState(0)
						const [playerId, setPlayerId] = React.useState()
						const [gameId, setGameId] = React.useState()
						const [roundId, setRoundId] = React.useState()

            return (
							<main>
								{(() => {
		switch(status) {
			case 0:
		return <JoinScreen next={(gameId_, playerId_) => {
						setPlayerId(playerId_)
						setGameId(gameId_)
						setStatus(1)
		}} />
			case 1:
		return <WaitingScreen gameId={gameId} next={(roundId_) => {
				setRoundId(roundId_)
				setStatus(2)
		}} prevRoundId={roundId} />
			case 2:
		return (
			<PlayerScreen
				playerId={playerId}
				roundId={roundId}
				gameId={gameId}
				next={() => {
					setRoundId(null)
					setStatus(1)
				}}
				finish={() => {
					setStatus(3)
				}}
			/>
		)
			case 3:
				return <EndingScreen />
		}
								})()}
							</main>
						)
        }

		function PlayerScreen({ gameId, playerId, roundId, next, finish }) {
						const timer = React.useRef()
						const roundTimer = React.useRef()
						const [isComedian, setIsComedian] = React.useState(null)
						const [joke, setJoke] = React.useState(null)

						React.useEffect(() => {
						timer.current = setInterval(async () => {
							const response = await get('/' + gameId + '/round/' + roundId + '/player/' + playerId)
							setIsComedian(response.role === 'COMEDIAN')
							setJoke({
								setup: response.setup,
								punchline: response.punchline,
								setups: response.setups,
								punchlines: response.punchlines
							})

							if (response.setup || response.setups) {
								clearInterval(timer.current)
							}
						}, 1000)

						return () => clearInterval(timer.current)
		}, [])

			if (isComedian === null) {
				return (
					<section>
						<h1>Selecting a comedian...</h1>
					</section>
				)
		}

			return (
				<React.Fragment>
					{
						isComedian ?
						<JokeSelectionScreen
		gameId={gameId} roundId={roundId} playerId={playerId} joke={joke} next={next} finish={finish} /> :
		<VotingScreen
		gameId={gameId} roundId={roundId} playerId={playerId} joke={joke} next={next} finish={finish}/>
					}
				</React.Fragment>
			)
		}

		function JoinScreen({ next }) {
						const [gameCode, setGameCode] = React.useState('')
						const [nickname, setNickname] = React.useState('NICK')

						const handleJoin = async () => {
							if (gameCode && nickname) {
		const response = await post('/' + gameCode + '/join', { nickname })
								next(response.gameId, response.playerId)
							}
						}

						return (
		<section style={{ justifyContent: 'flex-start', paddingTop: '80px' }}>
										<img className="logo sharp" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABGCAYAAABMvIPiAAAAAXNSR0IArs4c6QAABBNJREFUeJztmiFvWzEQgO9NoyWbFL5JI2Fb4aSBoOCAqFL14GBYQZUfEBUUNXAwilQNDA8FTBpsYWB/QKai/oA3kLl17t3Zd35+L2l3nzRp8bPP5/P5fLYLYBiGYRiGYRiGYRiGYRiGYRiGYRiGYRgvhSK14WSzrrhvs1UJRyc3Ba7nl7cNpR+nl/+NK2+qz6uURiEjp9TrAonB2tT3dVMBs1UJAADTweKxbDpYwGQDNaVdOeU9816/ZoTQwLX1U+G83H2TyknyaB9n4NmqfPwnASs/2awrjaEmm3X1cH1cpbSVwo1lOlj8c5onHWI0NrTrGGA7w0cnNwWnoJsI3/sxWoPtOzxNBwuQGDvJ0JQh3QwD0EvKhQv8jVoFD9fHyR5KyZOuslT5EtSGnmzW1XSw2AkVfscpBpLEOs3gKHmhPjjZXJuULCR5Mwwtf60cauPsUh41ltmqhHkm+QCZYrSP8w6cFcRiWc7ljeU2yYNjK1QqX+3RVDrnl/udchvfvNcvqIOMxlOeBtivHYokq805Am7r4IyHHUI6ickzTXkn1Smu5+r45VxZbDen2oXqUcTGketk28lx+DmTy9CNT4Yvnbb2DqMlRMtAkht3eTP3HDn40NHWtWXXZM+jDRozdEckhQ5uJ+ZiOXV3TNX363GytifMsuJeSqj+qPDjH2piv11Zk5CVdDKkOtTeJYfKZ6sSpokysJy24vnl+bLW/9nFKduX2tD4UkXzRISP3vtCeyGGx3h5vqxG4yFRc1lxxs4So6XGu70aqu4yuHKNoXJdCjl4IwOMxkPS0wEEho69dnODpgz1ofdHVA8g/Hgg7S9Gl6liK3m09DbO1Xu4LhuFE+3tn+ZxNddkNNoM5wBZLu27PIBIDBcLTT++/3z8/2g83PnN0drJsMnffuzj9KeJ/ThG+785o7diaKnC2t3f5dA49cvxHEaFHm7CD8qjU8nlzdrsREN2j5Ys/0PJjbtkbx4d+oseDPVW58vBb46UnNjkcllIKAXU3BJm92hpbsopFErbJLKf3gTrcua9fvRNkeqjy5TO59nd67aB9s6bO/0B8Pcd6tBxd3tfAQC8//T2v52ks4vT4svnrzVj//r9jbWJyFjOuD7vPr6BoiiC7al23ARRdUP1cyL90wmM79mhmzsAgaHvbu8rKsBzgn2DUe1G42HNeFwfrj5AXoNrHEAiS9I2GDqcAWKzhesDhGZ4WeGBhvvYek2OkOVkUJOKdcq9krIdWKSTsv2+u5mE2rhvZxfbpZpq8LgT7Ook6Se0EjFBZd3dqySuajy/CS4uhvTCaFcm7odDI1MU8PGgqCXYhZFjemF8PVP1S0nlKEQV8atCPA53Q+i1A+Bw9ARQHFg0qUyX5PI4wzAMwzAMw1DwF8QMMJ8K3ARRAAAADmVYSWZNTQAqAAAACAAAAAAAAADSU5MAAAAASUVORK5CYII="/>
										<h1>Join Game</h1>
										<input
												type="text"
												placeholder="Game Code"
												value={gameCode}
												onChange={e => setGameCode(e.target.value)}
												style={{ width: '250px' }}
										/>
										<input
												type="text"
												placeholder="Your nickname"
												value={nickname}
												onChange={e => setNickname(e.target.value)}
												style={{ width: '250px', display: 'none' }}
										/>
										<button
												onClick={handleJoin}
												style={{ width: '250px' }}
												disabled={!(nickname && gameCode)}
										>Join</button>
								</section>
						)
				}

		function WaitingScreen({ gameId, prevRoundId, next }) {
						const timer = React.useRef()
						React.useEffect(() => {
						// we need to wait until the round starts
						timer.current = setInterval(async () => {
							const response = await get('/' + gameId)
							if (response.activeRoundId) {
								next(response.activeRoundId)
							}
						}, 1000)

						return () => clearInterval(timer.current)
		}, [prevRoundId])
						return (
								<section style={{ textAlign: 'center' }}>
										<h2>Waiting for the round to start...</h2>
										<h3>(Hopefully, it will be something good this time)</h3>
										<div style={{ fontSize: '24px', marginTop: '20px' }}>
										</div>
								</section>
						)
				}

		function VotingScreen({ gameId, roundId, playerId, joke, next, finish }) {
					const timer = React.useRef()
					const [vote, setVote] = React.useState(null)
					const handleVote = (voteValue) => {
							setVote(voteValue)
						post('/' + gameId + '/round/' + roundId + '/player/' + playerId + '/vote', {
			vote: voteValue
		})
					}

						React.useEffect(() => {
							if (vote) {
								timer.current = setInterval(async () => {
									const response = await get('/' + gameId)
									if (response.activeRoundId || response.gameStatus === 'FINISHED') {
										if (response.gameStatus === 'FINISHED') {
											finish()
											clearInterval(timer.current)
										} else if (response.activeRoundId !== roundId) {
											next()
											clearInterval(timer.current)
										}
									}
								}, 3000)
						}
					}, [vote])

let modifiedPunchline = joke?.punchline?.toLowerCase().replace(/\\./g, '') ?? ''
let finalString = joke?.setup?.replace('[placeholder]', modifiedPunchline) ?? ''

					return (
							<section style={{ textAlign: 'center' }}>
									<h1>You are part of the audience</h1>
									{
										joke && joke.setup && joke.punchline ? (
											<React.Fragment>
		<p style={{ padding: '0 10px', margin: '0' }}>{finalString}</p>
									<button
		className={"vote aye " + (vote === 'Aye' ? 'chosen' : '')}
											onClick={() => handleVote('Aye')}
											disabled={vote !== null}
											style={{ width: '200px', height: '150px' }}
									>
											Aye
									</button>
									<button
		className={"vote nay " + (vote === 'Nay' ? 'chosen' : '')}
											onClick={() => handleVote('Nay')}
											disabled={vote !== null}
											style={{ width: '200px', height: '150px' }}
									>
											Nay
									</button>
												</React.Fragment>
										) : (
											<React.Fragment>
												<h2>Waiting for the joke...</h2>
											</React.Fragment>
										)
									}
						</section>
					)
			}

		function JokeSelectionScreen({ gameId, roundId, playerId, joke, next, finish }) {
						const timer = React.useRef()
						const [selectedSetup, setSelectedSetup] = React.useState(null)
						const [selectedPunchline, setSelectedPunchline] = React.useState(null)

						const setups = joke?.setups
						const punchlines = joke?.punchlines

						const handleSetupSelection = (setup) => {
								setSelectedSetup(setup)
						}

						const handlePunchlineSelection = (punchline) => {
								setSelectedPunchline(punchline)
						}

						React.useEffect(() => {
								if (selectedSetup && selectedPunchline) {
										// Send the selections to the server
		post('/' + gameId + '/round/' + roundId + '/player/' + playerId + '/joke', {
			setup: selectedSetup,
			punchline: selectedPunchline
		})



								timer.current = setInterval(async () => {
									const response = await get('/' + gameId)

									if (response.activeRoundId || response.gameStatus === 'FINISHED') {
										if (response.gameStatus === 'FINISHED') {
											finish()
											clearInterval(timer.current)
										} else if (response.activeRoundId !== roundId) {
											next()
											clearInterval(timer.current)
										}
									}
								}, 1000)


						}
						}, [selectedSetup, selectedPunchline])

						if (!setups || !punchlines) {
							return (
			<section>
				<h1>Getting you some jokes...</h1>
			</section>
		)
						}
let modifiedPunchline = selectedPunchline?.toLowerCase().replace(/\\./g, '') ?? ''
let finalString = selectedSetup?.replace('[placeholder]', modifiedPunchline) ?? ''
						return (
								<section>
		{ !selectedSetup && <h1>You are the comedian!</h1> }
									{
									!selectedSetup ? (
		<div style={{ display: 'flex', flexDirection: 'column'}}>
										<h2>Choose a Joke Setup</h2>
										{setups.map(setup => (
												<button
														className="setup"
														key={setup}
														onClick={() => handleSetupSelection(setup)}
														disabled={selectedSetup !== null}
												>
														{setup}
												</button>
										))}
									</div>
									) : (
										<React.Fragment>
										  {
												!selectedPunchline ? (
		<div style={{ display: 'flex', flexDirection: 'column'}}>
												<button
														className="setup"
														disabled
												>
														{selectedSetup}
												</button>
												<br />
												<br />
										<h2>Choose a Punchline</h2>
										{punchlines.map(punchline => (
												<button
														className="punchline"
														key={punchline}
														onClick={() => handlePunchlineSelection(punchline)}
														disabled={selectedPunchline !== null}
												>
														{punchline}
												</button>
										))}
										</div>
		) : (
		<div style={{ padding: '20px' }}>
		      <h1>Your joke is ready!</h1>
					<p>
						{finalString}
					</p>
		</div>
		)
								}
								</React.Fragment>
		)
		}
								</section>
						)
				}


				function EndingScreen() {
						return (
								<section style={{ textAlign: 'center' }}>
										<h1>Thank you for playing!</h1>
										<div style={{ fontSize: '24px', marginTop: '20px' }}>
										</div>
								</section>
						)
				}


        // Render the App component inside the 'root' div
        ReactDOM.render(<App />, document.getElementById('root'))
    </script>
</body>
</html>

`

export default htmlContent
