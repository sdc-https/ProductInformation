
CREATE TABLE information (
  id SERIAL PRIMARY KEY,
  aspect_ratio CHAR(3),
  rating VARCHAR(5),
  dimensions VARCHAR(20),
  format VARCHAR(20),
  run_time VARCHAR(25),
  studio VARCHAR(100),
  number_of_disks INT
);

CREATE TABLE casts (
  id SERIAL PRIMARY KEY,
  actor_one VARCHAR(100),
  actor_two VARCHAR(100),
  actor_three VARCHAR(100),
  director VARCHAR(100)
);

-- /Users/fredericrosselet/Desktop/rpt27/sdc/ProductInformation/database/schema.sql