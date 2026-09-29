import { expect } from 'chai';
import { readFileSync } from 'node:fs';


describe('The stylesheet:', () => {
    it("never lights a weapon just because a finger or a still mouse is over it, so player 1's pick stays hidden", () => {
        const css = readFileSync('public/style.css', 'utf8');
        const hovers = css.match(/[^{}]*\.weapon:hover[^{]*\{/g) ?? [];
        expect(hovers).to.not.be.empty;
        for (const rule of hovers) expect(rule, rule.trim()).to.match(/\[data-hover\]/);
    });
});
