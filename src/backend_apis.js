const BASE_URL = "http://localhost:8080";

// auth apis
exports.signinApi = `${BASE_URL}/auth/signin`;
exports.signupApi = `${BASE_URL}/auth/signup`;

// dashboard apis
exports.addTaskApi = `${BASE_URL}/api/addTask`;
exports.getTasksApi = `${BASE_URL}/api/tasks`;
exports.changeTaskStatusApi = `${BASE_URL}/api/tasks/changeTaskStatus`;
