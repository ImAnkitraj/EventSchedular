const Event = require('../../models/event');
const { transformEvent, events} = require('./merge');
const User = require('../../models/user');

module.exports = {
    events: () => {
        return Event.find()
        .then(events => {
            return events.map(event=>{
                return transformEvent(event);
            });
        })
        .catch(err=>{
            throw err;
        })
    },

    userEvents: async ({userId}) => {
        const user =  await User.findOne({_id: userId});
        if(!user){
            throw new Error('User does not exist')
        }
        console.log(user)
        const eventIds = [...user._doc.createdEvents,...user._doc.sharedEvents];
        return events(eventIds)
    }, 

    addShareHolders: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Not Authenticated');
        }
        let updatedEvent , foundEvent, error;
        return Event.findById(args.addShareHoldersInput.eventId)
            .then(foundEvent => {

                if(foundEvent.creator.toString() == args.addShareHoldersInput.userId) {
                    error = 'You are the creator'
                    throw new Error('You are the creator');
                }

                foundEvent.shareHolders.map(shareHolder=>{
                    if(shareHolder.toString() ==  args.addShareHoldersInput.userId){
                        error= 'User already a shareHolder'
                        throw new Error('User already a shareHolder');
                    }
                })
                foundEvent.shareHolders = [...foundEvent.shareHolders, args.addShareHoldersInput.userId];
                return foundEvent.save();
            })
            .then(upEvent => {
                updatedEvent = upEvent;
                return User.findById(args.addShareHoldersInput.userId);
            })
            .then(user => {
                if(!user){
                    throw new Error('User not found')
                }
                user.sharedEvents.push(args.addShareHoldersInput.eventId)
                return user.save();
            })
            .then((_)=>{
                console.log(_)
                return transformEvent(updatedEvent)
            })
            .catch(err=> {
                throw new Error(error)
            })
    },
    createEvent: (args, req) => {
        if(!req.isAuth){
            throw new Error('Not Authenticated');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            start: new Date(args.eventInput.start),
            end: new Date(args.eventInput.end),
            creator: req.userId
        });
        let createdEvent ;
        return event
            .save()
            .then(res=>{
                createdEvent = transformEvent(res);
                return User.findById(req.userId);
            })
            .then(user => {
                if(!user){
                    throw new Error('User not found')
                }
                user.createdEvents.push(event)
                return user.save();
            })
            .then(res =>{
                return createdEvent;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
}