import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    year: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    descrip: {
        type: String,
        trim: true
    },
    color: {
        type: String
    },
    tipo: {
        type: String
    },
    tutorized: {
        type: Boolean
    }
},
{
    timestamps: true,
}

)

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;