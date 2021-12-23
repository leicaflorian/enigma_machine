import { Alphabet } from './enums/Alphabet';

const availableConfig = {
  "A": {
    wiring: "EJMZALYXVBWFCRQUONTSPIKHGD",
  },
  "B": {
    wiring: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
  },
  "C": {
    wiring: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
  },
}

export type ReflectorWheel = keyof typeof availableConfig;

export class Reflector {
  protected id: ReflectorWheel;
  
  protected wiring: string;
  
  constructor (id: ReflectorWheel) {
    if (!availableConfig[id]) {
      throw new Error("unknown reflector configuration")
    }
    
    this.id = id;
    this.wiring = availableConfig[id].wiring;
  }
  
  public input (letter: string) {
    const letterIndex = Alphabet.indexOf(letter.toUpperCase());
    const toReturn = this.wiring[letterIndex];
    
    console.log("|- RFLCTR", letter, toReturn, letterIndex);
    
    return toReturn;
  }
}
