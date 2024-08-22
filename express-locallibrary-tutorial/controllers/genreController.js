const Genre = require('../models/genre');
const Book = require("../models/book");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


// Display list of all Genre
exports.genre_list = asyncHandler(async (req, res, next) => {
  const list_genres = await Genre.find().sort([["name", "ascending"]]).exec();
  // Successful, so render
  res.render("genre_list", {
    title: "Genre List",
    genre_list: list_genres,
  });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  console.log("Request params ID:", req.params.id); // 打印请求参数 ID

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
});



// Display Genre create form on GET
exports.genre_create_get = function (req, res, next) {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name (case insensitive) already exists.
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(genre.url);
      }
    }
  }),
];


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