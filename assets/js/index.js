// 2C, 2D, 2H, 2S
let decksOfCards = []
let points = 0

const TYPES = ['C', 'D', 'H', 'S']
const SPECIALS = ['A', 'J', 'Q', 'K']
const BTN_NEW_GAME = document.querySelector('#btnNewGame')
const BTN_ASK_FOR_CARDS = document.querySelector('#btnAskForCards')
const BTN_STOP = document.querySelector('#btnStop')
const [ POINTS_SCREEN_PLAYER, POINTS_SCREEN_COMPUTER ] = document.querySelectorAll('i.text-success')
const PLAYER = document.querySelector('#player')
const COMPUTER = document.querySelector('#computer')

const SET_ATTRIBUTE = (el, options) => {
  Object.keys(options).forEach(function(attr) {
    el.setAttribute(attr, options[attr]);
  })
}

const LINK_IMAGE = (letter) => `./assets/images/${letter}.png`

const SHUFFLE = (arr) => arr
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const CREATE_DECK = () => {
  for (let i = 2; i <= 10; i++) {
    for (const TYPE of TYPES) {
      decksOfCards.push(i + TYPE)
    }
  }

  for (const TYPE of TYPES) {
    for (const SPECIAL of SPECIALS) {
      decksOfCards.push(SPECIAL + TYPE)
    }
  }

  return decksOfCards = SHUFFLE(decksOfCards)
}

const ASK_FOR_A_LETTER = () => {
  if (!decksOfCards.length) throw 'There are no letters'

  const LETTER = decksOfCards.pop()

  return LETTER
}

const LETTER_VALUE = (letter) => {
  const VALUE = letter.substring(0, letter.length - 1)

  if (isNaN(VALUE)) return VALUE === 'A' ? 11 : 10

  return Number(VALUE)
}

const ADD_IMAGE_DOM = (player) => {
  const LETTER = ASK_FOR_A_LETTER()
  const IMG = document.createElement('img')
  const POINTS_SCREEN = player ? POINTS_SCREEN_PLAYER : POINTS_SCREEN_COMPUTER
  const CONTAINER = player ? PLAYER : COMPUTER

  points += LETTER_VALUE(LETTER)
  POINTS_SCREEN.innerText = points

  SET_ATTRIBUTE(IMG, {
    'src': LINK_IMAGE(LETTER),
    'class': 'cardCustom'
  })

  CONTAINER.append(IMG)

  return points
}

const MESSAGE_ALERT = (player, computer) => {
  if ((player > 21) && (computer > 21)) {
    BTN_ASK_FOR_CARDS.setAttribute('disabled', true)

    return alert('NADIE GANO :(')
  }

  if (player > 21) {
    BTN_ASK_FOR_CARDS.setAttribute('disabled', true)

    return alert('PERDISTE!!!')
  }

  if (player === 21) {
    BTN_ASK_FOR_CARDS.setAttribute('disabled', true)

    return alert('GANASTE!!!')
  }

  if (computer > 21) {
    BTN_ASK_FOR_CARDS.setAttribute('disabled', true)

    return alert('GANASTE, PERDIO LA COMPUTADORA!!!')
  }

  if (computer === 21) {
    BTN_ASK_FOR_CARDS.setAttribute('disabled', true)

    return alert('PERDISTE, GANO LA COMPUTADORA!!!')
  }
}

const GAME_COMPUTER = () => {
  const COMPUTER_POINTS = ADD_IMAGE_DOM(false)

  return COMPUTER_POINTS
}

BTN_ASK_FOR_CARDS.addEventListener('click', () => {
  const PLAYER_POINTS = ADD_IMAGE_DOM(true)
  const COMPUTER_POINTS = GAME_COMPUTER()

  MESSAGE_ALERT(PLAYER_POINTS, COMPUTER_POINTS)
})

BTN_NEW_GAME.addEventListener('click', () => location.reload())

BTN_STOP.addEventListener('click', () => BTN_ASK_FOR_CARDS.setAttribute('disabled', true))

CREATE_DECK()
