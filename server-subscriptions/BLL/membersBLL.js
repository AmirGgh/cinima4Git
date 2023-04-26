
const { getAllUsersFirstTime } = require('../DALS/movieUserDAL');
const { Member } = require('../models/allModels');
const { updateMovieByMemberId } = require('./moviesBLL');
const { getSubscriptionMemberId } = require('./subscriptionsBLL');

// GET - Get All - Read
const getAllMembers = async () => {
    const count = await Member.countDocuments({});
    if (count === 0) {
        const { data } = await getAllUsersFirstTime()
        for (let member of data) {
            member = { firstName: member.name.split(' ')[0], lastName: member.name.split(' ')[1], email: member.email, city: member.address.city }
            const memberModel = new Member(member);
            await memberModel.save();
        }
    }
    const members = await Member.find({})
    return members
};


// GET - Get By Id 
const getMemberByUserId = async (userId) => {
    const resulte = await Member.findOne({ idUser: userId });
    return resulte
};


// POST - Create
const addMember = async (obj) => {
    const newMember = new Member(obj);
    const savedMember = await newMember.save();
    return { id: savedMember.id };
};

// PUT - Update
const updateMember = async (id, obj) => {
    await Member.findByIdAndUpdate(id, obj);
    return 'Updated!';
};

// PUT - Update By name - only for first users
const updateMemberByname = async (name, obj) => {
    const member = await Member.findOneAndUpdate({ name }, obj)
    return member._id;
};

// DELETE - Delete
const deleteMember = async (id) => {
    let subs = await getSubscriptionMemberId(id) // memeberID, moviesIDS
    if (subs?.movieWatched?.length > 0) {
        await updateMovieByMemberId(subs.movieWatched, id)
    }
    await Member.findByIdAndDelete(id);
};


module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember,
    getMemberByUserId,
    updateMemberByname,
};
