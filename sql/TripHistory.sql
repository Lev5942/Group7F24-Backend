CREATE TABLE trip_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  average_speed DECIMAL(10, 2) NOT NULL,
  total_distance VARCHAR(255) NOT NULL,
  warnings INT NOT NULL,
  trip_score INT NOT NULL
);

select * from trip_history;