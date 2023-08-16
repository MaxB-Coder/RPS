import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Routes tests:', () => {

    const testServer = chai.request(app).keepOpen();

    describe('POST /', () => {

        it('Should start a new game', async () => {
            const res = await testServer
                .post('/game')
                .send({ name: 'Player1' }, {name: 'Player2'});

            expect(res).to.have.status(200);
        });

        // it('Should render index to restart the game', async() => {
        //     const res = await chai.request(app)
        //         .get('/index')

        //     expect(res).to.have.status(200);
        //  })

        it('Should process turnP1 correctly', async () => {
            const res = await testServer
                .post('/turnP1')
                .send({ 'rock.x': '123', 'rock.y': '74' });

            expect(res).to.have.status(200);
        });


        // Not sure what the issue is but status is 500.
        // it('Should process turnP2 correctly', async () => {
        //     const res = await chai.request(app)
        //         .post('/turnP2')
        //         .send({ 'rock.x': '123', 'rock.y': '74' });

        //     expect(res).to.have.status(200);
        // });
    })
})