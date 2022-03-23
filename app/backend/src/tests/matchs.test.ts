import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/Match';
import { Response } from 'superagent';
import { createMatch, matchsPayload } from './mocks'
import StatusCode from  '../enums/StatusCode';

const { CREATED, OK} = StatusCode;

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
});


