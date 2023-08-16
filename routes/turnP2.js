import { Router } from 'express';
import Weapon from '../src/weapon.js';
const router = Router();

router.post('/', (req, res) => {
    const weaponP1 = req.app.locals.weaponP1;
    const weaponP2 = req.body;
    req.app.locals.weaponP2 = weaponP2;

    const P1Weapon = Weapon.weaponProcessor(weaponP1);
    const P2Weapon = Weapon.weaponProcessor(weaponP2);
    const battle = req.app.locals.battle;
    const result = battle.turn(P1Weapon, P2Weapon);

    const currentPlayer = battle.currentPlayer();
    const otherPlayer = battle.otherPlayer();
    battle.switch();

    if (currentPlayer.score >= 5) {
        res.render('p2Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (otherPlayer.score >= 5) {
        res.render('p1Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (result === "P1 Win") {
        res.render('turnP1Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    }

    if (result === "P2 Win") {
        res.render('turnP2Win', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    } 

    if (result === "Draw") {
        res.render('draw', {
        currentPlayer: currentPlayer,
        otherPlayer: otherPlayer,
        weaponP1: P1Weapon,
        weaponP2: P2Weapon
        });
    } 
})

export default router;