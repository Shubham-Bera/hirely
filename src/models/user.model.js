export let users = [
  {
    id: 1,
    name: "Admin Recruiter",
    email: "admin@hirely.com",
    password: "admin123", // In real app, use hashed passwords
    role: "recruiter",
    postedJobs: [1,2], // Array of job IDs posted by this recruiter
    appliedJobs: [],// Array of job IDs applied to (for job seekers)
  }
];

export default class UserModel {

  constructor(id,name,email,password,role){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.postedJobs = [];
    this.appliedJobs = [];
  }

  static getAll() {
    return users;
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static add(user) {
    const newUser = {
      id: users.length + 1,
      ...user
    };
    users.push(newUser);
    console.log(users); // Log the updated user
    return newUser;
  }

  static addPostedJob(userId, jobId){
    const user = users.find(u => u.id === userId);
    if(user && user.role === 'recruiter'){
      if (!user.postedJobs) user.postedJobs = [];
      user.postedJobs.push(jobId);
      return true;
    }
    return false;
  }
}