'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempProduct;

describe('testing product routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/products', () => {
    it('should respond with a product', () => {
      return superagent
        .post(`${API_URL}/api/products`)
        .send({
          productName: 'sterio',
          productId: 'sterio1',
          dateIn: Date.now(),
          isInStock: true
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.productName).toEqual('sterio');
          expect(res.body.productId).toEqual('sterio1');
          expect(res.body.created).toExist();
          tempProduct = res.body;
        });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/products`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });

    it('should respond with 409 conflict for unique property', () => {
      return superagent
        .post(`${API_URL}/api/products`)
        .send({
          productName: 'sterio',
          productId: 'sterio1'
        })
        .catch(err => {
          expect(err.status).toEqual(409);
        });
    });
  });

  describe('testing GET /api/product', () => {
    it('should respond with a product', () => {
      return superagent
        .get(`${API_URL}/api/products/${tempProduct._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.productName).toEqual('sterio');
          expect(res.body.productID).toEqual('sterio1');
          expect(res.body.created).toExist();
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/products/`).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/product', () => {
    it('should respond with a 200 and updated product', () => {
      return superagent
        .put(`${API_URL}/api/products/${tempProduct._id}`)
        .send({
          productName: 'radio',
          productId: 'radio1'
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.productName).toEqual('radio');
          expect(res.body.productId).toEqual('radio1');
        });
    });

    it('should respond with a 404 not found', () => {
      return superagent.put(`${API_URL}/api/products/`).send({}).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing DELETE /api/product', () => {
    it('should respond with a 204', () => {
      return superagent
        .delete(`${API_URL}/api/products/${tempProduct._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
          expect(res.body._id).toNotExist();
        });
    });

    it('should respond with a 404 not found', () => {
      return superagent.delete(`${API_URL}/api/products/`).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });
});
