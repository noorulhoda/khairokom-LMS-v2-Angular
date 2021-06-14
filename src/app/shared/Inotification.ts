export interface Inotification{
    message:String
    notifiedUserId:String//if for Admin =>"Admin"
    courseId?:String
    teacherId?:String
    studentId?:String
    isRead?:Boolean
}