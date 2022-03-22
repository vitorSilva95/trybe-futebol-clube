import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match'
import { IMatch } from '../interfaces/Match';
import { Response } from 'superagent';
import { matchsPayload } from './mocks'
import StatusCode from  '../enums/StatusCode';

const { OK ,UNAUTHORIZED } = StatusCode;

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matchs', () => {

  describe('Testa a função get all', ()=>{
    let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(Match, "findAll").resolves(matchsPayload as IMatch[]);
  });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('verifica se retorna todos as Partidas com sucesso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .send()
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body).to.deep.equal(matchsPayload);
        expect(chaiHttpResponse.body).to.be.an('array');
    })
  });
});


