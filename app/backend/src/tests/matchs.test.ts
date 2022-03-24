import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import generateToken from '../utils/generateToken';
import { Response } from 'superagent';
import { updatedMatch, matchsPayload, userPayload } from './mocks'
import StatusCode from  '../enums/StatusCode';
import User from '../database/models/User';

const { OK, UNAUTHORIZED} = StatusCode;

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matchs', () => {

  describe('Testa se tem os retornos certos', ()=>{
    let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(Match, "findAll").resolves(matchsPayload as Match[]);
  });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('verifica se retorna todas as partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send()
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body).to.be.an('array')
        expect(chaiHttpResponse.body).to.deep.equal(matchsPayload);
    })
  });

  describe('Testa a rota /matchs/:id', ()=>{
    let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(User, "findOne").resolves(userPayload as User);
  });
  
  before(async () => {
    sinon.stub(Match, "findOne").resolves(updatedMatch as Match);
  });
    
  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

    after(()=>{
      (Match.findOne as sinon.SinonStub).restore();
    })

    it('Se nao passar o token devolve a message Token not found', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/1')
        .set('Authorization', '')
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED);
        expect(chaiHttpResponse.body.message).to.deep.equal('Token not found');
    })

    it('Testa se atualiza o placar de uma partida em andamento', async () => {
      const token = generateToken(userPayload)
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/1')
        .set('Authorization', token)
        .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        })
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body).to.deep.equal(updatedMatch);
    })
  });
});


