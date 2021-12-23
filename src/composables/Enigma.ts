import { Rotor, RotorWheel } from './Rotor';
import { Plugboard } from './Plugboard';
import { Reflector, ReflectorWheel } from './Reflector';

export class Enigma {
  protected rotors: Rotor[] = [];
  protected plugboard: Plugboard;
  protected reflector: Reflector;
  
  constructor (rotors: [RotorWheel, RotorWheel, RotorWheel], initialPositions: string[], reflectorId: ReflectorWheel) {
    rotors.forEach((wheel, i) => {
      this.rotors.push(new Rotor(wheel, initialPositions[i], i))
    })
    
    // must also add the initial position
    this.plugboard = new Plugboard();
    this.reflector = new Reflector(reflectorId)
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
