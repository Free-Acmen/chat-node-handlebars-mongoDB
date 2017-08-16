module.exports = function(mongoose) {
    const userSchema = mongoose.Schema({
        authId: String,
        name: String,
        pwd: String,
        email: String,
        phone: String,
        created: Date
    })
    return mongoose.model('User', userSchema)
}