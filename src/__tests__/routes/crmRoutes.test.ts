import "@babel/polyfill";

import app from '../../app';
import * as request from 'supertest';
import { Contact } from '../../models/Contact';

describe('CRM routes', () => {
  beforeEach((done) => {
    Contact.deleteMany().then(()=> done());
  })
  it('tests GET / endpoint', async () =>{
    const result = await request(app).get('/');
    expect(result.body.message).toMatch('success');
    expect(result.statusCode).toEqual(200);
  });

  it('tests GET /contacts endpoint', (done) => {
   const result = request(app).get('/contacts')
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .then (res => {
                                      expect(res.body.success).toBeTruthy();
                                      done();
                                    })
  });

  it('tests POST /contacts endpoint',  (done) => {
    let contact = {
      firstname: 'Rohan',
      lastname: 'Dhar',
      email: 'rohan.dhar1992@gmail.com',
      company: 'Coder',
      phone: 9038097516
    };
    request(app).post('/contacts')
                .send(contact)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then( res=> {
                  expect(res.body.contact.firstname).toMatch('Rohan');
                  done();
                });
  });
})