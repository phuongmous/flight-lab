const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    create,
    new: newTicket
};

function newTicket(req,res) {
    res.render('tickets/new', {flightId: req.params.id})
}

async function create(req,res) {
    const flight = await Flight.findById(req.params.id);
    const newTicket = new Ticket(req.body);
    newTicket.flight = flight._id;
    await newTicket.save();
    res.redirect(`/flights/${req.params.id}`);
}
