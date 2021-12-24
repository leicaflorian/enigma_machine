import { Alphabet } from './enums/Alphabet';
import { ref, Ref } from 'vue';

export class Plugboard {
  // private sockets = Alphabet;
  protected mapping: Ref<Record<string, string>> = ref(Object.values(Alphabet).reduce((acc, key, i) => {
    acc[key] = ""
    
    return acc;
  }, {}))
  
  public get map () {
    return this.mapping.value;
  }
  
  public addMap (a: string, b: string = "") {
    a = a.toUpperCase();
    b = b?.toUpperCase();
    
    if (a === b) {
      return
    }
    
    const existingConnectionA = Object.entries(this.mapping.value).findIndex(entry => {
      return entry[1] === a
    });
    const existingConnectionB = Object.entries(this.mapping.value).findIndex(entry => {
      return entry[1] === b
    });
    
    console.log(a, existingConnectionA, b, existingConnectionB)
    
    if (existingConnectionA >= 0) {
      this.mapping.value[Alphabet[existingConnectionA]] = "";
    }
    
    if (existingConnectionB >= 0) {
      this.mapping.value[Alphabet[existingConnectionB]] = "";
    }
    
    this.mapping.value[a] = b;
    
    if (b) {
      this.mapping.value[b] = a;
    }
  }
  
  public input (letter) {
    const mappedLetter = this.mapping.value[letter];
    const toReturn = (mappedLetter || letter).toUpperCase();
    
    console.log("PLBRD", letter, toReturn);
    
    return toReturn;
  }
}

