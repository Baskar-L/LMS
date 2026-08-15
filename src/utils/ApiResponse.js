class ApiResponse {
  constructor(
    statusCode,
    data = null,
    message = "Success",
    pagination = null
  ) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}

export default ApiResponse;