import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Club from '../database/models/Club'

import { Response } from 'superagent';
import { clubs } from './mocks'
import StatusCode from  '../enums/StatusCode';

const { OK ,UNAUTHORIZED } = StatusCode;

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /clubs', () => {

  describe('Testa a função get all', ()=>{
    let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(Club, "findAll").resolves(clubs as Club[]);
  });

    after(()=>{
      (Club.findAll as sinon.SinonStub).restore();
    })

    it('verifica se retorna todos os clubes com sucesso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .send()
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body).to.deep.equal(clubs);
        expect(chaiHttpResponse.body).to.be.an('array');
    })
  });

  describe('Testa se busca um clube especifico', ()=>{
    let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(Club, "findByPk").resolves(clubs[0] as Club);
  });

    after(()=>{
      (Club.findByPk as sinon.SinonStub).restore();
    })

    it('verifica se retorna o clube de acordo com o id do parametro com sucesso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .send()
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body).to.deep.equal(clubs[0]);
        expect(chaiHttpResponse.body).to.includes.keys('id','clubName')
    })
  });
    
});


