USE calendar;
-- droping table if it exists
DROP TABLE IF EXISTS events;

CREATE TABLE events
(
  id int IDENTITY(1, 1) PRIMARY KEY CLUSTERED NOT NULL
  ,
  userId NVARCHAR(50) NOT NULL
  ,
  title NVARCHAR(200) NOT NULL
  ,
  [description] NVARCHAR(1000) NULL
  ,
  startDate date NOT NULL
  ,
  startTime time(0) NOT NULL
  ,
  endDate date NULL
  ,
  endTime time(0) NULL
  ,
  INDEX idx_events_userId (userId)
);

INSERT INTO events
  (userId, title, [description], startDate, startTime, endDate, endTime)
VALUES
  ('userTest', N'appointment', N'description stuff', '2021-05-26', '13:00', NULL, NULL ),
  ('userTest2', N'appointment', N'meeting', '2021-05-27', '15:00', '2021-05-27', '15:30')