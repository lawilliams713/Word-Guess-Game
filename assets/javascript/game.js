$(document).ready(function() {

  var possibleWords = ["travel", "explore", "suitcase", "airplane", "beach", "cruise", "packing", 
                    "snorkel", "passport", "airport", "tour", "vacation", "map"]

  const maxGuess = 10
  var pauseGame = false

  var guessedLetters = []
  var guessWord = []
  var wordToMatch
  var numGuess
  var wins = 0

  resetGame()


  document.onkeypress = function(event) {
     
      if (isAlpha(event.key) && !pauseGame) {
          checkForLetter(event.key.toUpperCase())
      }
  }

  function checkForLetter(letter) {
      var foundLetter = false

      for (var i=0, j= wordToMatch.length; i<j; i++) {
          if (letter === wordToMatch[i]) {
              guessWord[i] = letter
              foundLetter = true
              if (guessWord.join("") === wordToMatch) {
                  wins++
                  pauseGame = true
                  updateDisplay()
                  setTimeout(resetGame,5000)
              }
          }
      }

      if (!foundLetter) {
          if (!guessedLetters.includes(letter)) {
              guessedLetters.push(letter)
              numGuess--
          }
          if (numGuess === 0) {
              guessWord = wordToMatch.split()
              pauseGame = true
              setTimeout(resetGame, 5000)
          }
      }

      updateDisplay()

  }

  function isAlpha (ch){
      return /^[A-Z]$/i.test(ch);
  }

  function resetGame() {
      numGuess = maxGuess
      pauseGame = false

      wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
      console.log(wordToMatch)

      guessedLetters = []
      guessWord = []

      for (var i=0, j=wordToMatch.length; i < j; i++){
          if (wordToMatch[i] === " ") {
              guessWord.push(" ")
          } else {
              guessWord.push("_")
          }
      }

      updateDisplay()
  }

  function updateDisplay () {
      document.getElementById("totalWins").innerText = wins
      document.getElementById("currentWord").innerText = guessWord.join("")
      document.getElementById("remainingGuesses").innerText = numGuess
      document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
  }
})
