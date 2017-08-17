module.exports = function(mongoose) {
    const userSchema = mongoose.Schema({
        authId: Number,
        name: String,
        pwd: String,
        account: String,
        created: Date,
        isAdmin: Boolean
    });
    // userSchema.methods.getIsAamin = function() {
    //     return this.isAdmin;
    // }
    return mongoose.model('User', userSchema)
}