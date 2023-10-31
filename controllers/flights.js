const Flight = require('../models/flight');

module.exports = {
    index,
    show,
    new: newFlight,
    create,
};

async function index(req,res) {
    const flights = await Flight.find({});
    res.render('flights/index', { flights });
}

async function show(req,res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: "Flight Detail", flight});
}

function newFlight(req,res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}

async function create(req, res) {
    const{arline, airport,flightNo,departs} = req.body
  try {
    await Flight.create(req.body);
 res.redirect('/flights'); }
    catch (err) {
      console.log(err);
      res.render('flights/new', { errorMsg: err.message });
    }
}