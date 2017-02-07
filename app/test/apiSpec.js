"use strict";

const chai = require('chai')
const chaiHttp = require('chai-http')
const Post = require('../../models/post')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

const testPost = {
	'title': 'test post title',
	'body': 'test post body',
}

/*
 * Testing api/crud using Post schema
 */
describe('Posts', () => {
	// Purge out possible pre-existing test post with exclusive title
	before((done) => {
		Post.remove({ title: 'test post title' }, (err) => {
			done()
		})
	})
	describe('/GET/api/posts posts', () => {
		it('it should get all posts', (done) => {
			chai.request(server)
				.get('/api/posts')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					done()
				})
		})
	})
	describe('/POST/api/posts post', () => {
		it('it should now allow a post without a title', (done) => {
			const post = {
				body: 'test post body',
			}
			chai.request(server)
				.post('/api/posts')
				.send(post)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('errors')
					res.body.errors.should.have.property('title')
					res.body.errors.title.should.have.property('kind').eql('required')
					done()
				})
		})
		it('it should save our post', (done) => {
			chai.request(server)
				.post('/api/posts')
				.send(testPost)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.message.should.eql('Post Added')
					res.body.newPost.should.have.property('title').eql('test post title')
					res.body.newPost.should.have.property('body').eql('test post body')
					done()
				})
		})
	})
	describe('/GET/api/posts/:postId post', () => {
		it('it should GET a post via its ID', (done) => {
			chai.request(server)
				.get('/api/post/' + testPost.title)
				.send(testPost)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.post.should.be.a('object')
					res.body.post.should.have.property('title').eql(testPost.title)
					res.body.post.should.have.property('body').eql(testPost.body)
					done()
				})
		})
	})
	// TODO: PUT
	// Purges database of test post
	after((done) => {
		Post.remove({ title: 'test post title' }, (err) => {
			done()
		})
	})
})
