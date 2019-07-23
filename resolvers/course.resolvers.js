const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
    Query: {
        async getCourses(obj, { page, limit }, context) {
            console.log(context);
            const courses = await Course.find();
            return courses;
        },
        async getCourse(obj, { id }){
            const courses = await Course.findById(id);
            return courses;
         }
    },
    Mutation: {
        async addCourse(obj, { input, user }, context) {
            if(!context || context.currentUser) return null;
            const userObj = await User.findById(user);
            const course = new Course({...input, user});
            await course.save();
            userObj.courses.push(course);
            await userObj.save();
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

    },
    Course:{
        async user(c){
            return await User.findById(c.user);
        }
    }
}