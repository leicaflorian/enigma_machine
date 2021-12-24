/**
 * Basic rotors configurations
 * http://enigmamuseum.com/rotwirg.htm
 * https://en.wikipedia.org/wiki/Enigma_rotor_details
 */
import { Alphabet } from './enums/Alphabet';
import { computed, Ref, ref } from 'vue';

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
  
  public position: Ref<number> = ref();
  
  // indicates at which position exists inside the array of rotors
  protected _index: number
  
  constructor (version: RotorWheel, initialPosition: string, index: number) {
    super();
  
    if (!availableConfig[version]) {
      throw new Error("Unknown configuration")
    }
  
    this.id = version;
    this.turnover = availableConfig[version].turnover
    this.notch = availableConfig[version].notch
    this.wiring = availableConfig[version].wiring
    this.position.value = Alphabet.indexOf(initialPosition.toUpperCase())
    this._index = index;
  }
  
  public get index () {
    return this._index;
  }
  
  protected get prevPos () {
    return this.position.value === 0 ? (Alphabet.length - 1) : (this.position.value - 1)
  }
  
  protected get turnoverIndex () {
    return Alphabet.indexOf(this.turnover)
  }
  
  public get letter () {
    return Alphabet[this.position.value]
  }
  
  public input (letter: string, canIncrement = false) {
    const letterIndex = Alphabet.indexOf(letter.toUpperCase());
    let newIndex = letterIndex + this.position.value;
    
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
    if (this._index === 0) {
      this.causeRotation();
    }
  }
  
  public causeRotation (direction?: "up" | "down") {
    let newPosition = !direction || direction === "up" ? this.position.value + 1 : this.position.value - 1;
    
    if (newPosition > this.wiring.length - 1) {
      newPosition = 0
    } else if (newPosition < 0) {
      newPosition = this.wiring.length - 1
    }
    
    this.position.value = newPosition
    
    console.log("turnover index", this.turnoverIndex, this.position.value, this.prevPos);
    
    // if the prev position was a turnover point,
    // dispatch the rotorSpun event
    if (this.prevPos === this.turnoverIndex && (!direction || direction === 'up')) {
      this.dispatchEvent(new CustomEvent("rotorSpun", {
        detail: {
          index: this._index,
          newPosition: this.position.value
        }
      }))
    }
    
    console.log(` -- newPosition[${this._index}]`, this.position.value)
  }
}
