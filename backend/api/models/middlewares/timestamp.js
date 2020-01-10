module.exports = function timestamp(schema) {

    // Add the two fields to the schema
    schema.add({ 
      createdOn: Date,
      updatedOn: Date,
      createdBy: Schema.Types.ObjectId,
      updatedBy: Schema.Types.ObjectId

    })
  
    // Create a pre-save hook
    schema.pre('save', function (next) {
      let now = Date.now()
     
      this.updatedAt = now
      // Set a value for createdAt only if it is null
      if (!this.createdAt) {
        this.createdAt = now
      }
     // Call the next function in the pre-save chain
     next()    
    })
  }