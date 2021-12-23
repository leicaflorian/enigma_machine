/**
 * Basic rotors configurations
 * http://enigmamuseum.com/rotwirg.htm
 * https://en.wikipedia.org/wiki/Enigma_rotor_details
 */
import { Alphabet } from './enums/Alphabet';

const availableConfig = {
  "I": {
    wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    notch: "Y",
    turnover: "Q"
  },
  "II": {
    wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    notch: "M",
    turnover: "E"
  },
  "III": {
    wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    notch: "D",
    turnover: "V"
  },
  "IV": {
    wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    notch: "R",
    turnover: "J"
  },
  "V": {
    wiring: "VZBRGITYUPSDNHLXAWMJQOFECK",
    notch: "H",
    turnover: "Z"
  },
}

export type RotorWheel = keyof typeof availableConfig;

export class Rotor extends EventTarget {
  protected id: RotorWheel;
  
  protected wiring: string;
  
  // letter appearing in window when the notch
  // is engaged with the stepping lever.
  protected turnover: string;
  
  // location of notch on the index ring.
  protected notch: string;
  
  protected position: number;
  
  // indicates at which position exists inside the array of rotors
  protected index: number
  
  constructor (version: RotorWheel, initialPosition: string, index: number) {
    super();
  
    if (!availableConfig[version]) {
      throw new Error("Unknown configuration")
    }
  
    this.id = version;
    this.turnover = availableConfig[version].turnover
    this.notch = availableConfig[version].notch
    this.wiring = availableConfig[version].wiring
    this.position = Alphabet.indexOf(initialPosition.toUpperCase())
    this.index = index;
  }
  
  protected get prevPos () {
    return this.position === 0 ? (Alphabet.length - 1) : (this.position - 1)
  }
  
  protected get turnoverIndex () {
    return Alphabet.indexOf(this.turnover)
  }
  
  protected get visibleLetter() {
    return Alphabet[this.position];
  }
  
  public input (letter: string, canIncrement = false) {
    const letterIndex = Alphabet.indexOf(letter.toUpperCase());
    let newIndex = letterIndex + this.position;
    
    if (newIndex >= this.wiring.length) {
      const diff = newIndex - this.wiring.length;
      
      newIndex = 0 + diff;
    }
    
    const toReturn = this.wiring[newIndex];
    
    console.log(" - RTR", letter, toReturn, letterIndex);
    
    if (canIncrement) {
      this.checkRotation();
    }
    
    return toReturn;
  }
  
  protected checkRotation () {
    // first rotor must spin at each keypress
    if (this.index === 0) {
      this.causeRotation();
    }
  }
  
  public causeRotation () {
    if (this.position >= this.wiring.length) {
      this.position = 0
    } else {
      this.position++
    }
    
    console.log("turnover index", this.turnoverIndex, this.position, this.prevPos);
    
    // if the prev position was a turnover point,
    // dispatch the rotorSpun event
    if (this.prevPos === this.turnoverIndex) {
      this.dispatchEvent(new CustomEvent("rotorSpun", {
        detail: {
          index: this.index,
          newPosition: this.position
        }
      }))
    }
    
    console.log(` -- newPosition[${this.index}]`, this.position)
    
  }
}
