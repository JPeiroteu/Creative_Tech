const pool = require("../config/database");

//db
function projectFromDB(dbObj) {
  return new Project(
    dbObj.project_id,
    dbObj.project_name,
    dbObj.project_description,
    dbObj.project_image
  );
}

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
      let [dbProjects, _] = await pool.query("SELECT * FROM Projects");
      for (let dbProject of dbProjects) {
        result.push(projectFromDB(dbProject));
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Project;
