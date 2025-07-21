import mongoose from "mongoose";

const deletionLogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: String,
    reason: { type: String, default: "User initiated delete"},
    deletedAt: {type: Date, default: Date.now}
}) 

const DeletionLog = mongoose.model('DeletionLog', deletionLogSchema);
export default DeletionLog;