import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { loginPayload, userPayload } from './mocks'
import StatusCode from  '../enums/StatusCode';

const { OK ,UNAUTHORIZED } = StatusCode;

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(User, "findOne").resolves(userPayload as User);
  });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('verifica a resposta quando o usuario loga com sucesso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email:'admin@admin.com', password:'secret_admin'})
        

        expect(chaiHttpResponse).to.be.status(OK);
        expect(chaiHttpResponse.body.user).to.deep.equal(loginPayload);
        expect(chaiHttpResponse.body).to.includes.keys('user','token')
    });
    it('verifica a resposta quando o usuario informa uma senha menor que 7 digitos', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email:'admin@admin.com', password:'ava'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
        expect(chaiHttpResponse.body).to.includes.keys('message')
        
    });
    it('verifica a resposta quando o usuario nao informa email', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({password:'ava'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body).to.includes.keys('message')
        expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled' );
        
        
    });
    it('verifica a resposta quando o usuario nao informa o password', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email:'admin@admin.com'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body).to.includes.keys('message')
        expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled' );
    });

    it('verifica a resposta quando o usuario informa um email invalido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email:'admin#admin.com.br', password:'secrect_admin'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body).to.includes.keys('message')
        expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
    });
    it('verifica a resposta quando o usuario informa um email nao existente', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email:'trybe@admin.com', password:'secrect_admin'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body).to.includes.keys('message')
        expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
    });
    it('verifica a resposta quando o usuario informa a senha errada', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email:'admin@admin.com',password:'1234567'})
        

        expect(chaiHttpResponse).to.be.status(UNAUTHORIZED)
        expect(chaiHttpResponse.body).to.includes.keys('message')
        expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
    });
});

describe('Testa a rota /login/validate', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userPayload as User);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna UNAUTHORIZED com a menssagem Token not found', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', '')
  
      expect(chaiHttpResponse).to.be.status(UNAUTHORIZED);
      expect(chaiHttpResponse.body.message).to.be.equal( 'Token not found');
  })
});