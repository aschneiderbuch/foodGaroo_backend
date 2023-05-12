export const logout = async (req, res) => {
	res.clearCookie("token").end();
};
