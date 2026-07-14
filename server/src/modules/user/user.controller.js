export function getUsers(req, res) {
  res.status(200).json({
    success: true,
    users: [],
  });
}