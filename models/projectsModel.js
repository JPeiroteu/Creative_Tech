const pool = require("../config/database");

class Project {
  constructor(id, name, description, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }

  static async getAll() {
    try {
      let result = [];
      let [dbProjects, fields] = await pool.query("SELECT * FROM Projects");
      for (let dbProject of dbProjects) {
        result.push(new Project(
          dbProject.project_id,
          dbProject.project_name,
          dbProject.project_description,
          dbProject.project_image
        ));
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Project;
