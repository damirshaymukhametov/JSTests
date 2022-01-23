var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
const {expect} = require("chai");
var should = chai.should();

chai.use(chaiHttp);


/* 
testing https://jsonplaceholder.typicode.com
JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
You can refer to the website for the API documentation and examples.
*/


// test format of reponse
testCase('check format of response for posts', function () {
    it('format of response is {userId:, id:, title:, body:}', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1')
            .end((err, res) => {
                console.log("body: " + res.body.length)
                res.body.should.be.a('array');
                expect(res.body).not.to.be.empty;
                res.body[0].should.have.ownProperty('userId');
                res.body[0].should.have.ownProperty('id');
                res.body[0].should.have.ownProperty('title');
                res.body[0].should.have.ownProperty('body');
                res.should.have.status(200);
                console.log(res.body);
                for (let i = 0; i < res.body.length; i++) {
                    res.body[i].should.have.property("userId", 1);
                }
                res.body.should.be.a('array');
                done();
            });
    });
});

testCase('check that body and title is not empty', function () {
    it('body and title is not empty', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1')
            .end((err, res) => {
                expect(res.body[0].title).to.be.not.empty;
                expect(res.body[0].body).to.be.not.empty;
                done();
            });
    });
});


testCase('check that id of post is unique', function () {
    it('id of the post is unique', (done) => {
        let setOfPostsId = new Set();
        let amountOfPosts;
        let sizeOfUniquePosts;
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1')
            .end((err, res) => {
                for (let i = 0; i < res.body.length; i++) {
                    setOfPostsId.add(res.body[i]);
                }
                console.log(amountOfPosts);
                amountOfPosts = res.body.length;
                sizeOfUniquePosts = setOfPostsId.size;
                console.log(setOfPostsId.size);
                expect(res.body.length).to.be.eq(setOfPostsId.size);
                done();
            });
    });
});


testCase('all userId have the same userId', function () {
    it('it should have an a userId', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=1')
            .end((err, res) => {
                console.log("body: " + res.body.length)
                res.should.have.status(200);
                res.body.length.should.have.eq(10);
                console.log(res.body);
                for (let i = 0; i < res.body.length; i++) {
                    res.body[i].should.have.property("userId", 1);
                }
                res.body.should.be.a('array');
                done();
            });
    });
});

