import mongoose from "mongoose";

import "../mongodb_helper";
import {Post} from "../../models/post";
import {Comment} from "../../models/comment.js";

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    let post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });
// TODO: look into these tests for comments
  // perhaps it is how the test is done
  it("has a comment", () => {
    let comment = new Comment({ comment: "my first comment" });
    expect(comment.comment).toEqual("my first comment");
  });

  xit("can save a comment", (done) => {
    let comment = new Comment({ comment: "testing a comment" });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ comment: "testing a comment" });
        done();
      });
    });
  });

  it("can save a post", (done) => {
    let post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("returns the date and time of when a Post was created", async () => {
    let post = new Post({ message: "some message"});
    expect(post.createdAt).not.toBeNull()
  });

});
