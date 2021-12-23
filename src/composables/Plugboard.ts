import { Alphabet } from './enums/Alphabet';

export class Plugboard {
  // private sockets = Alphabet;
  protected mapping: Record<string, string> = Object.values(Alphabet).reduce((acc, key, i) => {
    acc[key] = ""
    
    return acc;
  }, {})
  
  public get map () {
    return this.mapping;
  }
  
  public addMap (a: string, b: string = "") {
    a = a.toUpperCase();
    b = b?.toUpperCase();
    
    if (a === b) {
      return
    }
    
    const existingConnectionA = Object.entries(this.mapping).findIndex(entry => {
      return entry[1] === a
    });
    const existingConnectionB = Object.entries(this.mapping).findIndex(entry => {
      return entry[1] === b
    });
    
    console.log(a, existingConnectionA, b, existingConnectionB)
    
    if (existingConnectionA >= 0) {
      this.mapping[Alphabet[existingConnectionA]] = "";
    }
    
    if (existingConnectionB >= 0) {
      this.mapping[Alphabet[existingConnectionB]] = "";
    }
    
    this.mapping[a] = b;
    
    if (b) {
      this.mapping[b] = a;
    }
  }
  
  public input (letter) {
    const mappedLetter = this.mapping[letter];
    const toReturn = (mappedLetter || letter).toUpperCase();
    
    console.log("PLBRD", letter, toReturn);
    
    return toReturn;
  }
}

