import { Rotor, RotorWheel } from './Rotor';
import { Plugboard } from './Plugboard';
import { Reflector, ReflectorWheel } from './Reflector';
import { Alphabet } from './enums/Alphabet';

export interface RotorData {
  letter: string;
  index: number,
  type: string,
  
  up (): void;
  
  down (): void;
}

export interface PlugboardData {
  map: Record<string, string>;
  
  connect (from: string, to: string): void;
}

export class Enigma extends EventTarget {
  protected _rotors: Rotor[] = [];
  protected plugboard: Plugboard;
  protected reflector: Reflector;
  
  constructor (rotors: [RotorWheel, RotorWheel, RotorWheel], initialPositions: string[], reflectorId: ReflectorWheel) {
    super();
    
    rotors.forEach((wheel, i) => {
      const rotor = new Rotor(wheel, initialPositions[i], i)
      
      rotor.addEventListener("rotorSpun", (e: CustomEvent<{ index: number }>) => {
        const index = e.detail.index;
  
        if (index < this._rotors.length - 1) {
          this._rotors[index + 1].causeRotation()
        }
      })
      
      this._rotors.push(rotor)
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
    
    window["enigma"] = this;
  }
  
  public input (letter): string {
    let finalLetter = this.plugboard.input(letter);
    finalLetter = this.inputThroughRotors(finalLetter);
    finalLetter = this.plugboard.input(finalLetter)
    
    return finalLetter;
  }
  
  public get rotorsList (): RotorData[] {
    return this._rotors.reduce<RotorData[]>((acc, curr) => {
      acc.push({
        letter: curr.letter,
        index: curr.index,
        type: curr.type,
        up: () => curr.causeRotation("up"),
        down: () => curr.causeRotation("down")
      })
  
      return acc;
    }, []);
  }
  
  public get plugboardMap (): PlugboardData {
    return {
      map: this.plugboard.map,
      connect: (a, b,) => this.plugboard.addMap(a, b)
    }
  }
  
  private inputThroughRotors (letter: string): string {
    let rt1 = this._rotors[0].input(letter, true);
    let rt2 = this._rotors[1].input(rt1, true);
    let rt3 = this._rotors[2].input(rt2, true);
    
    let rfl = this.reflector.input(rt3);
    
    let rt4 = this._rotors[0].input(rfl);
    let rt5 = this._rotors[1].input(rt4);
    let rt6 = this._rotors[2].input(rt5);
    
    return rt6
  }
}
