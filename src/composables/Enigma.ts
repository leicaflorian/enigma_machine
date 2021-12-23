import { Rotor, RotorWheel } from './Rotor';
import { Plugboard } from './Plugboard';
import { Reflector, ReflectorWheel } from './Reflector';
import { Alphabet } from './enums/Alphabet';

export class Enigma extends EventTarget {
  protected rotors: Rotor[] = [];
  protected plugboard: Plugboard;
  protected reflector: Reflector;
  
  constructor (rotors: [RotorWheel, RotorWheel, RotorWheel], initialPositions: string[], reflectorId: ReflectorWheel) {
    super();
    
    rotors.forEach((wheel, i) => {
      const rotor = new Rotor(wheel, initialPositions[i], i)
      
      rotor.addEventListener("rotorSpun", (e: CustomEvent<{ index: number }>) => {
        const index = e.detail.index;
        
        if (index < this.rotors.length - 1) {
          this.rotors[index + 1].causeRotation()
        }
      })
      
      this.rotors.push(rotor)
    })
    
    // must also add the initial position
    this.plugboard = new Plugboard();
    this.reflector = new Reflector(reflectorId)
    
    const onKeydown = (e) => {
      const key = e.key ? e.key.toUpperCase() : null;
      
      if (!key || !Alphabet.includes(key)) {
        // different key than the valid ones
        return;
      }
      
      const result = this.input(key);
      // console.log("IN", key, "OUT", this.input(key));
      this.dispatchEvent(new CustomEvent("encryption", { detail: result }))
    }
    
    // first remove any previous listener of the same type
    window.removeEventListener("keydown", onKeydown);
    
    // add the new one
    window.addEventListener("keydown", onKeydown);
  }
  
  public input (letter): string {
    let finalLetter = this.plugboard.input(letter);
    finalLetter = this.inputThroughRotors(finalLetter);
    finalLetter = this.plugboard.input(finalLetter)
    
    return finalLetter;
  }
  
  private inputThroughRotors (letter: string): string {
    let rt1 = this.rotors[0].input(letter, true);
    let rt2 = this.rotors[1].input(rt1, true);
    let rt3 = this.rotors[2].input(rt2, true);
    
    let rfl = this.reflector.input(rt3);
    
    let rt4 = this.rotors[0].input(rfl);
    let rt5 = this.rotors[1].input(rt4);
    let rt6 = this.rotors[2].input(rt5);
    
    return rt6
  }
}
