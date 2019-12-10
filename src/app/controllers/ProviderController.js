class ProviderController {
    async index(req, res) {
        return res.json({ ok: true })
    }
}

export default new ProviderController();