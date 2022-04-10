import services from '../services/Teste.service';

class TestController {
  async findAll(req, res) {
    try {
      const result = await services.findAll();

      res.status(200).json(result);
    } catch (err) {
      console.error(err);

      res.status(err.statusCode).json({ error: err.description });
    }
  }
}

export default new TestController();
