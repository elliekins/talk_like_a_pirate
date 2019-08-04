const talk_like_a_pirate = (() => {

	const EOL_CHANCE = 0.25
	const EOL_WORD_LENGTH = 3

	// Context definition objects give different translation options depending on 
	// the words that come before and after the one being translated
	// [{b: [before word], w: [word translation options], a: [after word]}, ....]
	// optionally the above array may contain an object like: { default: [translation options] }
	const match_context = (context_object_array) => (before, word, after) => {

		let options = []
		let defaultOption

		// weight possible matches (1, 2). non-matches binned.
		for (let i in context_object_array) {
			const option = context_object_array[i]
			let weight = 0
			if (option.default) {
				defaultOption = option
				continue
			}
			if (option.b && option.b.find((item) => (item.test) ? item.test(before) : before === item)) weight++
			if (option.a && option.a.find((item) => (item.test) ? item.test(after) : after === item)) weight++
			if (weight > 0) options.push({ option, weight })
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

		if (defaultOption) {
			return defaultOption.default[randomInt(0, defaultOption.default.length - 1)]
		}

		return word
	}

	// Arrays of words that suggest context of the word after or before
	const PRE = {
		ACTION: ['will', 'might', 'could', 'to', 'cant', 'cannot', /ed$/i],
		DESCRIBE: [ 'beautiful', 'big', 'small', 'medium', 'large', 'massive', /y$/i],
		EVENT: ['go', 'to'],
		ITEM: ['a', 'an', 'that', 'those', 'this', 'thing', 'my', 'your', 'our'],
		OWNERSHIP: ['your', 'my', 'our'],
		SELF: [ 'i', 'me'],
		TITLE: [ 'mr', 'mrs', 'miss', 'ms', 'dr', 'captain', 'sir', 'lady'],
	}

	const POST = {
		ACTION: ['sex', 'dig', /ing$/i,],
		ITEM: [],
		QUESTION: ['?'],
		REQUEST: ['like', 'you'],
	}

	const a_or_an = (b, w, a) => ['a', 'e', 'i', 'o', 'u'].includes(translate('a', a).substr(0, 1)) ? 'an' : 'a'

	const eol = (b, w, a) => {
		if (b && b.length > EOL_WORD_LENGTH && Math.random() > EOL_CHANCE) return `, ${translate(b, '__eol__', a)}`
		if (PRE.TITLE.includes(b)) return '' // remove full stops after full titles
		return '.'
	}

	const INSULTS = ['son of a biscuit eater', 'scallywag', 'bilge rat', 'knave', 'picaroon', 'rapscallion']

	const pirate_talk = {
		__eol__: ['Arrrr!', 'Arrrgh!', 'Shiver me timbers!', 'Arrrgh, Jim lad!',],
		'.': eol,
		a: a_or_an,
		abandon: match_context([{ w: ['maroon'], a: 'on' }]),
		abandoned: ['marooned'],
		address: ['port'],
		admin: ['helm'],
		afraid: ['lily-livered'],
		alcholic: ['carouser'],
		am: ['be'],
		america: ['New World'],
		an: a_or_an,
		and: ['an\'', '\'n\''],
		are: ['arrrr', 'be'],
		award: ['prize'],
		back: ['abaft', 'aft', 'stern'],
		backend: ['stern'],
		bag: ['duffle'],
		barmaid: ['serving wench'],
		bastard: INSULTS,
		beat: ['flog'],
		beer: ['grog', 'ale'],
		before: ['afore'],
		belief: ['creed'],
		believe: match_context([{ b: PRE.ACTION, w: ['belivein\'']}]),
		best: ['finest'],
		between: ['betwixt'],
		big: ['vast', 'huge', 'gargantuan', 'great'],
		binoculars: ['spyglass'],
		boat: ['ship', 'Man-O-War', 'clipper', 'cog', 'galleon', 'schooner'],
		book: match_context([{ b: PRE.ACTION, w: ['sign on t\''], a: ['a'] }, { b: PRE.ITEM, w: ['scroll', 'partchment']}]),
		boss: ['captain', 'Cap\'n', 'admiral'],
		boy: ['lad', 'pirate'],
		broke: ['sunk'],
		broken: match_context([{ b: ['has'], w: ['sprung a leak'] }, { default: ['sunk']}]),
		business: ['company'],
		businesses: ['companies'],
		cant: match_context([{ b: PRE.SELF, w: ['don\'t be'], a: ['believe'] }]),
		caribbean: ['Spanish Main'],
		cash: ['gold', 'coins', 'treasure', 'doubloons', 'booty'],
		cat: ['fury parrot'],
		cheat: ['hornswaggle'],
		classic: ['old'],
		classics: ['old'],
		clean: ['swab'],
		click: ['skewer', 'stab', 'poke'],
		client: ['Scurvy Dog'],
		cloth: ['canvas', 'hemp'],
		cock: ['jolly rodger'],
		coffee: ['grog', 'ale'],
		coin: ['doubloon'],
		coins: ['doubloons'],
		comes: ['hails'],
		computer: ['box \'o cogs'],
		con: ['Hornswaggle'],
		contractor: ['Privateer'],
		control: ['helm'],
		cool: ['shipshape'],
		country: ['land'],
		crew: ['hands'],
		cruise: ['voyage'],
		customer: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		daughter: ['lass', 'wench'],
		daughters: ['wenches'],
		dead: ['feedin\' the fishes'],
		dealer: ['sutler', 'chandler'],
		dick: match_context([{ b: [...PRE.ITEM, ...PRE.OWNERSHIP, ...PRE.DESCRIBE], w: ['mermaid worrier', 'Jolly Rodger']}]),
		die: ['dance with Jack Ketch', 'walk the plank', 'dance the hempen jig'],
		died: ['be feedin\' the fishes', 'danced with Jack Ketch', 'walked t\' plank', 'went down t\' Davey Jones locker', 'danced the hempen jig'],
		disabled: ['crippled', 'takin\' on water'],
		disembark: ['abandon ship'],
		do: ['d\''],
		document: ['parchment', 'map', 'deed'],
		documents: ['parchments', 'maps', 'deeds'],
		dog: ['barkin\' parrot'],
		drunk: ['squiffy', 'three sheets to the wind'],
		egg: ['Cackle fruit'],
		employee: ['crew'],
		everyone: ['all hands'],
		excuse: match_context([{w: ['oi!'], a: ['me'] }]),
		fabric: ['canvas', 'hemp'],
		families: ['crews', 'clans'],
		family: ['kin'],
		fat: match_context([{ b: ['her'], w: ['voluptuous'], a: ['woman'] }]),
		fee: ['debt'],
		female: ['wench', 'lass'],
		females: ['wenches', 'beauties'],
		fighting: ['Swashbucklin\''],
		food: ['grub'],
		for: ['fer'],
		forward: ['windward'],
		friend: ['matey', 'shipmate', 'bucko', 'me hearty'],
		friends: ['crew', 'Hearties'],
		front: ['bow'],
		frontend: ['bow'],
		gentleman: ['pirate', 'gentleman o\' fortune'],
		gin: ['rum', 'port'],
		girl: ['lass', 'wench', 'lassie', 'strumpet'],
		git: INSULTS,
		go: ['weigh anchor and hoist the mizzen an\' go', 'set sail an\' go'],
		good: ['shipshape', 'fine'],
		grave: ['Davy Jones Locker'],
		gun: ['musket', 'cannon', 'blunderbuss', 'pistol'],
		ha: ['yo ho'],
		haha: ['yo ho ho'],
		hahaha: ['yo ho ho and a bottle o\' run'],
		hand: match_context([{ default: ['hook'] }, { b: ['left', 'right'], w: ['side'], a: POST.ITEM }]),
		happy: ['jolly'],
		have: match_context([{w: ['be makein\''], a: ['sex'] }]),
		hello: ['avast', 'ahoy'],
		hey: ['avast', 'ahoy'],
		hi: ['avast', 'ahoy'],
		him: ['he', '\'im'],
		holiday: match_context([{ b: PRE.ITEM, w: ['adventure']}]),
		home: ['house'],
		hotel: ['inn'],
		house: ['ship'],
		huge: ['vast'],
		ill: ['poxy'],
		im: ['I be'],
		inbetween: ['betwixt'],
		infected: ['poxy'],
		internet: ['t\'interweb'],
		internets: ['t\'interwebs'],
		investment: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		iphone: ['accursed monkey turd'],
		ipod: ['box from whence all the screams of hell come forth'],
		is: ['be'],
		island: ['isle'],
		isnt: ['be not'],
		its: ['it be', '\'tis'],
		jail: ['brig'],
		javascript: ['Javarrrr...script'],
		journey: ['voyage', 'adventure'],
		just: ['jus\''],
		kitchen: ['gally'],
		knife: ['cutlass'],
		ladies: ['wenches', 'beauties'],
		lady: ['lass', 'wench', 'beauty', 'strumpet'],
		language: match_context([{ b: ['programming'], w: ['language']}, {default: ['tongue']}]),
		large: ['vast'],
		lean: ['list'],
		leave: ['abandon ship', 'set sail'],
		left: ['port'],
		listen: ['hark', 'pay head', 'lend an ear'],
		little: match_context([{ b: ['a'], w: ['wee bit']}, {default: ['wee']}]),
		logout: ['abandon ship'],
		look: ['behold'],
		luggage: ['cargo'],
		madam: ['buxom wench'],
		male: ['pirate', 'old salt'],
		males: ['pirates'],
		man: ['pirate', 'old salt'],
		manager: ['boatswain', 'bosun', 'coxswain'],
		massive: ['vast'],
		max: ['most'],
		me: match_context([{ b: ['excuse'], w: ['']}]),
		meter: ['fathom'],
		meters: ['fathoms'],
		mile: ['league'],
		miles: ['leagues'],
		min: ['least'],
		miss: ['lady'],
		money: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		mop: ['swab'],
		mrs: ['madam', 'lady'],
		ms: ['...'],
		my: ['me'],
		myself: ['meself'],
		neighbourhood: ['port'],
		never: ['Ne\'er'],
		ocean: ['briney deep'],
		or: ['nor'],
		overtake: ['overhaul'],
		people: ['land lubbers', 'scurvy land lubbers'],
		person: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		photo: ['photie'],
		photograph: ['photiegraph'],
		photographs: ['photiegraphs'],
		pirate: ['buccaneer', 'gentleman o\' fortune'],
		pirates: ['buccaneers', 'gentleman o\' fortune'],
		place: ['port', 'haven'],
		prepare: ['batten down the hatches'],
		prison: ['brig'],
		quickly: ['smartly'],
		ramp: ['gangplank'],
		rear: ['stern'],
		relative: ['kin'],
		relatives: ['kin'],
		remove: ['throw overboard'],
		report: ['tall tale'],
		reports: ['tall tails'],
		restaurant: ['gally'],
		right: ['starboard'],
		rubbish: ['bilge'],
		save: ['bury'],
		saved: ['buried'],
		scared: ['lily-livered'],
		sea: ['briney deep'],
		server: ['big box \'o cogs'],
		sex: ['tha beast wi\' two backs'],
		should: ['shall'],
		sick: ['poxy'],
		silly: ['daft'],
		sink: ['Scuttle'],
		sir: ['ye scurvy dog', 'ye lily-livered rapscallion', 'ye poxy bilge rat', 'ye salty olde sea-dog'],
		small: ['puny', 'wee'],
		song: ['shantey'],
		sorry: ['beggin\' forgivness'],
		still: match_context([{w: ['stll'], a: POST.ACTION }, {w: ['becalmed'], a: ['water', 'waaters'] },]),
		stop: ['avast', 'belay'],
		stories: ['tales'],
		stranger: ['interloper'],
		sword: ['cutlass'],
		talk: match_context([{ b: PRE.ACTION, w: ['be talkin\'']}]),
		task: ['duty'],
		tea: ['grog', 'ale'],
		telescope: ['spyglass'],
		thats: ['that be'],
		the: ['ye', 'thar'],
		them: ['\'em'],
		there: ['abouts'],
		these: ['these \'ere'],
		this: ['This \'ere'],
		tit: ['bosom', 'bust'],
		tits: ['bosom', 'bust'],
		to: ['t\''],
		too: ['t\''],
		tour: ['adventure'],
		treasure: ['gold', 'booty', 'treasure'],
		twat: INSULTS,
		understand: ['Savvy?'],
		vodka: ['rum', 'port'],
		was: ['be'],
		were: ['be'],
		whip: ['cat o\' nine tails'],
		whiskey: ['rum', 'port', 'Clap of Thunder'],
		wife: ['ball and chain', 'woman'],
		with: ['wi\''],
		woman: match_context([{ default: ['wench', 'beauty'] }, { b: PRE.DESCRIBE, w: ['wench']}]),
		work: match_context([{ b: PRE.ITEM, w: ['accursed contraption work'], a: POST.QUESTION }, { b: PRE.OWNERSHIP, w: ['duty'], a: POST.QUESTION },]),
		would: match_context([{ default: ['be'] }, {w: ['would'], a: POST.REQUEST }]),
		wow: ['blow me down', 'shiver me timbers', 'Sink Me'],
		yacht: ['clipper'],
		yeah: ['yarrr', 'aye'],
		yep: ['yarrr', 'aye'],
		yes: ['yarrr', 'aye'],
		you: ['ye'],
		young: ['little'],
		your: ['ye', 'yer', 'thee'],
		youre: ['you be'],
		youve: ['ye'],
	}

	// const isWord = (val) => /[a-z'-]{1,}/i.test(val)
	const isLetter = (val) => /[a-z'-]{1}/i.test(val)
	// const isPunk = (val) => /[!?.]{1}/i.test(val) // Punk-tuation. The sort that separates words

	const ing = /ing$/i

	const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

	const translate = (_before = '', _word = '', _after = '') => {

		// comparrison with dictionary keys are lowercase and without hyphens/apostrophes etc
		const before = _before.toLowerCase().replace(/['-]/g, '')
		let word = _word.toLowerCase().replace(/['-]/g, '')
		const after = _after.toLowerCase().replace(/['-]/g, '')

		if (pirate_talk[word]){
			if (typeof pirate_talk[word] === 'function') return pirate_talk[word](before, word, after)
			const selected = pirate_talk[word][randomInt(0, pirate_talk[word].length - 1)]
			if (typeof selected === 'function') return selected(before, word, after)
			return selected
		}

		// no translation available
		if (ing.test(word)) _word = word.replace(ing, ['in\'', '\'n\''][randomInt(0, 1)])
	
		return _word
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

		// build text in to array (words, punk-tuation and white space elements)
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

		// last word (if no trailing punctuation/space/etc...)
		if (word.length) strArr.push(word)

		// translate array elements
		for (let i in strArr) {
			// we pass curent word as well as previous and next for matching context
			pirate_speak += apply_caps(strArr[i], translate(previous(strArr, i), strArr[i], next(strArr, i)))
		}
		return pirate_speak
	}
})()
