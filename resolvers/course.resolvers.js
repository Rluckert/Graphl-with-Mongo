const Course = require('../models/course');

module.exports = {
    Query: {
        async getCourses(obj, { page, limit }) {
            const courses = await Course.find();
            return courses;
        },
        async getCourse(obj, { id }){
            const courses = await Course.findById(id);
            return courses;
         }
    },
    Mutation: {
        async addCourse(obj, { input }) {
            const course = new Course(input);
            await course.save();
            return course;
        },
        async updateCourse(obj, {id, input}){
            const course = await Course.findByIdAndUpdate(id, input);
            return course;
           
        },
        async deleteCourse(obj, {id}){
            await Course.deleteOne({_id: id})
            return {
                message: `El curso con id: ${id} ha sido eliminado`
            }
        }

    }
}