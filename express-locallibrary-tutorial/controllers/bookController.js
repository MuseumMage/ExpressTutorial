const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    // 并行获取书的详细信息、书实例、作者和体裁的数量
    const [
        numBooks,
        numBookInstances,
        numAvailableBookInstances,
        numAuthors,
        numGenres,
    ] = await Promise.all([
        Book.countDocuments({}).exec(),
        BookInstance.countDocuments({}).exec(),
        BookInstance.countDocuments({ status: "Available" }).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Local Library Home",
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: numAvailableBookInstances,
        author_count: numAuthors,
        genre_count: numGenres,
    });
});

// Display list of all books
exports.book_list = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book list');
};

// Display detail page for a specific book
exports.book_detail = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET
exports.book_create_get = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST
exports.book_create_post = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET
exports.book_delete_get = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST
exports.book_delete_post = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET
exports.book_update_get = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST
exports.book_update_post = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update POST');
};