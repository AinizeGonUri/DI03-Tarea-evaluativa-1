import { Component, OnInit } from '@angular/core';

export interface IGameState {
  numberToGuess: number;
  userInput: number;
  message: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  gameState: IGameState;

  constructor() {
    // Inicializamos el estado del juego
    this.gameState = {
      numberToGuess: 0,
      userInput: 0,
      message: 'Introduce un número entre 0 y 100',
    };
  }

  ngOnInit() {
    // Generamos un número aleatorio al cargar la página
    this.gameState.numberToGuess = Math.floor(Math.random() * 101); // Número aleatorio entre 0 y 100
  }

  // Método que se ejecuta cuando el usuario hace clic en el botón
  checkGuess() {
    const { numberToGuess, userInput } = this.gameState;

    if (userInput < 0 || userInput > 100) {
      this.gameState.message = "Introduce un número entre 0 y 100";
    } else if (userInput === numberToGuess) {
      this.gameState.message = "Has acertado";
    } else if (userInput < numberToGuess) {
      this.gameState.message = "Introduce un número mayor";
    } else if (userInput > numberToGuess) {
      this.gameState.message = "Introduce un número menor";
    }
  }

}
