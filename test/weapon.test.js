import { expect } from 'chai';
import Weapon from '../src/weapon.js';


describe('Weapon class tests:', () => {

    it('should process the given weapon input to produce the correct format', () => {
        const weaponProcessor = Weapon.weaponProcessor({ 'rock.x': '123', 'rock.y': '74' });
        expect(weaponProcessor).to.equal("rock");
    });
    
});