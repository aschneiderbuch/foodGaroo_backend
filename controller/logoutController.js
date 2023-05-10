

export const logout = async (req, res) => {
    res.status(302).redirect('/')
}