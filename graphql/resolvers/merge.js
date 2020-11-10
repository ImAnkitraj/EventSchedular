const Event = require('../../models/event');
const User = require('../../models/user');
const DataLoader = require('dataloader');

const eventLoader = new DataLoader((eventIds)=>{
    return events(eventIds);
});

const userLoader = new DataLoader((userIds)=>{
    return  User.find({_id: {$in: userIds}});
})
const transformEvent = event => {
    return {
        ...event._doc,
        _id:event.id, 
        creator: user.bind(this, event.creator),
        start: new Date(event._doc.start).toString(),
        end: new Date(event._doc.end).toString(),
    }
}

const events = eventIds =>{
    return Event.find({_id:{$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return transformEvent(event);
        })
    })
    .catch(err=>{
        throw err;
    });
}

const singleEvent = async eventId => {
    try{
        const event = await eventLoader.load(eventId.toString());
        return event;
    }
    catch (err){
        throw err;
    }
}

const user = (userId) =>{
    return userLoader.load(userId.toString())
    .then(user => {
        return {
            ...user._doc, 
            _id:user.id, 
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
        }
    })
    .catch(err=>{
        throw err;
    })
}

exports.transformEvent = transformEvent;
exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;