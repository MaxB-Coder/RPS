import chai from 'chai';
import chaiHttp from 'chai-http';
import Weapon from '../src/weapon.js';

const expect = chai.expect;

describe('Weapon class tests:', () => {

    it('should process the given weapon input to produce the correct format', () => {
        const weaponProcessor = Weapon.weaponProcessor({ 'rock.x': '123', 'rock.y': '74' });
        expect(weaponProcessor).to.equal("rock");
    });
    
});