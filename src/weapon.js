class Weapon {
    static weaponProcessor(weapon) {
        const P1WeaponArray = Object.keys(weapon);
        return P1WeaponArray[0].slice(0, -2);
    }
};

export default Weapon