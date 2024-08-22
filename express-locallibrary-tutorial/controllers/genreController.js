var Genre = require('../models/genre');
var Book = require("../models/book");
var async = require('async');

// Display list of all Genre
exports.genre_list = async function (req, res, next) {
  try {
    const list_genres = await Genre.find().sort([["name", "ascending"]]).exec();
    // Successful, so render
    res.render("genre_list", {
      title: "Genre List",
      genre_list: list_genres,
    });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
  console.log("Request params ID:", req.params.id); // 打印请求参数 ID

  try {
    const genre = await Genre.findById(req.params.id).exec();
    console.log("Found genre:", genre); // 打印找到的 genre 对象

    if (genre == null) {
      // No results.
      console.error("Genre not found"); // 打印未找到 genre 的错误
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    const genre_books = await Book.find({ genre: req.params.id }).exec();
    console.log("Found books:", genre_books); // 打印找到的 books 数组

    // Successful, so render
    console.log("Rendering genre_detail with results:", { genre, genre_books }); // 打印成功的结果
    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: genre_books,
    });
  } catch (err) {
    console.error("Error in async operation:", err); // 打印错误信息
    return next(err);
  }
};


// Display Genre create form on GET
exports.genre_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST
exports.genre_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET
exports.genre_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST
exports.genre_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET
exports.genre_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST
exports.genre_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};