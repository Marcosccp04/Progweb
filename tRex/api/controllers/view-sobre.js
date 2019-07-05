/**
 * Module dependencies
 */

// ...


/**
 * view-sobre.js
 *
 * Display "Sobre" page.
 */
module.exports = async function (req, res) {
 var released = 2014;
 res.view('pages/sobre', { released:released });
};


