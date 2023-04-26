const { Subscription } = require('../models/allModels');
// GET - Get All - Read
const getAllSubscriptions = async () => {
  let subscriptions = await Subscription.find({})
  return subscriptions
};

// GET - Get By Id - read
const getSubscriptionMemberId = async (id) => {
  return await Subscription.findOne({ memberID: id })
    .then((subscription) => {
      if (subscription) {
        return subscription
      } else {
        console.log('Subscription not found');
      }
    })
    .catch((err) => console.error(err));
};
const updateSubscriptionByMemberId = async (memberID, movieID) => {
  try {
    const updatedSubscription = await Subscription.findOneAndUpdate(
      { memberID: memberID },
      { $pull: { movieWatched: { movieID: movieID } } },
      { new: true }
    );
    return updatedSubscription;
  } catch (error) {
    console.error(error);
  }
};

// POST - Create - first subscription
const addSubscription = async (obj) => {
  const subs = new Subscription(obj);
  const res = await subs.save();
  return res
};

// PUT - Update - add to data
const updateSubscription = async (id, obj) => {
  const res = await Subscription.findOneAndUpdate(
    { _id: id },
    { $push: { movieWatched: obj } },
    { new: true }
  );
  return res
}

// DELETE - Delete
const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionMemberId,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  updateSubscriptionByMemberId,
};
