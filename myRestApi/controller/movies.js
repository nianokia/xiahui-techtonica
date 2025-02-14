import pool from "../db.js";

// get all movies
export const getMovies = async (req, res) => {
  try {
    // order by id asc here cause after update, the order can be shuffled.
    const allMovies = await pool.query("SELECT * FROM movies ORDER BY id ASC ");
    res.json(allMovies.rows);
  } catch (err) {
    res.send(err.message);
  }
};

// get movie by id
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE id=$1", [id]);
    // Send back the movie data
    res.json(result.rows[0]);
  } catch (err) {
    res.send(err.message);
  }
};

// add a new movie
export const addMovie = async (req, res) => {
  const { name, genre, publish_year, rating } = req.body;
  try {
    // Insert the new movie into the database
    const result = await pool.query(
      "INSERT INTO movies (name, genre, publish_year, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, genre, publish_year, rating]
    );
    const newMovie = result.rows[0]; // Get the newly inserted movie
    res.send(`Movie with the name "${newMovie.name}" added to the database`);
  } catch (err) {
    res.send(err.message);
  }
};

// delete a movive
export const deleteMovie = async (req, res) => {
  // get the movie id
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id= $1 RETURNING *",
      [id]
    );
    // if rowCount === 0, specified ID didn’t exist in the database,
    // so nothing was deleted
    if (result.rowCount === 0) {
      return res.status(404).send(`Movie with ID ${id} not found`);
    }
    res.send(`Movie with ID ${id} has been deleted`);
  } catch (err) {
    res.send(err.message);
  }
};

// update a movie
export const updateMovie = async (req, res) => {
  const { name, genre, publish_year, rating } = req.body;
  // get the movie id
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE movies SET name=$1, genre=$2, publish_year=$3, rating=$4 WHERE id= $5 RETURNING *",
      [name, genre, publish_year, rating, id]
    );
    // check whether the movie with {id} exist
    if (result.rowCount === 0) {
      return res.status(404).send(`Movie with ID ${id} not found`);
    }
    res.send(`Movie with ID ${id} has been updated`);
  } catch (err) {
    res.send(err.message);
  }
};
