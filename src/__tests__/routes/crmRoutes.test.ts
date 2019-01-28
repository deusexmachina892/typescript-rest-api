import "@babel/polyfill";

import app from '../../app';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { Contact } from '../../models/Contact';

describe('CRM routes', () => {
  beforeAll((done) => {
    let contact = {
      _id: mongoose.Types.ObjectId('5bb9e79df82c0151fc0cd5c8'),
      firstname: 'Rohan',
      lastname: 'Dhar',
      email: 'rohan.dhar1992@gmail.com',
      company: 'Coder',
      phone: 9038097516
    };
    request(app).post('/contacts')
                .send(contact)
                .end(() => done())
  });
  afterAll((done) => {
    Contact.deleteMany().then(()=> done());
  })
  it('tests GET / endpoint', (done) =>{
    const result = request(app).get('/')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end ((err, res) => {
                                  expect(res.body.success).toBeTruthy();
                                  done();
                                })
  });

  it('tests GET /contacts endpoint', (done) => {
   const result = request(app).get('/contacts')
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end ((err,res) => {
                                      expect(res.body.success).toBeTruthy();
                                      done();
                                    })
  });

  it('tests POST /contacts endpoint',  (done) => {
    let contact = {
      _id: mongoose.Types.ObjectId('5bb9e79df82c0151fc0cd5c9'),
      firstname: 'Mohan',
      lastname: 'Ghar',
      email: 'rohan.dhar1992@gmail.com',
      company: 'Coder',
      phone: 9038097516
    };
    request(app).post('/contacts')
                .send(contact)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end( (err, res)=> {
                  expect(res.body.contact.firstname).toMatch('Mohan');
                  done();
                });
  });
  
  it('tests GET /contact/:id endpoint', (done) => {
    request(app).get('/contact/5bb9e79df82c0151fc0cd5c8')
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/)
               .expect(200)
               .end( (err, res)=> {
                expect(res.body.contact.firstname).toMatch('Rohan');
                  expect(res.body.success).toBeTruthy();
                  done();
    });
                
  });
});