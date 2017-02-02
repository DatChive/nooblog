"use strict";

const chai = require('chai')
const chaiHttp = require('chai-http')
const Post = require('../../models/post')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

/*
* Testing api/crud using Post schema
*/
describe('Posts', () => {
	beforeEach((done) => {
		Post.remove({}, (err) => {
			done()
		})
	})
	describe('/GET posts', () => {
		it('it should get all posts', (done) => {
			chai.request(server)
				.get('/api/posts')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
					done()
				})
		})
	})
	// TODO: POST, GET, PUT, DEL
})
