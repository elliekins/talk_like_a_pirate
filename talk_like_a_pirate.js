/* global dom */
const talk_like_a_pirate = (() => {

	const EOL_CHANGE = 0.25
	const EOL_WORD_LENGTH = 3

	const pirate_talk = {
		__eol__: ['Arrrr!', 'Arrrgh!', 'Shiver me timbers!', 'Arrrgh, Jim lad.',],
		'i\'m': 'I be',
		'isn\'t': 'be not',
		'it\'s': ['it be', '\'tis'],
		'that\'s': 'that be',
		'you\'re': 'you be',
		'you\'ve': 'ye',
		abandon: 'maroon',
		abandoned: 'marooned',
		address: ['port o\' call', 'port'],
		admin: 'helm',
		afraid: ['lily-livered'],
		alcholic: 'carouser',
		am: 'be',
		america: 'New World',
		and: ['an\'', '\'n\''],
		are: ['arrrr', 'be'],
		award: 'prize',
		back: ['abaft', 'aft'],
		bag: 'duffle',
		barmaid: ['serving wench'],
		bastard: ['son of a biscuit eater', 'scallywag', 'bilge rat', 'knave', 'picaroon', 'rapscallion'],
		beat: 'flog',
		beer: ['grog', 'ale'],
		before: 'afore',
		belief: 'creed',
		best: 'finest',
		between: 'betwixt',
		big: 'vast',
		binoculars: 'spyglass',
		boat: ['ship', 'Man-O-War', 'clipper', 'cog', 'galleon', 'schooner'],
		boss: ['captain', 'Cap\'n', 'admiral'],
		box: ['barrel', 'chest', 'box'],
		boy: ['lad', 'pirate'],
		broken: 'sunk',
		business: 'company',
		businesses: 'companies',
		caribbean: 'Spanish Main',
		cash: ['gold', 'coins', 'treasure', 'doubloons', 'booty'],
		cat: 'fury parrot',
		cheat: ['hornswaggle'],
		clean: 'swab',
		click: ['skewer', 'stab', 'poke'],
		client: 'Scurvy Dog',
		cloth: ['canvas', 'hemp'],
		coffee: ['grog', 'ale'],
		coin: 'doubloon',
		coins: 'doubloons',
		comes: 'hails',
		con: 'Hornswaggle',
		contractor: 'Privateer',
		control: 'ye helm',
		cool: 'shipshape',
		country: 'land',
		crew: 'hands',
		cruise: 'voyage',
		customer: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		daughter: ['lass', 'wench'],
		daughters: ['wenches'],
		dead: 'feedin\' the fishes',
		dealer: ['sutler', 'chandler'],
		die: ['dance with Jack Ketch', 'walk the plank', 'dance the hempen jig'],
		died: ['be feedin\' the fishes', 'danced with Jack Ketch', 'walked t\' plank', 'went donw t\' Davey Jones locker', 'danced the hempen jig'],
		disabled: ['crippled', 'takin\' on water'],
		disembark: 'abandon ship',
		do: 'd\'',
		dog: 'barkin\' parrot',
		drunk: ['squiffy', 'three sheets to the wind'],
		egg: 'Cackle fruit',
		employee: 'crew',
		everyone: 'all hands',
		fabric: ['canvas', 'hemp'],
		family: 'kin',
		fee: 'debt',
		female: ['wench', 'lass', 'comely wench'],
		females: ['wenches', 'beauties'],
		fighting: 'Swashbucklin\'',
		food: 'grub',
		for: 'fer',
		forward: 'windward',
		friend: ['matey', 'shipmate', 'bucko', 'me hearty'],
		friends: ['crew', 'Hearties'],
		front: 'bow',
		gentleman: ['pirate', 'gentlemen o\' fortune'],
		gin: ['rum', 'port'],
		girl: ['lass', 'wench', 'comely wench', 'lassie', 'strumpet'],
		go: ['weigh anchor and hoist the mizzen an\' go', 'set sail an\' go'],
		good: ['shipshape', 'fine'],
		grave: ['Davy Jones Locker'],
		gun: ['musket', 'cannon', 'blunderbuss'],
		ha: 'yo ho',
		haha: 'yo ho ho',
		hahaha: 'yo ho ho and a bottle o\' run',
		hand: ['hook', 'hand'],
		hello: ['avast', 'ahoy'],
		hey: ['avast', 'ahoy'],
		hi: ['avast', 'ahoy'],
		him: ['he', '\'im'],
		home: 'house',
		hotel: 'inn',
		house: 'ship',
		huge: 'vast',
		ill: 'poxy',
		inbetween: 'betwixt',
		infected: 'poxy',
		internet: ['t\'interweb'],
		internets: ['t\'interwebs'],
		investment: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		is: 'be',
		island: 'isle',
		jail: 'brig',
		journey: ['voyage', 'adventure'],
		just: 'jus\'',
		kitchen: 'gally',
		knife: 'cutlass',
		ladies: ['wenches', 'beauties'],
		lady: ['lass', 'wench', 'beauty', 'strumpet'],
		large: 'vast',
		lean: 'list',
		leave: ['abandon ship', 'set sail'],
		left: 'port',
		little: 'wee',
		logout: 'abandon ship',
		luggage: 'cargo',
		madam: ['buxom wench'],
		male: ['pirate', 'old salt'],
		males: 'pirates',
		man: ['pirate', 'old salt'],
		manager: ['boatswain', 'bosun', 'coxswain'],
		meter: 'fathom',
		meters: 'fathoms',
		mile: 'league',
		miles: 'leagues',
		miss: ['lady'],
		money: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		mop: 'swab',
		mrs: ['madam', 'lady'],
		ms: ['...'],
		my: 'me',
		neighbourhood: 'port',
		never: 'Ne\'er',
		ocean: 'briney deep',
		overtake: 'overhaul',
		people: ['land lubbers', 'scurvy land lubbers'],
		person: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		pirate: ['buccaneer', 'genteman o\' fortune'/* , 'corsair' */],
		pirates: ['buccaneers', 'genteman o\' fortune'/* , 'corsairs' */],
		place: ['port', 'haven'],
		prepare: 'batten down the hatches',
		prison: 'brig',
		quickly: 'smartly',
		ramp: 'gangplank',
		relative: 'kin',
		relatives: 'kin',
		report: 'tall tale',
		reports: 'tall tails',
		restaurant: 'gally',
		right: 'starboard',
		rubbish: ['bilge'],
		save: 'bury',
		saved: 'buried',
		scared: ['lily-livered'],
		sea: 'briney deep',
		sex: ['tha beast wi\' two backs'],
		should: 'shall',
		sick: 'poxy',
		silly: 'daft',
		sink: 'Scuttle',
		sir: ['ye scurvy dog', 'ye lily-livered rapscallion', 'ye poxy bilge rat', 'ye salty olde sea-dog'],
		small: ['puny', 'wee'],
		song: 'chantey',
		sorry: 'beggin\' forgivness',
		still: 'becalmed',
		stop: ['avast', 'belay'],
		stories: ['tales', 'ledgends','myths'],
		stranger: 'interloper',
		sword: 'cutlass',
		task: 'duty',
		tea: ['grog', 'ale'],
		telescope: 'spyglass',
		the: ['ye', 'thar'],
		them: 'em',
		there: 'abouts',
		these: 'these \'ere',
		this: 'This \'ere',
		tit: ['bosom', 'bust'],
		tits: ['bosom', 'bust'],
		to: 't\'',
		too: 't\'',
		tour: 'adventure',
		treasure: ['gold', 'booty', 'treasure'],
		understand: 'Savvy?',
		vodka: ['rum', 'port'],
		was: 'be',
		whip: 'cat o\' nine tails',
		whiskey: ['rum', 'port', 'Clap of Thunder'],
		wife: ['ball and chain', 'woman'],
		with: 'wi\'',
		woman: ['wench', 'beauty'],
		work: 'duty',
		would: ['be'],
		wow: ['blow me down', 'shiver me timbers', 'Sink Me'],
		yacht: 'clipper',
		yeah: ['yarrr', 'aye'],
		yep: ['yarrr', 'aye'],
		yes: ['yarrr', 'aye'],
		you: ['ye'],
		your: ['ye', 'yer', 'thee'],
	}

	const CTX = {
		PRE: {
			ITEM: [
				'a', 
				'an', 
				'that', 
				'those',
				'this',
				'thing',
				'my',
				'your',
			],
			ACTION: [
				'will',
				'might',
				'could',
				'to',
				'can\'t',
				/ed$/i,
			],
			EVENT: [
				'go',
				'to',
			],
			SELF: [
				'i',
				'me',
			],
			DESCRIBE: [
				'beautiful'
			]
		},
		POST: {
			ACTION: [
				'sex',
				'dig',
				/ing$/i,
			],
			ITEM: [

			],
			REQUEST: [
				'like',
				'you'
			],
			QUESTION: [
				'?'
			]
		}
	}

	const advanced_pirate_talk = {
		'can\'t': [{ b: CTX.PRE.SELF, w: ['don\'t be'], a: ['believe'] }],
		a: [{ b: [], w: ['an'], a: ['holiday'] }],
		believe: [{ b: CTX.PRE.ACTION, w: ['belivein\''], a: [] }],
		book: [{ b: CTX.PRE.ACTION, w: ['sign on t\''], a: ['a'] }, { b: CTX.PRE.ITEM, w: ['scroll', 'partchment'], a: [] }],
		excuse: [{ b: [], w: ['oi!'], a: ['me'] }],
		have: [{ b: [], w: ['be makein\''], a: ['sex'] }],
		holiday: [{ b: CTX.PRE.ITEM, w: ['adventure'], a: [] }],
		me: [{ b: ['excuse'], w: [''], a: [] }],
		talk: [{ b: CTX.PRE.ACTION, w: ['be talkin\''], a: [] }],
		would: [{ b: [], w: ['would'], a: CTX.POST.REQUEST }],
		woman: [{ b: CTX.PRE.DESCRIBE, w: ['wench'], a: []}],
		work: [
			{ b: CTX.PRE.ITEM, w: ['accursed contraption work'], a: CTX.POST.QUESTION },
			{ b: ['your'], w: ['duty'], a: CTX.POST.QUESTION },

		],
		still: [
			{ b: [], w: ['stll'], a: CTX.POST.ACTION },
			{ b: [], w: ['becalmed'], a: ['water', 'waaters'] },
		],
		hand: [
			{ b: ['left', 'right'], w: ['side'], a: CTX.POST.ITEM }
		],
		dick: [
			{ b: CTX.PRE.ITEM, w: ['mermaid worrier'], a: [] }
		]
		// example: [{ b: [], w: [], a: [] }]
	}

	const isWord = (val) => /[a-z'-]{1,}/i.test(val)
	const isLetter = (val) => /[a-z'-]{1}/i.test(val)
	const isPunk = (val) => /[!?.]{1}/i.test(val) // Punk-tuation. The sort that separates words

	const ing = /ing$/i

	const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

	const translate = (before = '', word = '', after = '') => {

		before = before.toLowerCase()
		word = word.toLowerCase()
		after = after.toLowerCase()

		if (['a', 'an'].includes(word)) {
			return ['a', 'e', 'i', 'o', 'u'].includes(word.substr(0, 1)) ? 'a' : 'an'
		}

		if (advanced_pirate_talk[word]){
			let options = []

			// weight possible matches (1, 2). non-matches binned.
			for (let i in advanced_pirate_talk[word]){
				const option = advanced_pirate_talk[word][i]
				let weight = 0
				if (option.b.find((item) => (item.test) ? item.test(before) : before === item)) weight++
				if (option.a.find((item) => (item.test) ? item.test(after) : after === item)) weight++
				if (weight > 0 ) options.push({option, weight})
			}

			// find best match value
			if (options.length) {
				const max_weight = options.reduce((max, cur) => {
					if (cur.weight > max) return cur.weight
					return max
				}, 0)

				// bin the rest
				options = options.filter((option) => option.weight === max_weight)

				// random word, from random best-match-option
				const option = options[randomInt(0, options.length - 1)].option
				return option.w[randomInt(0, option.w.length - 1)]
			}
		}

		if (pirate_talk[word]){
			if (typeof pirate_talk[word] === 'string') return pirate_talk[word]

			return pirate_talk[word][randomInt(0, pirate_talk[word].length - 1)]
		}

		// no translation available
		if (ing.test(word)) {
			word = word.replace(ing, ['in\'', '\'n\''][randomInt(0, 1)])
		}
		
		return word
	}

	const previous = (arr, idx) => {
		for (let i = parseInt(idx)-1; i >= 0; i--) {
			if (arr[i] && arr[i] !== ' ') return arr[i]
		}
		return undefined
	}

	const next = (arr, idx) => {
		for (let i = parseInt(idx)+1; i < arr.length; i++) {
			if (arr[i] && arr[i] !== ' ') return arr[i]
		}
		return undefined
	}

	const apply_caps = (a, b) => {
		if (a === b) return a
		if (b.length === 1) return b.toUpperCase()
		if (a.length === 1) return b
		if (a === a.toUpperCase()) return b.toUpperCase()
		if (a === a.toLowerCase()) return b.toLowerCase()
		let first = a.slice(0, 1)
		let second = a.slice(1, 2)
		if (first === first.toUpperCase() && second === second.toLowerCase()) {
			return b.slice(0, 1).toUpperCase() + b.slice(1).toLowerCase()
		}
		return b
	}

	return (txt) => {
		
		const str = txt
		let strArr = []
		let pirate_speak = ''
		let word = ''

		// build text in to array (words, punk-tuation and space elements)
		for (let i in str){
			if (str.hasOwnProperty(i)) {

				// char is part of a word
				if (isLetter(str[i])) {
					word += str[i]
					continue
				}

				// if we're here, word has ended. add to array.
				if (word.length) {
					strArr.push(word)
				}
				
				// add seperator to array as well
				if (str[i]) strArr.push(str[i])

				// ready for next word
				word = ''
			}
		}

		// translate array elements
		for (let i in strArr) {

			// find previous/next array element that isn't a space
			// we pass curent word as well as previous and next for mathcing context
			// see advanced_pirate_talk object for context definitions
			const before = previous(strArr, i)
			const after = next(strArr, i)

			if (!isWord(strArr[i])) {
				pirate_speak += strArr[i]
				continue
			}

			// must be a word to translate. 
			pirate_speak += apply_caps(strArr[i], translate(before, strArr[i], after))


			// maybe add randon pirate saying afterwards
			if (isPunk(after) && word.length > EOL_WORD_LENGTH && Math.random() > EOL_CHANGE) pirate_speak += ' ' + translate(before, '__eol__', after)

		}

		return pirate_speak
	}

})()


// if in browser and dom.js is loaded, add this as a plugin
if (window) {
	if (window.dom) dom.registerPlugin('talk_like_a_pirate', (e) => { 
		e.innerHTML = talk_like_a_pirate(e.innerHTML) 
		e.value = talk_like_a_pirate(e.value) 
	})
}
