/* global dom */
const talk_like_a_pirate = (() => {

	const EOL_CHANGE = 0.25
	const EOL_WORD_LENGTH = 3

	// Context definition objects give differnet translations options depending on 
	// the word that come before/after the one being translated
	// [{b: [before word], w: [word translation options], a: [after word]}, ....]
	// optionally the above array may contain an object like: { default: [translation options] }
	const context_matching_factory = (context_object_array) => (before, word, after) => {

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
			if (option.b.find((item) => (item.test) ? item.test(before) : before === item)) weight++
			if (option.a.find((item) => (item.test) ? item.test(after) : after === item)) weight++
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
		ACTION: ['will', 'might', 'could', 'to', 'can\'t', /ed$/i],
		DESCRIBE: [ 'beautiful', 'big', 'small', 'medium', 'large', 'massive', /y$/i],
		EVENT: ['go', 'to'],
		ITEM: ['a', 'an', 'that', 'those', 'this', 'thing', 'my', 'your'],
		OWNERSHIP: ['your', 'my', 'our'],
		SELF: [ 'i', 'me'],
	}

	const POST = {
		ACTION: ['sex','dig', /ing$/i,],
		ITEM: [],
		QUESTION: ['?'],
		REQUEST: ['like', 'you'],
	}

	const a_or_an = (b, w, a) => ['a', 'e', 'i', 'o', 'u'].includes(translate('a', a).substr(0, 1)) ? 'an' : 'a'

	const pirate_talk = {
		__eol__: ['Arrrr!', 'Arrrgh!', 'Shiver me timbers!', 'Arrrgh, Jim lad.',],
		'can\'t': context_matching_factory([{ b: PRE.SELF, w: ['don\'t be'], a: ['believe'] }]),
		'i\'m': ['I be'],
		'isn\'t': ['be not'],
		'it\'s': ['it be', '\'tis'],
		'that\'s': ['that be'],
		'you\'re': ['you be'],
		'you\'ve': ['ye'],
		a: a_or_an,
		abandon: ['maroon'],
		abandoned: ['marooned'],
		address: ['port o\' call', 'port'],
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
		bag: ['duffle'],
		barmaid: ['serving wench'],
		bastard: ['son of a biscuit eater', 'scallywag', 'bilge rat', 'knave', 'picaroon', 'rapscallion'],
		beat: ['flog'],
		beer: ['grog', 'ale'],
		before: ['afore'],
		belief: ['creed'],
		believe: context_matching_factory([{ b: PRE.ACTION, w: ['belivein\''], a: [] }]),
		best: ['finest'],
		between: ['betwixt'],
		big: ['vast'],
		binoculars: ['spyglass'],
		boat: ['ship', 'Man-O-War', 'clipper', 'cog', 'galleon', 'schooner'],
		book: context_matching_factory([{ b: PRE.ACTION, w: ['sign on t\''], a: ['a'] }, { b: PRE.ITEM, w: ['scroll', 'partchment'], a: [] }]),
		boss: ['captain', 'Cap\'n', 'admiral'],
		box: ['barrel', 'chest', 'box'],
		boy: ['lad', 'pirate'],
		broken: ['sunk'],
		business: ['company'],
		businesses: ['companies'],
		caribbean: ['Spanish Main'],
		cash: ['gold', 'coins', 'treasure', 'doubloons', 'booty'],
		cat: ['fury parrot'],
		cheat: ['hornswaggle'],
		clean: ['swab'],
		click: ['skewer', 'stab', 'poke'],
		client: ['Scurvy Dog'],
		cloth: ['canvas', 'hemp'],
		coffee: ['grog', 'ale'],
		coin: ['doubloon'],
		coins: ['doubloons'],
		comes: ['hails'],
		con: ['Hornswaggle'],
		contractor: ['Privateer'],
		control: ['ye helm'],
		cool: ['shipshape'],
		country: ['land'],
		crew: ['hands'],
		cruise: ['voyage'],
		customer: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		daughter: ['lass', 'wench'],
		daughters: ['wenches'],
		dead: ['feedin\' the fishes'],
		dealer: ['sutler', 'chandler'],
		dick: context_matching_factory([{ b: [...PRE.ITEM, ...PRE.OWNERSHIP, ...PRE.DESCRIBE], w: ['mermaid worrier', 'little sailor', 'Jolly Rodger'], a: [] }]),
		die: ['dance with Jack Ketch', 'walk the plank', 'dance the hempen jig'],
		died: ['be feedin\' the fishes', 'danced with Jack Ketch', 'walked t\' plank', 'went donw t\' Davey Jones locker', 'danced the hempen jig'],
		disabled: ['crippled', 'takin\' on water'],
		disembark: ['abandon ship'],
		do: ['d\''],
		dog: ['barkin\' parrot'],
		drunk: ['squiffy', 'three sheets to the wind'],
		egg: ['Cackle fruit'],
		employee: ['crew'],
		everyone: ['all hands'],
		excuse: context_matching_factory([{ b: [], w: ['oi!'], a: ['me'] }]),
		fabric: ['canvas', 'hemp'],
		family: ['kin'],
		fee: ['debt'],
		female: ['wench', 'lass', 'comely wench'],
		females: ['wenches', 'beauties'],
		fighting: ['Swashbucklin\''],
		food: ['grub'],
		for: ['fer'],
		forward: ['windward'],
		friend: ['matey', 'shipmate', 'bucko', 'me hearty'],
		friends: ['crew', 'Hearties'],
		front: ['bow'],
		gentleman: ['pirate', 'gentlemen o\' fortune'],
		gin: ['rum', 'port'],
		girl: ['lass', 'wench', 'comely wench', 'lassie', 'strumpet'],
		go: ['weigh anchor and hoist the mizzen an\' go', 'set sail an\' go'],
		good: ['shipshape', 'fine'],
		grave: ['Davy Jones Locker'],
		gun: ['musket', 'cannon', 'blunderbuss', 'pistol'],
		ha: ['yo ho'],
		haha: ['yo ho ho'],
		hahaha: ['yo ho ho and a bottle o\' run'],
		hand: context_matching_factory([{ default: ['hook'] }, { b: ['left', 'right'], w: ['side'], a: POST.ITEM }]),
		have: context_matching_factory([{ b: [], w: ['be makein\''], a: ['sex'] }]),
		hello: ['avast', 'ahoy'],
		hey: ['avast', 'ahoy'],
		hi: ['avast', 'ahoy'],
		him: ['he', '\'im'],
		holiday: context_matching_factory([{ b: PRE.ITEM, w: ['adventure'], a: [] }]),
		home: ['house'],
		hotel: ['inn'],
		house: ['ship'],
		huge: ['vast'],
		ill: ['poxy'],
		inbetween: ['betwixt'],
		infected: ['poxy'],
		internet: ['t\'interweb'],
		internets: ['t\'interwebs'],
		investment: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		is: ['be'],
		island: ['isle'],
		jail: ['brig'],
		journey: ['voyage', 'adventure'],
		just: ['jus\''],
		kitchen: ['gally'],
		knife: ['cutlass'],
		ladies: ['wenches', 'beauties'],
		lady: ['lass', 'wench', 'beauty', 'strumpet'],
		large: ['vast'],
		lean: ['list'],
		leave: ['abandon ship', 'set sail'],
		left: ['port'],
		little: ['wee'],
		logout: ['abandon ship'],
		luggage: ['cargo'],
		madam: ['buxom wench'],
		male: ['pirate', 'old salt'],
		males: ['pirates'],
		man: ['pirate', 'old salt'],
		manager: ['boatswain', 'bosun', 'coxswain'],
		massive: ['vast'],
		me: context_matching_factory([{ b: ['excuse'], w: [''], a: [] }]),
		meter: ['fathom'],
		meters: ['fathoms'],
		mile: ['league'],
		miles: ['leagues'],
		miss: ['lady'],
		money: ['gold', 'riches', 'buried treasure', 'booty', 'Plunder'],
		mop: ['swab'],
		mrs: ['madam', 'lady'],
		ms: ['...'],
		my: ['me'],
		neighbourhood: ['port'],
		never: ['Ne\'er'],
		ocean: ['briney deep'],
		overtake: ['overhaul'],
		people: ['land lubbers', 'scurvy land lubbers'],
		person: ['land lubber', 'scurvy land lubber', 'scurvy dog'],
		pirate: ['buccaneer', 'genteman o\' fortune'/* , 'corsair' */],
		pirates: ['buccaneers', 'genteman o\' fortune'/* , 'corsairs' */],
		place: ['port', 'haven'],
		prepare: ['batten down the hatches'],
		prison: ['brig'],
		quickly: ['smartly'],
		ramp: ['gangplank'],
		rear: ['stern'],
		relative: ['kin'],
		relatives: ['kin'],
		report: ['tall tale'],
		reports: ['tall tails'],
		restaurant: ['gally'],
		right: ['starboard'],
		rubbish: ['bilge'],
		save: ['bury'],
		saved: ['buried'],
		scared: ['lily-livered'],
		sea: ['briney deep'],
		sex: ['tha beast wi\' two backs'],
		should: ['shall'],
		sick: ['poxy'],
		silly: ['daft'],
		sink: ['Scuttle'],
		sir: ['ye scurvy dog', 'ye lily-livered rapscallion', 'ye poxy bilge rat', 'ye salty olde sea-dog'],
		small: ['puny', 'wee'],
		song: ['chantey'],
		sorry: ['beggin\' forgivness'],
		still: context_matching_factory([{ b: [], w: ['stll'], a: POST.ACTION }, { b: [], w: ['becalmed'], a: ['water', 'waaters'] },]),
		stop: ['avast', 'belay'],
		stories: ['tales', 'ledgends','myths'],
		stranger: ['interloper'],
		sword: ['cutlass'],
		talk: context_matching_factory([{ b: PRE.ACTION, w: ['be talkin\''], a: [] }]),
		task: ['duty'],
		tea: ['grog', 'ale'],
		telescope: ['spyglass'],
		the: ['ye', 'thar'],
		them: ['em'],
		there: ['abouts'],
		these: ['these \'ere'],
		this: ['This \'ere'],
		tit: ['bosom', 'bust'],
		tits: ['bosom', 'bust'],
		to: ['t\''],
		too: ['t\''],
		tour: ['adventure'],
		treasure: ['gold', 'booty', 'treasure'],
		understand: ['Savvy?'],
		vodka: ['rum', 'port'],
		was: ['be'],
		whip: ['cat o\' nine tails'],
		whiskey: ['rum', 'port', 'Clap of Thunder'],
		wife: ['ball and chain', 'woman'],
		with: ['wi\''],
		woman: context_matching_factory([{ default: ['wench', 'beauty'] }, { b: PRE.DESCRIBE, w: ['wench'], a: [] }]),
		work: context_matching_factory([{ b: PRE.ITEM, w: ['accursed contraption work'], a: POST.QUESTION }, { b: PRE.OWNERSHIP, w: ['duty'], a: POST.QUESTION },]),
		would: context_matching_factory([{ default: ['be'] }, { b: [], w: ['would'], a: POST.REQUEST }]),
		wow: ['blow me down', 'shiver me timbers', 'Sink Me'],
		yacht: ['clipper'],
		yeah: ['yarrr', 'aye'],
		yep: ['yarrr', 'aye'],
		yes: ['yarrr', 'aye'],
		you: ['ye'],
		your: ['ye', 'yer', 'thee'],
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

		if (pirate_talk[word]){
			if (typeof pirate_talk[word] === 'function') return pirate_talk[word](before, word, after)
			const selected = pirate_talk[word][randomInt(0, pirate_talk[word].length - 1)]
			if (typeof selected === 'function') return selected(before, word, after)
			return selected
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

		// last word (if no trailing punctuation/space/etc...)
		if (word.length) strArr.push(word)

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
			if (isPunk(after) && strArr[i].length > EOL_WORD_LENGTH && Math.random() > EOL_CHANGE) pirate_speak += ' ' + translate(before, '__eol__', after)

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
