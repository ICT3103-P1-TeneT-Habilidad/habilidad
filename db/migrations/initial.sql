USE master
GO
-- Create the new database if it does not exist already

IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'TestDB'
)
CREATE DATABASE TestDB
GO
USE TestDB
GO

CREATE TABLE Inventory (id INT, name NVARCHAR(50), quantity INT);
GO
INSERT INTO Inventory VALUES (1, 'banana', 150); INSERT INTO Inventory VALUES (2, 'orange', 154);
GO
SELECT * FROM Inventory WHERE quantity > 152;
GO
