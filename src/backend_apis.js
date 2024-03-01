// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://pro-manager-backend.onrender.com";

// exports.frontendUrl = "http://localhost:3000";
exports.frontendUrl = "https://pro-manager-frontend-kappa.vercel.app";

// auth apis
exports.signinApi = `${BASE_URL}/auth/signin`;
exports.signupApi = `${BASE_URL}/auth/signup`;
exports.updateUserCredentialApi = `${BASE_URL}/auth/update`;

// dashboard apis
exports.addTaskApi = `${BASE_URL}/api/addTask`;
exports.getTasksApi = `${BASE_URL}/api/tasks`;
exports.changeTaskStatusApi = `${BASE_URL}/api/tasks/changeTaskStatus`;
exports.toggleCheckApi = `${BASE_URL}/api/tasks/toggleCheck`;
exports.deleteTaskApi = `${BASE_URL}/api/deleteTask`;
exports.getTasksBasedOnPriorityApi = `${BASE_URL}/api/getTasksBasedOnPriority`;
exports.getDueTasksApi = `${BASE_URL}/api/tasks/dueTasks`;
exports.shareLinkApi = `${BASE_URL}/api/tasks`;
exports.editTaskApi = `${BASE_URL}/api/tasks/editTask`;
