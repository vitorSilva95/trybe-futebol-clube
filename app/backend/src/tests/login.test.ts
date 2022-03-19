import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {

  let chaiHttpResponse: Response;
  const payload ={
      id: 1,
      username: "Admin",
      role: "admin",
      password:'minhasenha',
      email: "admin@admin.com"
  }
  before(async () => {
    sinon
        .stub(User, "findOne")
        .resolves(payload as User);
  });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('usuario logado com sucesso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email:'admin@admin.com', password:'minhasenha'})
        

        expect(chaiHttpResponse).to.be.status(200)
    });
});
