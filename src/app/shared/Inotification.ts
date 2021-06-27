export interface Inotification{
    message:String
    notifiedUserId:any//if for Admin =>Roles.Admin
    courseId?:String
    teacherId?:String
    studentId?:String
    isRead?:Boolean
    isFeedbackFrom?:String
    classId?:String
}