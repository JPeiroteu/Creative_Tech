const pool = require("../config/database");

class News {
  constructor(id, title, date, content, image) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.content = content;
    this.image = image;
  }

  static async getAll() {
    try {
      let result = [];
      let [dbNews, fields] = await pool.query("SELECT * FROM News");
      for (let dbArticle of dbNews) {
        result.push(
          new News(
            dbArticle.news_id,
            dbArticle.news_title,
            dbArticle.news_date,
            dbArticle.news_content,
            dbArticle.news_image
          )
        );
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = News;
