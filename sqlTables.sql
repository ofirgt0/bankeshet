CREATE TABLE Users
(
    UserName NVARCHAR(255) PRIMARY KEY,
    Password NVARCHAR(255),
    DisplayName NVARCHAR(255),
    Class NVARCHAR(255),
    Type NVARCHAR(255)
);

CREATE TABLE Classes
(
    Id NVARCHAR(255) PRIMARY KEY,
    DisplayName NVARCHAR(255),
    TotalCash INT,
    TeacherId NVARCHAR(255)
);

CREATE TABLE HistoryLines
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Date NVARCHAR(255),
    ProductId NVARCHAR(255),
    ProductTitle NVARCHAR(255),
    TransactionPrice FLOAT,
    ClassId NVARCHAR(255)
);

CREATE TABLE Products
(
    Id INT PRIMARY KEY,
    Title NVARCHAR(255),
    Description NVARCHAR(MAX) NULL,
    Price INT,
    PicturePath NVARCHAR(MAX) NULL,
    Amount INT
);